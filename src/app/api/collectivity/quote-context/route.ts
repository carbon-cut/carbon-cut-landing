import { NextResponse } from "next/server";

import { CollectivityBackendError, getQuoteContext } from "@/lib/collectivity/backend";

export async function GET() {
  try {
    const quoteContext = await getQuoteContext();
    return NextResponse.json({ data: quoteContext });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
