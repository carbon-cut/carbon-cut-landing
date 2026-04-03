import type { AuthSessionResponse, AuthUser } from "@/lib/auth/types";
import {
  AUTH_ACCESS_COOKIE,
  AUTH_COOKIE_PATH,
  AUTH_REFRESH_COOKIE,
  AUTH_USER_COOKIE,
} from "@/lib/auth/constants";

type CookieReader = {
  get(name: string): { value: string } | undefined;
};

type CookieWriter = {
  set(
    name: string,
    value: string,
    options?: {
      httpOnly?: boolean;
      path?: string;
      sameSite?: "lax" | "strict";
      secure?: boolean;
    }
  ): void;
};

type CookieDeleter = {
  delete(name: string): void;
};

export type AuthCookies = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
};

function shouldSecureCookies() {
  return process.env.NODE_ENV === "production";
}

function serializeUser(user: AuthUser) {
  return encodeURIComponent(JSON.stringify(user));
}

function parseUser(value?: string | null) {
  if (!value) return null;

  try {
    return JSON.parse(decodeURIComponent(value)) as AuthUser;
  } catch {
    return null;
  }
}

export function readAuthCookies(cookieStore: CookieReader): AuthCookies {
  return {
    accessToken: cookieStore.get(AUTH_ACCESS_COOKIE)?.value ?? null,
    refreshToken: cookieStore.get(AUTH_REFRESH_COOKIE)?.value ?? null,
    user: parseUser(cookieStore.get(AUTH_USER_COOKIE)?.value),
  };
}

export function writeSessionCookies(cookieStore: CookieWriter, session: AuthSessionResponse) {
  cookieStore.set(AUTH_ACCESS_COOKIE, session.access_token, {
    httpOnly: true,
    path: AUTH_COOKIE_PATH,
    sameSite: "lax",
    secure: shouldSecureCookies(),
  });
  cookieStore.set(AUTH_REFRESH_COOKIE, session.refresh_token, {
    httpOnly: true,
    path: AUTH_COOKIE_PATH,
    sameSite: "strict",
    secure: shouldSecureCookies(),
  });
  cookieStore.set(AUTH_USER_COOKIE, serializeUser(session.user), {
    httpOnly: true,
    path: AUTH_COOKIE_PATH,
    sameSite: "lax",
    secure: shouldSecureCookies(),
  });
}

export function clearSessionCookies(cookieStore: CookieDeleter) {
  cookieStore.delete(AUTH_ACCESS_COOKIE);
  cookieStore.delete(AUTH_REFRESH_COOKIE);
  cookieStore.delete(AUTH_USER_COOKIE);
}
