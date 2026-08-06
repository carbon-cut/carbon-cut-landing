import { NextResponse } from "next/server";

import {
  collectivitySetupSchema,
  type CollectivitySetupValues,
} from "@/app/collectivity/setup/_lib/schema";
import { CollectivityBackendError, saveCollectivitySetup } from "@/lib/collectivity/backend";
import { writeUserCookie } from "@/lib/auth/cookies";
import { getUserAllowedProducts, getUserPlanIds, hasUserProductAccess } from "@/lib/auth/profile";
import { getServerSession } from "@/lib/auth/session";

function flattenFieldErrors(fieldErrors: Record<string, string[] | undefined>) {
  return Object.fromEntries(
    Object.entries(fieldErrors)
      .map(([fieldName, messages]) => [fieldName, messages?.[0]])
      .filter(([, message]) => typeof message === "string")
  );
}

type RouteContext = {
  params: Promise<{ projectSlug: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
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

  const body = (await request.json()) as CollectivitySetupValues;
  const parsed = collectivitySetupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          status: 400,
          message: "Invalid collectivity setup payload",
          details: {
            fieldErrors: flattenFieldErrors(parsed.error.flatten().fieldErrors),
          },
        },
      },
      { status: 400 }
    );
  }

  try {
    const saved = await saveCollectivitySetup(session.user, parsed.data, projectSlug);
    const response = NextResponse.json({ data: saved });
    const nextPlanIds = getUserPlanIds(session.user).map((planId) =>
      planId === projectSlug ? saved.project.slug : planId
    );

    writeUserCookie(response.cookies, {
      ...session.user,
      allowedProducts: Array.from(
        new Set([...getUserAllowedProducts(session.user), "collectivity"])
      ),
      planId: nextPlanIds,
    });

    return response;
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
