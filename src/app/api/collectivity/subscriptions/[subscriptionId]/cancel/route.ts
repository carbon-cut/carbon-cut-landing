import { NextResponse } from "next/server";

import {
  cancelCollectivitySubscription,
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
      { error: { status: 400, message: "Invalid collectivity subscription id" } },
      { status: 400 }
    );
  }

  try {
    const subscription = await cancelCollectivitySubscription(id);
    return NextResponse.json({ data: subscription });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
