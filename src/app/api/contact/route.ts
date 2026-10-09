import { NextResponse } from "next/server";
import type { operations } from "@/generated/backend-api";

type ContactRequest =
  operations["sendContactMessage"]["requestBody"]["content"]["application/json"];

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json(
      { error: { status: 400, message: "Invalid contact payload" } },
      { status: 400 }
    );
  }

  const backendUrl = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_SERVER;
  if (!backendUrl) {
    return NextResponse.json(
      { error: { status: 503, message: "Contact service unavailable" } },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const responseBody = await response.json().catch(() => null);
    return NextResponse.json(responseBody, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: { status: 503, message: "Contact service unavailable" } },
      { status: 503 }
    );
  }
}
