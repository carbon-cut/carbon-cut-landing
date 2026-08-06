import { NextResponse } from "next/server";
import { signUp } from "@/lib/auth/strapi";
import { sessionResponse, strapiErrorResponse } from "@/lib/auth/response";
import { isAuthSessionResponse } from "@/lib/auth/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await signUp(body);

    if (isAuthSessionResponse(result)) {
      return sessionResponse(result);
    }

    return NextResponse.json(result);
  } catch (error) {
    return strapiErrorResponse(error);
  }
}
