import { describe, expect, it } from "vitest";
import { buildSignInRedirect, sanitizeReturnTo } from "@/lib/auth/redirect";

describe("auth redirects", () => {
  it("accepts internal relative return paths", () => {
    expect(sanitizeReturnTo("/form/questions?step=2")).toBe("/form/questions?step=2");
  });

  it("rejects external or malformed return paths", () => {
    expect(sanitizeReturnTo("https://example.com")).toBeNull();
    expect(sanitizeReturnTo("//example.com")).toBeNull();
    expect(sanitizeReturnTo("form")).toBeNull();
  });

  it("builds a sign-in redirect with a safe returnTo", () => {
    expect(buildSignInRedirect("/form")).toBe("/auth/sign-in?returnTo=%2Fform");
  });

  it("falls back to plain sign-in when returnTo is unsafe", () => {
    expect(buildSignInRedirect("https://example.com")).toBe("/auth/sign-in");
  });
});
