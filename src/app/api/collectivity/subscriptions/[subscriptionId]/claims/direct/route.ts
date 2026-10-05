import { NextResponse } from "next/server";

import {
  assignCollectivitySubscriptionPlaceDirectly,
  CollectivityBackendError,
} from "@/lib/collectivity/backend";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ subscriptionId: string }> }
) {
  const { subscriptionId } = await params;
  const id = Number(subscriptionId);
  const body = (await request.json().catch(() => null)) as { claimantUserId?: unknown } | null;
  const claimantUserId = typeof body?.claimantUserId === "number" ? body.claimantUserId : NaN;

  if (
    !Number.isSafeInteger(id) ||
    id < 1 ||
    !Number.isSafeInteger(claimantUserId) ||
    claimantUserId < 1
  ) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid subscription or claimant user id" } },
      { status: 400 }
    );
  }

  try {
    const claim = await assignCollectivitySubscriptionPlaceDirectly(id, claimantUserId);
    return NextResponse.json({ data: claim });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
