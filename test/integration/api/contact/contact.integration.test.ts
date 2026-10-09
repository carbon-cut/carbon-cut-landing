import { beforeAll, describe, expect, it } from "vitest";
import { ensureIntegrationServicesAvailable, fetchFrontend } from "../../auth-helpers";

const validContactMessage = {
  name: "Contact Integration Test",
  email: "contact.integration@example.test",
  topic: `Integration contact ${Date.now()}`,
  message: "Integration test message. Safe to discard.",
};

describe.sequential("contact API integration", () => {
  beforeAll(async () => {
    await ensureIntegrationServicesAvailable();
  });

  it("returns success for a filled website honeypot", async () => {
    const response = await fetchFrontend("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validContactMessage, website: "https://spam.example" }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ data: { ok: true } });
  });

  it("rejects an invalid contact payload", async () => {
    const response = await fetchFrontend("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validContactMessage, email: "not-an-email", website: "" }),
    });

    expect(response.status).toBe(400);
    expect(response.headers.get("content-type")).toContain("application/json");
  });
});
