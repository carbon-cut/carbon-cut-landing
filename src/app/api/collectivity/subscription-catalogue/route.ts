import { NextResponse } from "next/server";

import { CollectivityBackendError, getSubscriptionCatalogue } from "@/lib/collectivity/backend";

export async function GET() {
  try {
    const catalogue = await getSubscriptionCatalogue();
    return NextResponse.json({ data: catalogue });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
