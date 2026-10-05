import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  getCollectivitySubscriptionDetail,
} from "@/lib/collectivity/backend";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ subscriptionId: string }> }
) {
  const { subscriptionId } = await params;
  const id = Number(subscriptionId);

  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid collectivity subscription id" } },
      { status: 400 }
    );
  }

  try {
    const subscription = await getCollectivitySubscriptionDetail(id);
    return NextResponse.json({ data: subscription });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
