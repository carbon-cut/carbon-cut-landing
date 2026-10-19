import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AuthSessionResponse } from "@/lib/auth/types";

const {
  mockCookies,
  mockSignIn,
  mockSignUp,
  mockRotateRefreshToken,
  mockRefreshSessionFromCookies,
  mockChangePassword,
  mockLogoutAndClearSession,
} = vi.hoisted(() => ({
  mockCookies: vi.fn(),
  mockSignIn: vi.fn(),
  mockSignUp: vi.fn(),
  mockRotateRefreshToken: vi.fn(),
  mockRefreshSessionFromCookies: vi.fn(),
  mockChangePassword: vi.fn(),
  mockLogoutAndClearSession: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: mockCookies,
}));

vi.mock("@/lib/auth/strapi", async () => {
  const actual = await vi.importActual<typeof import("@/lib/auth/strapi")>("@/lib/auth/strapi");

  return {
    ...actual,
    signIn: mockSignIn,
    signUp: mockSignUp,
    rotateRefreshToken: mockRotateRefreshToken,
    changePassword: mockChangePassword,
  };
});

vi.mock("@/lib/auth/session", async () => {
  const actual = await vi.importActual<typeof import("@/lib/auth/session")>("@/lib/auth/session");

  return {
    ...actual,
    refreshSessionFromCookies: mockRefreshSessionFromCookies,
    logoutAndClearSession: mockLogoutAndClearSession,
  };
});

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

function createCookieStore(overrides?: Partial<Record<string, string>>) {
  const values = new Map(Object.entries(overrides ?? {}));

  return {
    get(name: string) {
      const value = values.get(name);
      return value ? { value } : undefined;
    },
    set(name: string, value: string) {
      values.set(name, value);
    },
    delete(name: string) {
      values.delete(name);
    },
  };
}

describe("auth route handlers", () => {
  beforeEach(() => {
    vi.resetModules();
    mockSignIn.mockReset();
    mockSignUp.mockReset();
    mockRotateRefreshToken.mockReset();
    mockRefreshSessionFromCookies.mockReset();
    mockChangePassword.mockReset();
    mockLogoutAndClearSession.mockReset();
    mockCookies.mockResolvedValue(createCookieStore());
  });

  it("sign-in returns a browser-safe authenticated session and sets cookies", async () => {
    mockSignIn.mockResolvedValue(session);
    const { POST } = await import("@/app/api/auth/sign-in/route");

    const response = await POST(
      new Request("http://localhost/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({ identifier: "tester@example.com", password: "Password123!" }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: true,
      user: session.user,
    });
    expect(response.headers.get("set-cookie")).toContain("cc_access_token=access-token");
  });

  it("sign-up keeps pending confirmation responses cookie-free", async () => {
    mockSignUp.mockResolvedValue({
      user: {
        ...session.user,
        confirmed: false,
      },
      confirmation_required: true,
      confirmation_email_sent: true,
    });

    const { POST } = await import("@/app/api/auth/sign-up/route");
    const response = await POST(
      new Request("http://localhost/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          email: "tester@example.com",
          username: "tester",
          password: "Password123!",
        }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      user: {
        ...session.user,
        confirmed: false,
      },
      confirmation_required: true,
      confirmation_email_sent: true,
    });
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("only the refresh route rotates and writes a refreshed session", async () => {
    mockCookies.mockResolvedValue(
      createCookieStore({
        cc_refresh_token: "refresh-token",
      })
    );
    mockRotateRefreshToken.mockResolvedValue(session);

    const { GET } = await import("@/app/api/auth/session/route");
    const readResponse = await GET();

    await expect(readResponse.json()).resolves.toEqual({ authenticated: false, user: null });
    expect(readResponse.headers.get("set-cookie")).toBeNull();

    const { POST } = await import("@/app/api/auth/refresh/route");
    const response = await POST();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: true,
      user: session.user,
    });
    expect(response.headers.get("set-cookie")).toContain("cc_refresh_token=refresh-token");
    expect(mockRotateRefreshToken).toHaveBeenCalledWith("refresh-token");
  });

  it("change-password leaves a refresh-only session intact for browser recovery", async () => {
    mockCookies.mockResolvedValue(createCookieStore({ cc_refresh_token: "refresh-token" }));

    const { POST } = await import("@/app/api/auth/change-password/route");
    const response = await POST(
      new Request("http://localhost/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword: "old",
          password: "new",
          passwordConfirmation: "new",
        }),
      })
    );

    expect(response.status).toBe(401);
    expect(response.headers.get("set-cookie")).toBeNull();
    expect(mockRefreshSessionFromCookies).not.toHaveBeenCalled();
    expect(mockRotateRefreshToken).not.toHaveBeenCalled();
    expect(mockChangePassword).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({
      error: {
        message: "Authentication required",
        details: {
          code: "AUTH_AUTHENTICATION_REQUIRED",
        },
      },
    });
  });

  it("does not rotate a token when the current password is wrong", async () => {
    mockCookies.mockResolvedValue(
      createCookieStore({
        cc_access_token: "access-token",
        cc_refresh_token: "refresh-token",
      })
    );
    mockChangePassword.mockRejectedValue(
      new (await import("@/lib/auth/strapi")).StrapiAuthError(400, {
        error: {
          message: "Invalid current password",
          details: { code: "AUTH_INVALID_CURRENT_PASSWORD" },
        },
      })
    );

    const { POST } = await import("@/app/api/auth/change-password/route");
    const response = await POST(
      new Request("http://localhost/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword: "wrong",
          password: "new",
          passwordConfirmation: "new",
        }),
      })
    );

    expect(response.status).toBe(400);
    expect(response.headers.get("set-cookie")).toBeNull();
    expect(mockRotateRefreshToken).not.toHaveBeenCalled();
  });

  it("logout route always returns ok after clearing session state", async () => {
    const { POST } = await import("@/app/api/auth/logout/route");
    const response = await POST();

    expect(mockLogoutAndClearSession).toHaveBeenCalled();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.headers.get("set-cookie")).toContain("cc_access_token=;");
  });

  it("logout GET clears cookies and redirects to sign-in", async () => {
    const { GET } = await import("@/app/api/auth/logout/route");
    const response = await GET(
      new Request("http://localhost/api/auth/logout?returnTo=%2Fcollectivity%2Fproject-1%2Fsetup")
    );

    expect(mockLogoutAndClearSession).toHaveBeenCalled();
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/sign-in?returnTo=%2Fcollectivity%2Fproject-1%2Fsetup"
    );
    expect(response.headers.get("set-cookie")).toContain("cc_access_token=;");
  });
});
