import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  getCollectivityInvitationPreview,
} from "@/lib/collectivity/backend";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")?.trim();
  if (!token) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: "Missing invitation token" } },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json({ data: await getCollectivityInvitationPreview(token) });
  } catch (error) {
    if (error instanceof CollectivityBackendError)
      return NextResponse.json(error.body, { status: error.status });
    throw error;
  }
}
