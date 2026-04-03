import { NextResponse, type NextRequest } from "next/server";
import { clearSessionCookies, readAuthCookies, writeSessionCookies } from "@/lib/auth/cookies";
import { buildSignInRedirect } from "@/lib/auth/redirect";
import type { AuthSessionResponse } from "@/lib/auth/types";
import { isMockBackendEnabled } from "@/mocks/config";
import { mockRotateRefreshToken, MockAuthError } from "@/mocks/auth";
const AUTH_TEST_SUPPORT_HEADER = "x-auth-test-support-key";

function getStrapiBaseUrl() {
  const baseUrl = process.env.STRAPI_INTERNAL_URL ?? process.env.NEXT_PUBLIC_SERVER;

  if (!baseUrl) {
    throw new Error("Missing STRAPI_INTERNAL_URL or NEXT_PUBLIC_SERVER");
  }

  return baseUrl.replace(/\/$/, "");
}

function getAuthTestSupportHeaders() {
  const secret = process.env.AUTH_TEST_SUPPORT_KEY;

  if (!secret) {
    return new Headers();
  }

  return new Headers({
    [AUTH_TEST_SUPPORT_HEADER]: secret,
  });
}

async function rotateSession(refreshToken: string) {
  if (isMockBackendEnabled()) {
    try {
      return mockRotateRefreshToken(refreshToken);
    } catch (error) {
      if (error instanceof MockAuthError) {
        return null;
      }

      throw error;
    }
  }

  const response = await fetch(`${getStrapiBaseUrl()}/api/refresh-token-rotation`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      ...Object.fromEntries(getAuthTestSupportHeaders().entries()),
    }),
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AuthSessionResponse;
}

export async function middleware(request: NextRequest) {
  const { accessToken, refreshToken, user } = readAuthCookies(request.cookies);

  if (accessToken && user) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const session = await rotateSession(refreshToken);

    if (session) {
      const response = NextResponse.next();
      writeSessionCookies(response.cookies, session);
      return response;
    }
  }

  const returnTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const response = NextResponse.redirect(new URL(buildSignInRedirect(returnTo), request.url));
  clearSessionCookies(response.cookies);
  return response;
}

export const config = {
  matcher: ["/form/:path*"],
};
