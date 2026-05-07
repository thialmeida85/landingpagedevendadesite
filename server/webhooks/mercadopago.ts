import { Request, Response } from "express";
import { processMercadoPagoWebhook } from "../services/mercadopagoService";
import { updateOrderPaymentStatus, getOrderWithCustomer } from "../db";
import { sendCustomerConfirmationEmail } from "../services/emailService";

/**
 * Webhook handler for Mercado Pago payment notifications
 * Endpoint: POST /webhook/payments
 * This endpoint receives notifications when payment status changes
 */
export async function handleMercadoPagoWebhook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Validate webhook secret if configured
    const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers["x-signature"] as string;
      if (!signature) {
        console.warn("[WEBHOOK] Missing signature header");
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      // In production, validate the signature against the secret
      // For now, we just check if it exists
    }

    // Mercado Pago sends webhooks as POST requests
    const payload = req.body;

    console.log("[WEBHOOK] Received Mercado Pago notification:", payload.type);

    // Process the webhook
    const result = await processMercadoPagoWebhook(payload);

    if (!result) {
      res.status(400).json({ error: "Invalid webhook payload" });
      return;
    }

    const { orderId, status } = result;

    // Update order status in database
    await updateOrderPaymentStatus(orderId, status);

    // If payment was approved, send confirmation email to customer
    if (status === "approved") {
      const order = await getOrderWithCustomer(orderId);

      if (order && (order as any).customerEmail && (order as any).customerName) {
        // Get customer details
        const customerEmail = order.customerEmail;
        const customerName = order.customerName;
        const websitePrice = order.websiteServicePrice || 0;
        const hostingPrice = order.hostingPrice || 0;
        const totalPrice = order.totalPrice || 0;

        // Send confirmation email
        await sendCustomerConfirmationEmail({
          customerName,
          customerEmail,
          customerPhone: order.customerPhone || "",
          customerCompany: order.customerCompany || undefined,
          orderId,
          websitePrice,
          hostingPlan: order.hostingPlan || "1year",
          hostingPrice,
          totalPrice,
        });

        console.log(`[WEBHOOK] Confirmation email sent for order ${orderId}`);
      } else {
        console.warn(`[WEBHOOK] Order ${orderId} not found or missing customer data`);
      }
    }

    // Return 200 OK to acknowledge receipt
    res.status(200).json({
      success: true,
      orderId,
      status,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("[WEBHOOK] Error processing Mercado Pago webhook:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Generate a webhook secret for Mercado Pago
 * This is used to validate webhook signatures
 */
export function generateWebhookSecret(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
