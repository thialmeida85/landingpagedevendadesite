import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createCustomer, createOrder, getCustomerByEmail, updateOrderPaymentStatus } from "../db";
import { InsertCustomer, InsertOrder } from "../../drizzle/schema";
import { sendCustomerConfirmationEmail, sendOwnerNotificationEmail } from "../services/emailService";

export const checkoutRouter = router({
  createPreference: publicProcedure
    .input(
      z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(1),
        customerCompany: z.string().optional(),
        hostingPlan: z.enum(["1year", "2years", "3years"]),
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

        // Hosting prices in cents
        const hostingPrices = {
          "1year": 15000, // R$ 150
          "2years": 25000, // R$ 250
          "3years": 38000, // R$ 380
        };

        const websitePrice = 150000; // R$ 1500 in cents
        const hostingPrice = hostingPrices[input.hostingPlan];
        const totalPrice = websitePrice + hostingPrice;

        // Create order
        const orderData: InsertOrder = {
          customerId: customer.id,
          websiteServicePrice: websitePrice,
          hostingPlan: input.hostingPlan,
          hostingPrice: hostingPrice,
          totalPrice: totalPrice,
          paymentStatus: "pending",
        };

        const orderResult = await createOrder(orderData);
        const orderId = (orderResult as any).insertId;

        // Send confirmation emails
        await sendCustomerConfirmationEmail({
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          customerCompany: input.customerCompany,
          orderId,
          websitePrice: websitePrice,
          hostingPlan: input.hostingPlan,
          hostingPrice: hostingPrice,
          totalPrice: totalPrice,
        });

        await sendOwnerNotificationEmail({
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          customerCompany: input.customerCompany,
          orderId,
          websitePrice: websitePrice,
          hostingPlan: input.hostingPlan,
          hostingPrice: hostingPrice,
          totalPrice: totalPrice,
        });

        // Create Mercado Pago preference
        const mpPreference = {
          items: [
            {
              title: "Site Institucional + Hospedagem",
              description: `Criação de site profissional com hospedagem por ${input.hostingPlan === "1year" ? "1 ano" : input.hostingPlan === "2years" ? "2 anos" : "3 anos"}`,
              quantity: 1,
              unit_price: totalPrice / 100, // Convert cents to reais
              currency_id: "BRL",
            },
          ],
          payer: {
            name: input.customerName,
            email: input.customerEmail,
            phone: {
              area_code: input.customerPhone.substring(0, 2),
              number: input.customerPhone.substring(2),
            },
          },
          back_urls: {
            success: `${process.env.VITE_APP_URL || "http://localhost:3000"}/success?order_id=${orderId}`,
            failure: `${process.env.VITE_APP_URL || "http://localhost:3000"}/error?order_id=${orderId}`,
            pending: `${process.env.VITE_APP_URL || "http://localhost:3000"}/pending?order_id=${orderId}`,
          },
          auto_return: "approved",
          external_reference: `order_${orderId}`,
          notification_url: `${process.env.VITE_APP_URL || "http://localhost:3000"}/api/webhook/mercadopago`,
        };

        // TODO: Call Mercado Pago API to create preference
        // For now, return mock response with order ID
        return {
          orderId,
          preference: mpPreference,
          init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=mock_${orderId}`,
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
