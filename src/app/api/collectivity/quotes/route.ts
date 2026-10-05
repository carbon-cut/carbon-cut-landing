import { NextResponse } from "next/server";

import type { CreateCollectivityQuoteRequest } from "@/app/[locale]/collectivity/pricing/_lib/pricing";
import { CollectivityBackendError, createCollectivityQuote } from "@/lib/collectivity/backend";

export async function POST(request: Request) {
  let body: CreateCollectivityQuoteRequest;

  try {
    body = (await request.json()) as CreateCollectivityQuoteRequest;
  } catch {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid collectivity quote payload" } },
      { status: 400 }
    );
  }

  try {
    const quote = await createCollectivityQuote(body);
    return NextResponse.json({ data: quote }, { status: 201 });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
