import { NextResponse } from "next/server";

import { cancelCollectivityQuote, CollectivityBackendError } from "@/lib/collectivity/backend";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ quoteId: string }> }
) {
  const { quoteId } = await params;
  const id = Number(quoteId);

  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid collectivity quote id" } },
      { status: 400 }
    );
  }

  try {
    const quote = await cancelCollectivityQuote(id);
    return NextResponse.json({ data: quote });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
