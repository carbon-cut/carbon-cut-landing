import { cookies } from "next/headers";
import { readAuthCookies } from "@/lib/auth/cookies";
import { sessionResponse, strapiErrorResponse } from "@/lib/auth/response";
import { rotateRefreshToken, StrapiAuthError } from "@/lib/auth/strapi";

export async function POST() {
  const cookieStore = await cookies();
  const { refreshToken } = readAuthCookies(cookieStore);

  if (!refreshToken) {
    return Response.json(
      { error: { details: { code: "AUTH_AUTHENTICATION_REQUIRED" } } },
      { status: 401 }
    );
  }

  try {
    return sessionResponse(await rotateRefreshToken(refreshToken));
  } catch (error) {
    if (error instanceof StrapiAuthError && error.status < 500) {
      return strapiErrorResponse(error);
    }
    return strapiErrorResponse(error);
  }
}
