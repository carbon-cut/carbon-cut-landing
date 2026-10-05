import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  getCollectivityInvitationClaim,
} from "@/lib/collectivity/backend";

export async function GET(_request: Request, { params }: { params: Promise<{ claimId: string }> }) {
  const claimId = Number((await params).claimId);
  if (!Number.isSafeInteger(claimId) || claimId < 1) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid claim id" } },
      { status: 400 }
    );
  }
  try {
    return NextResponse.json({ data: await getCollectivityInvitationClaim(claimId) });
  } catch (error) {
    if (error instanceof CollectivityBackendError)
      return NextResponse.json(error.body, { status: error.status });
    throw error;
  }
}
