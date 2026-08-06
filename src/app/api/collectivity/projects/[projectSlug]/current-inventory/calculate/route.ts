import { NextResponse } from "next/server";

import {
  calculateCollectivityInventory,
  CollectivityBackendError,
} from "@/lib/collectivity/backend";
import { getUserPlanIds, hasUserProductAccess } from "@/lib/auth/profile";
import { getServerSession } from "@/lib/auth/session";

type RouteContext = {
  params: Promise<{
    projectSlug: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { projectSlug } = await context.params;
  const session = await getServerSession();

  if (!session.authenticated || !session.user) {
    return NextResponse.json(
      {
        error: {
          status: 401,
          message: "Authentication required",
        },
      },
      { status: 401 }
    );
  }

  if (!hasUserProductAccess(session.user, "collectivity")) {
    return NextResponse.json(
      {
        error: {
          status: 403,
          message: "Collectivity access required",
        },
      },
      { status: 403 }
    );
  }

  if (!getUserPlanIds(session.user).includes(projectSlug)) {
    return NextResponse.json(
      {
        error: {
          status: 403,
          message: "Collectivity plan access required",
        },
      },
      { status: 403 }
    );
  }

  const body = (await request.json()) as {
    inventoryInput?: unknown;
  };

  if (
    !body.inventoryInput ||
    typeof body.inventoryInput !== "object" ||
    Array.isArray(body.inventoryInput)
  ) {
    return NextResponse.json(
      {
        error: {
          status: 400,
          message: "Invalid collectivity inventory calculation payload",
        },
      },
      { status: 400 }
    );
  }

  try {
    const result = await calculateCollectivityInventory(
      projectSlug,
      body.inventoryInput as Record<string, unknown>
    );

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    console.error("collectivityCalculateProxyError", error);
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: error instanceof Error ? error.message : "Collectivity calculate proxy failed",
        },
      },
      { status: 500 }
    );
  }
}
