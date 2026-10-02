import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  createCollectivitySubscriptionInvitationLink,
  revokeCollectivitySubscriptionInvitationLink,
} from "@/lib/collectivity/backend";

type RouteContext = { params: Promise<{ subscriptionId: string }> };

async function getSubscriptionId(params: RouteContext["params"]) {
  const { subscriptionId } = await params;
  const id = Number(subscriptionId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function POST(_request: Request, { params }: RouteContext) {
  const subscriptionId = await getSubscriptionId(params);

  if (subscriptionId === null) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid collectivity subscription id" } },
      { status: 400 }
    );
  }

  try {
    const link = await createCollectivitySubscriptionInvitationLink(subscriptionId);
    return NextResponse.json({ data: link });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const subscriptionId = await getSubscriptionId(params);

  if (subscriptionId === null) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Invalid collectivity subscription id" } },
      { status: 400 }
    );
  }

  try {
    await revokeCollectivitySubscriptionInvitationLink(subscriptionId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
