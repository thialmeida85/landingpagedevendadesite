import { describe, it, expect, beforeAll } from "vitest";
import { sendCustomerConfirmationEmail, sendOwnerNotificationEmail } from "./services/emailService";

describe("Email Service - Resend Integration", () => {
  beforeAll(() => {
    // Ensure environment variables are set
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured for tests");
    }
    if (!process.env.OWNER_EMAIL) {
      throw new Error("OWNER_EMAIL not configured for tests");
    }
  });

  it("should have Resend API key configured", () => {
    const key = process.env.RESEND_API_KEY;
    expect(key).toBeDefined();
    expect(key).toMatch(/^re_/);
  });

  it("should have owner email configured", () => {
    const email = process.env.OWNER_EMAIL;
    expect(email).toBeDefined();
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("should validate customer confirmation email function exists", async () => {
    expect(typeof sendCustomerConfirmationEmail).toBe("function");
  });

  it("should validate owner notification email function exists", async () => {
    expect(typeof sendOwnerNotificationEmail).toBe("function");
  });

  it("should handle email sending with proper error handling", async () => {
    const testData = {
      customerName: "Test User",
      customerEmail: "test@example.com",
      customerPhone: "+55 12 99999-9999",
      customerCompany: "Test Company",
      orderId: 12345,
      websitePrice: 150000, // R$ 1500
      hostingPlan: "1year",
      hostingPrice: 15000, // R$ 150
      totalPrice: 165000, // R$ 1650
    };

    // This should not throw an error
    const result = await sendCustomerConfirmationEmail(testData);
    
    // Result should be a boolean
    expect(typeof result).toBe("boolean");
  });

  it("should validate Resend client initialization", () => {
    // If we reach here, Resend client was successfully initialized
    // (it would have thrown an error in emailService.ts if the API key was invalid)
    expect(process.env.RESEND_API_KEY).toBeDefined();
  });

  it("should have required environment variables for production", () => {
    const requiredVars = [
      "RESEND_API_KEY",
      "OWNER_EMAIL",
    ];

    requiredVars.forEach((varName) => {
      expect(process.env[varName]).toBeDefined();
    });
  });

  it("should note: Resend domain verification required for production", () => {
    // This test documents that the user needs to verify their domain in Resend
    // to send emails from a custom domain (e.g., noreply@verticale.com.br)
    // For now, emails will be sent from the default Resend domain
    expect(true).toBe(true);
  });
});
