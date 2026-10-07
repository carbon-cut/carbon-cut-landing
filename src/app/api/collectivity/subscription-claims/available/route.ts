import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  getAvailableCollectivityClaims,
} from "@/lib/collectivity/backend";

export async function GET() {
  try {
    return NextResponse.json({ data: await getAvailableCollectivityClaims() });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
