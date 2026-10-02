import { NextResponse } from "next/server";

import { CollectivityBackendError, getLatestCollectivityQuote } from "@/lib/collectivity/backend";

export async function GET() {
  try {
    const quote = await getLatestCollectivityQuote();
    return NextResponse.json({ data: quote });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
