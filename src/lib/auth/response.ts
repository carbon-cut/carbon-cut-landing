import { NextResponse } from "next/server";
import { clearSessionCookies, writeSessionCookies } from "@/lib/auth/cookies";
import { StrapiAuthError, StrapiTransportError } from "@/lib/auth/strapi";
import type { AuthSessionResponse, SessionState } from "@/lib/auth/types";

export function sessionResponse(session: AuthSessionResponse) {
  const response = NextResponse.json<SessionState>({
    authenticated: true,
    user: session.user,
  });

  writeSessionCookies(response.cookies, session);
  return response;
}

export function unauthenticatedResponse() {
  return NextResponse.json<SessionState>({
    authenticated: false,
    user: null,
  });
}

export function logoutResponse() {
  const response = NextResponse.json({ ok: true });
  clearSessionCookies(response.cookies);
  return response;
}

export function strapiErrorResponse(error: unknown) {
  if (error instanceof StrapiAuthError) {
    return NextResponse.json(error.body, {
      status: error.status,
    });
  }

  if (error instanceof StrapiTransportError) {
    return NextResponse.json(error.body, {
      status: error.status,
    });
  }

  throw error;
}
