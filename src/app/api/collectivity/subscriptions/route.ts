import { NextResponse } from "next/server";

import type { CreateCollectivitySubscriptionRequest } from "@/app/[locale]/collectivity/pricing/_lib/pricing";
import {
  CollectivityBackendError,
  createCollectivitySubscription,
} from "@/lib/collectivity/backend";

export async function POST(request: Request) {
  let body: CreateCollectivitySubscriptionRequest;

  try {
    body = (await request.json()) as CreateCollectivitySubscriptionRequest;
  } catch {
    return NextResponse.json(
      {
        error: {
          status: 400,
          message: "Invalid collectivity subscription payload",
        },
      },
      { status: 400 }
    );
  }

  try {
    const subscription = await createCollectivitySubscription(body);
    return NextResponse.json({ data: subscription }, { status: 201 });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
