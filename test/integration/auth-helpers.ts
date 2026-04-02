import fs from "node:fs";
import path from "node:path";
import { AUTH_ACCESS_COOKIE, AUTH_REFRESH_COOKIE, AUTH_USER_COOKIE } from "@/lib/auth/constants";

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
  testEmail: getRequiredEnv("INTEGRATION_TEST_EMAIL"),
  testPassword: getRequiredEnv("INTEGRATION_TEST_PASSWORD"),
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
  const headers = jar ? jar.apply(init.headers) : new Headers(init.headers);
  const response = await fetch(new URL(path, integrationConfig.frontendUrl), {
    ...init,
    headers,
    redirect: "manual",
    cache: "no-store",
  });

  jar?.updateFromResponse(response);
  return response;
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
