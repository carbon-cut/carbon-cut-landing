import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  getCollectivityInventoryResult,
} from "@/lib/collectivity/backend";
import { getUserPlanIds, hasUserProductAccess } from "@/lib/auth/profile";
import { getServerSession } from "@/lib/auth/session";

type RouteContext = {
  params: Promise<{
    projectSlug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
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

  try {
    const result = await getCollectivityInventoryResult(projectSlug);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    console.error("collectivityResultProxyError", error);
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: error instanceof Error ? error.message : "Collectivity result proxy failed",
        },
      },
      { status: 500 }
    );
  }
}
