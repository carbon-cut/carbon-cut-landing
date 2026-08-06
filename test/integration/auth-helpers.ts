import fs from "node:fs";
import path from "node:path";
import { AUTH_ACCESS_COOKIE, AUTH_REFRESH_COOKIE, AUTH_USER_COOKIE } from "@/lib/auth/constants";
const AUTH_TEST_SUPPORT_HEADER = "x-auth-test-support-key";

loadLocalEnv();

function loadLocalEnv() {
  for (const filename of [".env.local", ".env"]) {
    const filePath = path.join(process.cwd(), filename);

    if (!fs.existsSync(filePath)) continue;

    const contents = fs.readFileSync(filePath, "utf8");

    for (const rawLine of contents.split(/\r?\n/)) {
      const line = rawLine.trim();

      if (!line || line.startsWith("#")) continue;

      const separatorIndex = line.indexOf("=");

      if (separatorIndex === -1) continue;

      const key = line.slice(0, separatorIndex).trim();
      if (!key || process.env[key] !== undefined) continue;

      let value = line.slice(separatorIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[key] = value;
    }
  }
}

function getRequiredEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];

    if (value) {
      return value;
    }
  }

  throw new Error(`Missing required integration env var: ${names.join(" or ")}`);
}

export const integrationConfig = {
  frontendUrl: getRequiredEnv("FRONTEND_URL", "INTEGRATION_FRONTEND_URL").replace(/\/$/, ""),
  backendUrl: getRequiredEnv("BACKEND_URL", "INTEGRATION_BACKEND_URL").replace(/\/$/, ""),
  authTestSupportKey: getRequiredEnv("AUTH_TEST_SUPPORT_KEY"),
};

export const authCookieNames = [AUTH_ACCESS_COOKIE, AUTH_REFRESH_COOKIE, AUTH_USER_COOKIE] as const;

type MutableHeaders = Headers & {
  getSetCookie?: () => string[];
};

export class CookieJar {
  private readonly cookies = new Map<string, string>();

  apply(headers?: HeadersInit) {
    const nextHeaders = new Headers(headers);
    const cookieHeader = this.toHeader();

    if (cookieHeader) {
      nextHeaders.set("Cookie", cookieHeader);
    }

    return nextHeaders;
  }

  updateFromResponse(response: Response) {
    for (const header of getSetCookieHeaders(response)) {
      const parsed = parseSetCookie(header);

      if (!parsed) continue;

      if (parsed.shouldDelete || parsed.value === "") {
        this.cookies.delete(parsed.name);
        continue;
      }

      this.cookies.set(parsed.name, parsed.value);
    }
  }

  has(name: string) {
    return this.cookies.has(name);
  }

  delete(name: string) {
    this.cookies.delete(name);
  }

  clone() {
    const next = new CookieJar();

    for (const [name, value] of this.cookies.entries()) {
      next.cookies.set(name, value);
    }

    return next;
  }

  toHeader() {
    return [...this.cookies.entries()].map(([name, value]) => `${name}=${value}`).join("; ");
  }
}

export async function ensureServiceAvailable(name: string, url: string) {
  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
    });
  } catch (error) {
    throw new Error(`${name} is not reachable at ${url}: ${(error as Error).message}`);
  }

  if (response.status >= 500) {
    throw new Error(`${name} returned ${response.status} at ${url}`);
  }
}

export async function ensureIntegrationServicesAvailable() {
  await ensureServiceAvailable("Frontend", integrationConfig.frontendUrl);
  await ensureServiceAvailable("Backend", integrationConfig.backendUrl);
}

export async function fetchFrontend(path: string, init: RequestInit = {}, jar?: CookieJar) {
  const headers = withAuthTestSupportHeaders(jar ? jar.apply(init.headers) : new Headers(init.headers));
  const response = await fetch(new URL(path, integrationConfig.frontendUrl), {
    ...init,
    headers,
    redirect: "manual",
    cache: "no-store",
  });

  jar?.updateFromResponse(response);
  return response;
}

export async function fetchBackendTestSupport(path: string, init: RequestInit = {}) {
  const response = await fetch(new URL(path, integrationConfig.backendUrl), {
    ...init,
    headers: withAuthTestSupportHeaders(init.headers),
    redirect: "manual",
    cache: "no-store",
  });

  return response;
}

export type TestSupportUser = {
  id: number;
  email: string;
  username: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
};

export async function createTestUser(params: {
  email?: string;
  username?: string;
  password: string;
  confirmed: boolean;
  blocked: boolean;
}) {
  const suffix = uniqueSuffix();
  const email = params.email ?? `auth-it-${suffix}@example.com`;
  const username = params.username ?? `auth-it-${suffix}`;

  const response = await fetchBackendTestSupport("/api/test-support/auth/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password: params.password,
      confirmed: params.confirmed,
      blocked: params.blocked,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create test user: ${response.status} ${await response.text()}`);
  }

  const body = (await response.json()) as { user: TestSupportUser };
  return {
    user: body.user,
    password: params.password,
  };
}

export async function cleanupTestUser(userId: number) {
  const response = await fetchBackendTestSupport("/api/test-support/auth/users/cleanup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to cleanup test user ${userId}: ${response.status} ${await response.text()}`);
  }

  return (await response.json()) as { ok: true; mode: "deleted" | "cleaned" };
}

export async function getConfirmationToken(userId: number) {
  const response = await fetchBackendTestSupport(
    `/api/test-support/auth/users/${userId}/confirmation-token`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch confirmation token for user ${userId}: ${response.status} ${await response.text()}`
    );
  }

  const body = (await response.json()) as { confirmation_token: string };
  return body.confirmation_token;
}

export async function getResetPasswordToken(userId: number) {
  const response = await fetchBackendTestSupport(
    `/api/test-support/auth/users/${userId}/reset-password-token`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch reset password token for user ${userId}: ${response.status} ${await response.text()}`
    );
  }

  const body = (await response.json()) as { reset_password_token: string };
  return body.reset_password_token;
}

export async function revokeRefreshTokens(userId: number) {
  const response = await fetchBackendTestSupport(
    `/api/test-support/auth/users/${userId}/revoke-refresh-tokens`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to revoke refresh tokens for user ${userId}: ${response.status} ${await response.text()}`
    );
  }

  return (await response.json()) as { ok: true };
}

export function uniquePassword() {
  return `Password123!-${uniqueSuffix()}`;
}

function uniqueSuffix() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function withAuthTestSupportHeaders(headers?: HeadersInit) {
  const nextHeaders = new Headers(headers);
  nextHeaders.set(AUTH_TEST_SUPPORT_HEADER, integrationConfig.authTestSupportKey);
  return nextHeaders;
}

export function getSetCookieHeaders(response: Response) {
  const headers = response.headers as MutableHeaders;

  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  const combined = response.headers.get("set-cookie");
  return combined ? [combined] : [];
}

function parseSetCookie(header: string) {
  const [pair, ...attributes] = header.split(";");
  const separatorIndex = pair.indexOf("=");

  if (separatorIndex === -1) return null;

  const name = pair.slice(0, separatorIndex).trim();
  const value = pair.slice(separatorIndex + 1).trim();
  const shouldDelete = attributes.some((attribute) => {
    const normalized = attribute.trim().toLowerCase();
    return (
      normalized === "max-age=0" ||
      normalized.startsWith("expires=thu, 01 jan 1970") ||
      normalized.startsWith("expires=thu, 1 jan 1970")
    );
  });

  return {
    name,
    value,
    shouldDelete,
  };
}
