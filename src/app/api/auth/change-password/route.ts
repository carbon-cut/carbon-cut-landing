import { cookies } from "next/headers";
import { readAuthCookies } from "@/lib/auth/cookies";
import { changePassword } from "@/lib/auth/strapi";
import { sessionResponse, strapiErrorResponse } from "@/lib/auth/response";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const { accessToken } = readAuthCookies(cookieStore);

    if (!accessToken) {
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

    const body = await request.json();
    const session = await changePassword(accessToken, body);
    return sessionResponse(session);
  } catch (error) {
    return strapiErrorResponse(error);
  }
}
