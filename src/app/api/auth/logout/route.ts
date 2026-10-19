import { NextResponse } from "next/server";

import { clearSessionCookies } from "@/lib/auth/cookies";
import { buildSignInRedirect } from "@/lib/auth/redirect";
import { logoutAndClearSession } from "@/lib/auth/session";
import { logoutResponse } from "@/lib/auth/response";

export async function GET(request: Request) {
  await logoutAndClearSession();

  const { searchParams } = new URL(request.url);
  const response = NextResponse.redirect(
    new URL(buildSignInRedirect(searchParams.get("returnTo")), request.url)
  );

  clearSessionCookies(response.cookies);

  return response;
}

export async function POST() {
  await logoutAndClearSession();
  return logoutResponse();
}
