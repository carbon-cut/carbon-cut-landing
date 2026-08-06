import { NextResponse } from "next/server";

import {
  collectivitySetupSchema,
  type CollectivitySetupValues,
} from "@/app/collectivity/setup/_lib/schema";
import {
  CollectivityBackendError,
  getCollectivitySetupSnapshot,
  saveCollectivitySetup,
} from "@/lib/collectivity/backend";
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const planId = searchParams.get("planId")?.trim();
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

  if (!planId) {
    return NextResponse.json(
      {
        error: {
          status: 400,
          message: "Missing planId",
        },
      },
      { status: 400 }
    );
  }

  if (!getUserPlanIds(session.user).includes(planId)) {
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
    const setup = await getCollectivitySetupSnapshot(planId);

    if (!setup) {
      return NextResponse.json(
        {
          error: {
            status: 404,
            message: "Setup not found",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: setup });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const currentPlanId = searchParams.get("currentPlanId")?.trim() ?? null;
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

  if (currentPlanId && !getUserPlanIds(session.user).includes(currentPlanId)) {
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
    const saved = await saveCollectivitySetup(session.user, parsed.data, currentPlanId);
    const response = NextResponse.json({ data: saved });
    const sessionPlanIds = getUserPlanIds(session.user);
    const nextPlanIds =
      currentPlanId &&
      currentPlanId !== saved.project.slug &&
      sessionPlanIds.includes(currentPlanId)
        ? sessionPlanIds.map((planId) => (planId === currentPlanId ? saved.project.slug : planId))
        : Array.from(new Set([...sessionPlanIds, saved.project.slug]));

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
