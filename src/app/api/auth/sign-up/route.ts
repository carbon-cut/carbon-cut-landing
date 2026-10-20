import { NextResponse } from "next/server";
import { signUp } from "@/lib/auth/strapi";
import { sessionResponse, strapiErrorResponse } from "@/lib/auth/response";
import { StrapiTransportError } from "@/lib/auth/strapi";
import { isAuthSessionResponse, isRegistrationPendingResponse } from "@/lib/auth/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await signUp(body);

    if (isAuthSessionResponse(result)) {
      return sessionResponse(result);
    }

    if (isRegistrationPendingResponse(result)) {
      return NextResponse.json(result);
    }

    throw new StrapiTransportError(
      "AUTH_UPSTREAM_INVALID_RESPONSE",
      "Authentication service returned an invalid registration response",
      502
    );
  } catch (error) {
    return strapiErrorResponse(error);
  }
}
