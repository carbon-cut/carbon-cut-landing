import { NextResponse } from "next/server";

import {
  debugCalculateCollectivityDataset,
  CollectivityBackendError,
} from "@/lib/collectivity/backend";
import { getUserPlanIds, hasUserProductAccess } from "@/lib/auth/profile";
import { getServerSession } from "@/lib/auth/session";

const calculationDatasetKeys = [
  "fleet",
  "publicLighting",
  "buildings",
  "treesParksWaste",
  "electricity",
  "photovoltaic",
  "naturalGas",
  "solarWaterHeating",
  "publicTransport",
  "airTransport",
  "port",
  "territoryVehicles",
  "trees",
  "livestock",
  "fertilizers",
] as const;

type RouteContext = {
  params: Promise<{
    projectSlug: string;
  }>;
};

function isCalculationDatasetKey(value: unknown): value is (typeof calculationDatasetKeys)[number] {
  return (
    typeof value === "string" &&
    calculationDatasetKeys.includes(value as (typeof calculationDatasetKeys)[number])
  );
}

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
    datasetKey?: unknown;
    inventoryInput?: unknown;
  };

  if (
    !isCalculationDatasetKey(body.datasetKey) ||
    !body.inventoryInput ||
    typeof body.inventoryInput !== "object" ||
    Array.isArray(body.inventoryInput)
  ) {
    return NextResponse.json(
      {
        error: {
          status: 400,
          message: "Invalid debug calculation payload",
        },
      },
      { status: 400 }
    );
  }

  try {
    const datasetKey = body.datasetKey;
    const inventoryInput = body.inventoryInput as Record<string, unknown>;
    const result = await debugCalculateCollectivityDataset({
      projectSlug,
      datasetKey,
      inventoryInput,
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      return NextResponse.json(error.body, { status: error.status });
    }

    throw error;
  }
}
