import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import type { AuthSessionResponse } from "@/lib/auth/types";

const session: AuthSessionResponse = {
  access_token: "access-token",
  refresh_token: "refresh-token",
  user: {
    id: 1,
    username: "tester",
    email: "tester@example.com",
    provider: "local",
    confirmed: true,
    blocked: false,
  },
};

describe("auth middleware", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.NEXT_PUBLIC_SERVER = "http://strapi.local";
  });

  it("allows requests that already have an access token and user cookie", async () => {
    const { middleware } = await import("@/server/middleware");
    const request = new NextRequest("http://localhost/form", {
      headers: {
        cookie: `cc_access_token=${session.access_token}; cc_auth_user=${encodeURIComponent(JSON.stringify(session.user))}`,
      },
    });

    const response = await middleware(request);
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("refreshes and forwards when only a refresh token is present", async () => {
    global.fetch = vi.fn(
      async () =>
        new Response(JSON.stringify(session), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        })
    ) as typeof fetch;

    const { middleware } = await import("@/server/middleware");
    const request = new NextRequest("http://localhost/form/questions", {
      headers: {
        cookie: "cc_refresh_token=refresh-token",
      },
    });

    const response = await middleware(request);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/refresh-token-rotation"),
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain("cc_access_token=access-token");
  });

  it("redirects to sign-in and preserves returnTo when unauthenticated", async () => {
    global.fetch = originalFetch;
    const { middleware } = await import("@/server/middleware");
    const request = new NextRequest("http://localhost/form/result?id=123");
    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/sign-in?returnTo=%2Fform%2Fresult%3Fid%3D123"
    );
  });
});
