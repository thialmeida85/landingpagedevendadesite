/**
 * Mercado Pago Integration Service
 * Handles payment preference creation and webhook processing
 */

export interface MercadoPagoPreference {
  items: Array<{
    title: string;
    description: string;
    quantity: number;
    unit_price: number;
    currency_id: string;
  }>;
  payer: {
    name: string;
    email: string;
    phone?: {
      area_code: string;
      number: string;
    };
  };
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return: string;
  external_reference: string;
  notification_url: string;
}

/**
 * Create a payment preference on Mercado Pago
 * This will be called when the user proceeds to checkout
 */
export async function createMercadoPagoPreference(
  preference: MercadoPagoPreference
): Promise<{ id: string; init_point: string } | null> {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.warn(
        "[MP] MERCADO_PAGO_ACCESS_TOKEN not configured. Using mock preference."
      );
      // Return mock for development
      return {
        id: `mock_${Date.now()}`,
        init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=mock_${Date.now()}`,
      };
    }

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preference),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("[MP] Failed to create preference:", error);
      return null;
    }

    const data = await response.json();
    console.log(`[MP] Preference created: ${data.id}`);

    return {
      id: data.id,
      init_point: data.init_point,
    };
  } catch (error) {
    console.error("[MP] Error creating preference:", error);
    return null;
  }
}

/**
 * Verify webhook signature from Mercado Pago
 * This ensures the webhook is authentic
 */
export function verifyMercadoPagoSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  try {
    // TODO: Implement signature verification
    // For now, accept all webhooks (NOT SECURE - for development only)
    return true;
  } catch (error) {
    console.error("[MP] Signature verification failed:", error);
    return false;
  }
}

/**
 * Process webhook notification from Mercado Pago
 */
export async function processMercadoPagoWebhook(payload: any): Promise<{
  orderId: number;
  status: "approved" | "pending" | "failed";
} | null> {
  try {
    if (payload.type !== "payment") {
      return null;
    }

    const paymentId = payload.data?.id;
    if (!paymentId) return null;

    // Busca os detalhes oficiais do pagamento na API do Mercado Pago
    const paymentData = await getMercadoPagoPayment(paymentId);
    if (!paymentData) return null;

    const externalReference = paymentData.external_reference;
    if (!externalReference || !externalReference.startsWith("order_")) {
      console.warn("[MP] Invalid external reference:", externalReference);
      return null;
    }

    const orderId = parseInt(externalReference.replace("order_", ""));

    // Map Mercado Pago status to our status
    let status: "approved" | "pending" | "failed" = "pending";

    const paymentStatus = paymentData.status;
    if (paymentStatus === "approved") {
      status = "approved";
    } else if (paymentStatus === "rejected" || paymentStatus === "cancelled") {
      status = "failed";
    }

    console.log(`[MP] Webhook processed: Order ${orderId} - Status: ${status}`);

    return {
      orderId,
      status,
    };
  } catch (error) {
    console.error("[MP] Error processing webhook:", error);
    return null;
  }
}

/**
 * Get payment details from Mercado Pago
 */
export async function getMercadoPagoPayment(paymentId: string): Promise<any> {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.warn("[MP] MERCADO_PAGO_ACCESS_TOKEN not configured");
      return null;
    }

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("[MP] Failed to get payment details");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[MP] Error getting payment details:", error);
    return null;
  }
}
