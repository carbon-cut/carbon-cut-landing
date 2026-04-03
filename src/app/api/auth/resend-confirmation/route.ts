import { NextResponse } from "next/server";
import { resendConfirmation } from "@/lib/auth/strapi";
import { strapiErrorResponse } from "@/lib/auth/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await resendConfirmation(body);
    return NextResponse.json(result);
  } catch (error) {
    return strapiErrorResponse(error);
  }
}
