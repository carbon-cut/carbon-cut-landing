import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readAuthCookies } from "@/lib/auth/cookies";
import { isAccessTokenCurrent } from "@/lib/auth/token";

export async function GET() {
  const cookieStore = await cookies();
  const { accessToken, user } = readAuthCookies(cookieStore);

  if (accessToken && user && isAccessTokenCurrent(accessToken)) {
    return NextResponse.json({
      authenticated: true,
      user,
    });
  }

  return NextResponse.json({
    authenticated: false,
    user: null,
  });
}
