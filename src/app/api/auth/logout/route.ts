import { NextResponse } from "next/server";

import { clearSessionCookies } from "@/lib/auth/cookies";
import { sanitizeReturnTo } from "@/lib/auth/redirect";
import { logoutAndClearSession } from "@/lib/auth/session";
import { logoutResponse } from "@/lib/auth/response";

export async function GET(request: Request) {
  await logoutAndClearSession();

  const { searchParams } = new URL(request.url);
  const returnTo = sanitizeReturnTo(searchParams.get("returnTo"));
  const response = NextResponse.redirect(new URL(returnTo ?? "/", request.url));

  clearSessionCookies(response.cookies);

  return response;
}

export async function POST() {
  await logoutAndClearSession();
  return logoutResponse();
}
