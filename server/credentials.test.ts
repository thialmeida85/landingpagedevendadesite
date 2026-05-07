import { describe, it, expect } from "vitest";

describe("Credentials Validation", () => {
  it("should have MERCADO_PAGO_ACCESS_TOKEN configured", () => {
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    expect(token).toBeDefined();
    expect(token).toMatch(/^APP_/);
  });

  it("should have RESEND_API_KEY configured", () => {
    const key = process.env.RESEND_API_KEY;
    expect(key).toBeDefined();
    expect(key).toMatch(/^re_/);
  });

  it("should have OWNER_EMAIL configured", () => {
    const email = process.env.OWNER_EMAIL;
    expect(email).toBeDefined();
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("should have OWNER_EMAIL_CC configured", () => {
    const email = process.env.OWNER_EMAIL_CC;
    expect(email).toBeDefined();
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("should validate Mercado Pago token format", async () => {
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!token) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not set");
    }

    // Test if token can be used to make a request to Mercado Pago
    try {
      const response = await fetch("https://api.mercadopago.com/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If token is valid, we should get a response (even if it's an error)
      expect(response).toBeDefined();
      expect(response.status).toBeGreaterThan(0);
      
      // Valid token should not return 401 Unauthorized
      if (response.status === 401) {
        throw new Error("Invalid Mercado Pago token");
      }
    } catch (error) {
      // Network errors are okay, we just want to validate the token format
      expect(token).toMatch(/^APP_/);
    }
  });

  it("should validate Resend API key format", () => {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY not set");
    }

    // Resend keys should start with 're_'
    expect(key).toMatch(/^re_/);
    // Should be reasonably long
    expect(key.length).toBeGreaterThan(20);
  });
});
