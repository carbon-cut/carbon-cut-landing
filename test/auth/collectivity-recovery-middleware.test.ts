import { describe, expect, it } from "vitest";
import { NextRequest, type NextFetchEvent } from "next/server";
import middleware from "@/middleware";

const event = {} as NextFetchEvent;

describe("collectivity recovery redirects", () => {
  it("preserves a nested path and query before server guards run", async () => {
    const request = new NextRequest(
      "http://localhost/collectivity/projects/grand-sfax/inventory?year=2026",
      { headers: { cookie: "cc_refresh_token=refresh-token" } }
    );

    const response = await middleware(request, event);
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/recover?returnTo=%2Fcollectivity%2Fprojects%2Fgrand-sfax%2Finventory%3Fyear%3D2026"
    );
  });

  it("sends a missing session to sign-in with the same nested return path", async () => {
    const request = new NextRequest(
      "http://localhost/collectivity/projects/grand-sfax/result?view=yearly"
    );
    const response = await middleware(request, event);
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/sign-in?returnTo=%2Fcollectivity%2Fprojects%2Fgrand-sfax%2Fresult%3Fview%3Dyearly"
    );
  });

  it("preserves the locale prefix of a deep link", async () => {
    const request = new NextRequest(
      "http://localhost/fr/collectivity/projects/grand-sfax/actions?tab=next",
      { headers: { cookie: "cc_refresh_token=refresh-token" } }
    );
    const response = await middleware(request, event);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/recover?returnTo=%2Ffr%2Fcollectivity%2Fprojects%2Fgrand-sfax%2Factions%3Ftab%3Dnext"
    );
  });

  it("lets a current access token reach the protected page", async () => {
    const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 300 }));
    const request = new NextRequest("http://localhost/collectivity/projects/grand-sfax/inventory", {
      headers: {
        cookie: `cc_access_token=header.${payload}.signature; cc_auth_user=${encodeURIComponent(JSON.stringify({ id: 1, email: "a@example.com" }))}`,
      },
    });
    const response = await middleware(request, event);
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });
});
