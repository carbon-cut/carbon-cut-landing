import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  submitCollectivityInvitationRequest,
} from "@/lib/collectivity/backend";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  if (!token) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Missing invitation token" } },
      { status: 400 }
    );
  }
  try {
    return NextResponse.json({ data: await submitCollectivityInvitationRequest(token) });
  } catch (error) {
    if (error instanceof CollectivityBackendError)
      return NextResponse.json(error.body, { status: error.status });
    throw error;
  }
}
