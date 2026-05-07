import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createCustomer, createOrder, getCustomerByEmail, updateOrderPaymentStatus } from "../db";
import { InsertCustomer, InsertOrder } from "../../drizzle/schema";
import { createMercadoPagoPreference } from "../services/mercadopagoService";

export const checkoutRouter = router({
  createPreference: publicProcedure
    .input(
      z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(1),
        customerCompany: z.string().optional(),
        hostingPlan: z.enum(["1year", "2years", "3years"]).optional(),
        totalAmount: z.number().positive(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Check if customer already exists
        let customer = await getCustomerByEmail(input.customerEmail);
        
        if (!customer) {
          // Create new customer
          const customerData: InsertCustomer = {
            name: input.customerName,
            email: input.customerEmail,
            phone: input.customerPhone,
            company: input.customerCompany || null,
          };
          
          await createCustomer(customerData);
          customer = await getCustomerByEmail(input.customerEmail);
        }

        if (!customer) {
          throw new Error("Failed to create or retrieve customer");
        }

        // Hosting prices em Reais
        const hostingPrices = {
          "1year": 150,
          "2years": 250,
          "3years": 380,
        };

        let hostingPriceReais = input.hostingPlan ? hostingPrices[input.hostingPlan] : 0;
        const totalPriceReais = input.totalAmount; // Pega o valor real enviado pela tela (Ex: 500 ou 2)
        
        // Se for o modo de teste (Ex: R$ 2,00), a hospedagem é zerada para não dar preço negativo
        if (totalPriceReais <= 5) {
          hostingPriceReais = 0;
        }

        const websitePriceReais = totalPriceReais - hostingPriceReais;

        // Create order
        const orderData: InsertOrder = {
          customerId: customer.id,
          websiteServicePrice: websitePriceReais * 100,
          hostingPlan: input.hostingPlan || null,
          hostingPrice: hostingPriceReais * 100,
          totalPrice: totalPriceReais * 100,
          paymentStatus: "pending",
        };

        const orderResult = await createOrder(orderData);
        const orderId = (orderResult as any).insertId;

        // Limpeza de Telefone para o formato estrito do Mercado Pago
        const cleanPhone = input.customerPhone.replace(/\D/g, "");
        const areaCode = cleanPhone.length >= 10 ? cleanPhone.substring(0, 2) : "11";
        const phoneNumber = cleanPhone.length >= 10 ? cleanPhone.substring(2) : cleanPhone;
        
        // Limpeza da Base URL para evitar barras duplas (//)
        const baseUrl = (process.env.VITE_APP_URL || "http://localhost:3000").replace(/\/$/, "");

        // Create Mercado Pago preference
        const mpPreference = {
          items: [
            {
              title: "Site Profissional" + (input.hostingPlan ? " + Hospedagem" : ""),
              description: "Criação de site profissional" + (input.hostingPlan ? ` com hospedagem por ${input.hostingPlan === "1year" ? "1 ano" : input.hostingPlan === "2years" ? "2 anos" : "3 anos"}` : ""),
              quantity: 1,
              unit_price: totalPriceReais, // Valor em Reais pro Mercado Pago
              currency_id: "BRL",
            },
          ],
          payer: {
            name: input.customerName,
            email: input.customerEmail,
            phone: {
              area_code: areaCode,
              number: phoneNumber,
            },
          },
          back_urls: {
            success: `${baseUrl}/success?order_id=${orderId}`,
            failure: `${baseUrl}/error?order_id=${orderId}`,
            pending: `${baseUrl}/pending?order_id=${orderId}`,
          },
          auto_return: "approved",
          external_reference: `order_${orderId}`,
          notification_url: `${baseUrl}/webhook/payments`,
        };

        // Chama a API oficial do Mercado Pago para gerar a cobrança
        const mpResult = await createMercadoPagoPreference(mpPreference);

        if (!mpResult) {
          throw new Error("Erro ao comunicar com o Mercado Pago. Verifique suas credenciais (Access Token).");
        }

        return {
          orderId,
          init_point: mpResult.init_point, // Link real oficial gerado
        };
      } catch (error) {
        console.error("Checkout error:", error);
        throw new Error("Erro ao processar checkout. Por favor, tente novamente.");
      }
    }),

  getOrder: publicProcedure
    .input(z.object({ orderId: z.number() }))
    .query(async ({ input }) => {
      const order = await getOrderById(input.orderId);
      return order;
    }),

  updatePaymentStatus: publicProcedure
    .input(
      z.object({
        orderId: z.number(),
        status: z.enum(["pending", "approved", "failed", "cancelled"]),
      })
    )
    .mutation(async ({ input }) => {
      await updateOrderPaymentStatus(input.orderId, input.status);
      return { success: true };
    }),
});

// Import getOrderById here to avoid circular dependency
import { getOrderById } from "../db";
