import { NextResponse } from "next/server";

import {
  collectivityCadrageSchema,
  type CollectivityCadrageValues,
} from "@/app/collectivity/_cadrage/schema";
import { writeUserCookie } from "@/lib/auth/cookies";
import { getUserPlanIds, getUserProductType } from "@/lib/auth/profile";
import { getServerSession } from "@/lib/auth/session";
import {
  getMockCollectivityCadrage,
  isMockCollectivityPlanIdUnique,
  saveMockCollectivityCadrage,
} from "@/mocks/collectivity";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const planId = searchParams.get("planId")?.trim();

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

  const cadrage = getMockCollectivityCadrage(planId);

  if (!cadrage) {
    return NextResponse.json(
      {
        error: {
          status: 404,
          message: "Cadrage not found",
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: cadrage });
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

  if (getUserProductType(session.user) !== "collectivity") {
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

  const body = (await request.json()) as CollectivityCadrageValues;
  const parsed = collectivityCadrageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          status: 400,
          message: "Invalid collectivity cadrage payload",
          details: parsed.error.flatten(),
        },
      },
      { status: 400 }
    );
  }

  if (!isMockCollectivityPlanIdUnique(session.user, parsed.data.planId, currentPlanId)) {
    return NextResponse.json(
      {
        error: {
          status: 409,
          message: "collectivityPlanIdNotUnique",
          details: {
            fieldErrors: {
              planId: "collectivityPlanIdNotUnique",
            },
          },
        },
      },
      { status: 409 }
    );
  }

  const saved = saveMockCollectivityCadrage(session.user, parsed.data, currentPlanId);
  const response = NextResponse.json({ data: saved });
  const sessionPlanIds = getUserPlanIds(session.user);
  const nextPlanIds =
    currentPlanId && currentPlanId !== saved.planId && sessionPlanIds.includes(currentPlanId)
      ? sessionPlanIds.map((planId) => (planId === currentPlanId ? saved.planId : planId))
      : Array.from(new Set([...sessionPlanIds, saved.planId]));

  writeUserCookie(response.cookies, {
    ...session.user,
    productType: "collectivity",
    planId: nextPlanIds,
  });

  return response;
}
