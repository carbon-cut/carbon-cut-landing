import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  getLatestCollectivitySubscription,
} from "@/lib/collectivity/backend";

export async function GET() {
  try {
    const subscription = await getLatestCollectivitySubscription();
    return NextResponse.json({ data: subscription });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
