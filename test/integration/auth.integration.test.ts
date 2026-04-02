import { beforeAll, describe, expect, it } from "vitest";
import { AUTH_ACCESS_COOKIE, AUTH_REFRESH_COOKIE, AUTH_USER_COOKIE } from "@/lib/auth/constants";
import {
  authCookieNames,
  CookieJar,
  ensureIntegrationServicesAvailable,
  fetchFrontend,
  getSetCookieHeaders,
  integrationConfig,
} from "./auth-helpers";

describe.sequential("auth integration", () => {
  let authenticatedJar: CookieJar;
  let authenticatedSession: {
    user: { email: string };
    setCookies: string[];
  } | null = null;

  beforeAll(async () => {
    await ensureIntegrationServicesAvailable();
    const signInResult = await signIn();
    authenticatedJar = signInResult.jar;
    authenticatedSession = signInResult;
  });

  it("returns an unauthenticated session without cookies", async () => {
    const response = await fetchFrontend("/api/auth/session");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: false,
      user: null,
    });
  });

  it("signs in with valid credentials and sets auth cookies", async () => {
    const body = {
      authenticated: true,
      user: authenticatedSession?.user,
    };

    expect(body).toEqual({
      authenticated: true,
      user: expect.objectContaining({
        email: integrationConfig.testEmail,
      }),
    });
    expect(body).not.toHaveProperty("access_token");
    expect(body).not.toHaveProperty("refresh_token");

    for (const cookieName of authCookieNames) {
      expect(
        authenticatedSession?.setCookies.some((header) => header.startsWith(`${cookieName}=`))
      ).toBe(true);
    }

    expect(authenticatedJar.has(AUTH_ACCESS_COOKIE)).toBe(true);
    expect(authenticatedJar.has(AUTH_REFRESH_COOKIE)).toBe(true);
    expect(authenticatedJar.has(AUTH_USER_COOKIE)).toBe(true);
  });

  it("returns an authenticated session when valid cookies are present", async () => {
    const jar = authenticatedJar.clone();
    const response = await fetchFrontend("/api/auth/session", undefined, jar);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: true,
      user: expect.objectContaining({
        email: integrationConfig.testEmail,
      }),
    });
  });

  it("redirects unauthenticated users from /form to sign-in with returnTo", async () => {
    const response = await fetchFrontend("/form");

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("/auth/sign-in?returnTo=%2Fform");
  });

  it("allows authenticated users to access /form", async () => {
    const jar = authenticatedJar.clone();
    const response = await fetchFrontend("/form", undefined, jar);

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("content-type")).toContain("text/html");
  });

  it("logs out and clears the auth session", async () => {
    const jar = authenticatedJar.clone();
    const logoutResponse = await fetchFrontend(
      "/api/auth/logout",
      {
        method: "POST",
      },
      jar
    );

    expect(logoutResponse.status).toBe(200);
    await expect(logoutResponse.json()).resolves.toEqual({ ok: true });

    const setCookies = getSetCookieHeaders(logoutResponse);
    for (const cookieName of authCookieNames) {
      expect(setCookies.some((header) => header.startsWith(`${cookieName}=`))).toBe(true);
    }

    const sessionResponse = await fetchFrontend("/api/auth/session", undefined, jar);
    await expect(sessionResponse.json()).resolves.toEqual({
      authenticated: false,
      user: null,
    });
  });

  it("returns the backend auth error code and no cookies for invalid credentials", async () => {
    const jar = new CookieJar();
    const response = await fetchFrontend(
      "/api/auth/sign-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: integrationConfig.testEmail,
          password: `${integrationConfig.testPassword}-invalid`,
        }),
      },
      jar
    );

    expect(response.status).toBe(401);

    const body = await response.json();
    expect(body).toEqual(
      expect.objectContaining({
        data: null,
        error: expect.objectContaining({
          details: expect.objectContaining({
            code: "AUTH_INVALID_CREDENTIALS",
          }),
        }),
      })
    );

    expect(jar.has(AUTH_ACCESS_COOKIE)).toBe(false);
    expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(false);
    expect(jar.has(AUTH_USER_COOKIE)).toBe(false);
  });
});

async function signIn() {
  const jar = new CookieJar();
  const response = await fetchFrontend(
    "/api/auth/sign-in",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: integrationConfig.testEmail,
        password: integrationConfig.testPassword,
      }),
    },
    jar
  );

  expect(response.status).toBe(200);
  const body = await response.json();
  const setCookies = getSetCookieHeaders(response);
  expect(jar.has(AUTH_ACCESS_COOKIE)).toBe(true);
  expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(true);
  expect(jar.has(AUTH_USER_COOKIE)).toBe(true);

  return {
    jar,
    user: body.user as { email: string },
    setCookies,
  };
}
