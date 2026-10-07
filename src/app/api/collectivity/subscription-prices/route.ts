import { NextResponse } from "next/server";

import type { SubscriptionPricePreviewRequest } from "@/app/[locale]/collectivity/pricing/_lib/pricing";
import { CollectivityBackendError, getSubscriptionPricePreview } from "@/lib/collectivity/backend";

function invalidRequest() {
  return NextResponse.json(
    {
      error: {
        status: 400,
        message: "Invalid subscription price preview payload",
      },
    },
    { status: 400 }
  );
}

function isPricePreviewRequest(value: unknown): value is SubscriptionPricePreviewRequest {
  if (!value || typeof value !== "object") return false;

  const request = value as Record<string, unknown>;
  return (
    Number.isInteger(request.communeQuantity) &&
    (request.termYears === 1 || request.termYears === 3) &&
    typeof request.perimeter === "string" &&
    Array.isArray(request.moduleKeys) &&
    request.moduleKeys.every((moduleKey) => typeof moduleKey === "string")
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return invalidRequest();
  }

  if (!isPricePreviewRequest(body)) return invalidRequest();

  try {
    const preview = await getSubscriptionPricePreview(body);
    return NextResponse.json({ data: preview });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
