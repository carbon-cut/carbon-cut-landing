import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  revokeCollectivitySubscriptionClaim,
} from "@/lib/collectivity/backend";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ subscriptionId: string; claimId: string }> }
) {
  const { subscriptionId, claimId } = await params;
  const subscriptionNumber = Number(subscriptionId);
  const claimNumber = Number(claimId);

  if (
    !Number.isSafeInteger(subscriptionNumber) ||
    subscriptionNumber < 1 ||
    !Number.isSafeInteger(claimNumber) ||
    claimNumber < 1
  ) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid subscription or claim id" } },
      { status: 400 }
    );
  }

  try {
    const claim = await revokeCollectivitySubscriptionClaim(subscriptionNumber, claimNumber);
    return NextResponse.json({ data: claim });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
