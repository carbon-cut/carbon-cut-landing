import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  retryCollectivityInvitationRequest,
} from "@/lib/collectivity/backend";

export async function POST(request: Request, { params }: { params: Promise<{ claimId: string }> }) {
  const claimId = Number((await params).claimId);
  const body = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  if (!Number.isSafeInteger(claimId) || claimId < 1 || !token) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid claim id or invitation token" } },
      { status: 400 }
    );
  }
  try {
    return NextResponse.json({ data: await retryCollectivityInvitationRequest(claimId, token) });
  } catch (error) {
    if (error instanceof CollectivityBackendError)
      return NextResponse.json(error.body, { status: error.status });
    throw error;
  }
}
