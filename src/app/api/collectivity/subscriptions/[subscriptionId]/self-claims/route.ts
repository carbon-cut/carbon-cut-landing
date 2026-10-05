import { NextResponse } from "next/server";

import {
  assignCollectivitySubscriptionPlaceToSelf,
  CollectivityBackendError,
} from "@/lib/collectivity/backend";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ subscriptionId: string }> }
) {
  const { subscriptionId } = await params;
  const id = Number(subscriptionId);

  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid collectivity subscription id" } },
      { status: 400 }
    );
  }

  try {
    const claim = await assignCollectivitySubscriptionPlaceToSelf(id);
    return NextResponse.json({ data: claim });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
