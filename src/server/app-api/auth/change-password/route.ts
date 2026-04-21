import { cookies } from "next/headers";
import { readAuthCookies } from "@/lib/auth/cookies";
import { refreshSessionFromCookies } from "@/lib/auth/session";
import { changePassword } from "@/lib/auth/strapi";
import { sessionResponse, strapiErrorResponse } from "@/lib/auth/response";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const { accessToken } = readAuthCookies(cookieStore);

    let activeAccessToken = accessToken;

    if (!activeAccessToken) {
      const refreshed = await refreshSessionFromCookies(cookieStore);

      if (!refreshed) {
        return NextResponse.json(
          {
            error: {
              message: "Authentication required",
              details: {
                code: "AUTH_AUTHENTICATION_REQUIRED",
              },
            },
          },
          { status: 401 }
        );
      }

      activeAccessToken = refreshed.access_token;
    }

    const body = await request.json();
    const session = await changePassword(activeAccessToken, body);
    return sessionResponse(session);
  } catch (error) {
    return strapiErrorResponse(error);
  }
}
