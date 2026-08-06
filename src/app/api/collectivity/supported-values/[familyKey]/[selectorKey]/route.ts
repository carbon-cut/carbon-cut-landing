import { NextResponse } from "next/server";

import {
  CollectivityBackendError,
  listCollectivitySupportedValues,
} from "@/lib/collectivity/backend";
import { getServerSession } from "@/lib/auth/session";
import { hasUserProductAccess } from "@/lib/auth/profile";

type RouteContext = {
  params: Promise<{
    familyKey: string;
    selectorKey: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { familyKey, selectorKey } = await context.params;
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

  try {
    const data = await listCollectivitySupportedValues(familyKey, selectorKey);
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
