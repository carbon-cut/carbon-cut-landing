import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearSessionCookies, readAuthCookies, writeSessionCookies } from "@/lib/auth/cookies";
import { refreshSessionFromCookies } from "@/lib/auth/session";

export async function GET() {
  const cookieStore = await cookies();
  const { accessToken, refreshToken, user } = readAuthCookies(cookieStore);

  if (accessToken && user) {
    return NextResponse.json({
      authenticated: true,
      user,
    });
  }

  if (refreshToken) {
    const refreshedSession = await refreshSessionFromCookies(cookieStore);

    if (refreshedSession) {
      const response = NextResponse.json({
        authenticated: true,
        user: refreshedSession.user,
      });
      writeSessionCookies(response.cookies, refreshedSession);
      return response;
    }
  }

  const response = NextResponse.json({
    authenticated: false,
    user: null,
  });
  clearSessionCookies(response.cookies);
  return response;
}
