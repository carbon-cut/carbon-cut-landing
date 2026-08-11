import { http, HttpResponse } from "msw";
import type { CollectivitySetupData } from "@/app/[locale]/collectivity/setup/_lib/types";
import { getUserPlanIds } from "@/lib/auth/profile";
import { getMockUserByAccessToken } from "@/mocks/auth";
import {
  getMockCollectivityInventoryResult,
  getMockCollectivitySetupSnapshot,
  getMockCollectivitySupportedValues,
  isMockCollectivityPlanIdUnique,
  saveMockCollectivityInventoryInput,
  saveMockCollectivitySetup,
} from "@/mocks/collectivity";

function error(status: number, message: string, details?: Record<string, unknown>) {
  return HttpResponse.json(
    { error: { status, message, ...(details ? { details } : {}) } },
    { status }
  );
}

function authenticatedUser(request: Request) {
  const accessToken = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  return getMockUserByAccessToken(accessToken);
}

function projectSlug(params: Record<string, string | readonly string[] | undefined>) {
  const value = params.projectSlug;
  return typeof value === "string" ? value : "";
}

export const collectivityHandlers = [
  http.get("*/api/collectivity/projects", ({ request }) => {
    const user = authenticatedUser(request);
    if (!user) return error(401, "Authentication required");

    const projects = getUserPlanIds(user)
      .map((planId) => getMockCollectivitySetupSnapshot(planId)?.project ?? null)
      .filter(Boolean);

    return HttpResponse.json({ data: projects });
  }),
  http.get("*/api/collectivity/projects/:projectSlug/current-inventory", ({ request, params }) => {
    if (!authenticatedUser(request)) return error(401, "Authentication required");

    const snapshot = getMockCollectivitySetupSnapshot(projectSlug(params));
    return snapshot
      ? HttpResponse.json({ data: snapshot })
      : error(404, "Collectivity inventory draft not found");
  }),
  http.post("*/api/collectivity/projects/init", async ({ request }) => {
    const user = authenticatedUser(request);
    if (!user) return error(401, "Authentication required");

    const setup = (await request.json()) as CollectivitySetupData;
    if (!isMockCollectivityPlanIdUnique(user, setup.slug)) {
      return error(409, "collectivityProjectSlugNotUnique", {
        fieldErrors: { slug: "collectivityProjectSlugNotUnique" },
      });
    }

    return HttpResponse.json({ data: saveMockCollectivitySetup(user, setup) });
  }),
  http.put("*/api/collectivity/projects/:projectSlug/setup", async ({ request, params }) => {
    const user = authenticatedUser(request);
    if (!user) return error(401, "Authentication required");

    const currentPlanId = projectSlug(params);
    const setup = (await request.json()) as CollectivitySetupData;
    if (!isMockCollectivityPlanIdUnique(user, setup.slug, currentPlanId)) {
      return error(409, "collectivityProjectSlugNotUnique", {
        fieldErrors: { slug: "collectivityProjectSlugNotUnique" },
      });
    }

    return HttpResponse.json({ data: saveMockCollectivitySetup(user, setup, currentPlanId) });
  }),
  http.put(
    "*/api/collectivity/projects/:projectSlug/current-inventory/input",
    async ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const payload = (await request.json()) as { inventoryInput: Record<string, unknown> };
      const snapshot = saveMockCollectivityInventoryInput(
        user,
        projectSlug(params),
        payload.inventoryInput
      );

      return snapshot
        ? HttpResponse.json({ data: snapshot })
        : error(404, "Collectivity inventory draft not found");
    }
  ),
  http.post("*/api/collectivity/projects/:projectSlug/current-inventory/calculate", () =>
    error(501, "Collectivity inventory calculation endpoint not implemented")
  ),
  http.get(
    "*/api/collectivity/projects/:projectSlug/current-inventory/result",
    ({ request, params }) => {
      if (!authenticatedUser(request)) return error(401, "Authentication required");

      const result = getMockCollectivityInventoryResult(projectSlug(params));
      return result ? HttpResponse.json(result) : error(404, "Calculation result not found");
    }
  ),
  http.post(
    "*/api/collectivity/projects/:projectSlug/current-inventory/debug-calculate",
    async ({ request }) => {
      if (!authenticatedUser(request)) return error(401, "Authentication required");

      const { datasetKey } = (await request.json()) as { datasetKey: string };
      const datasetSeed = Array.from(datasetKey).reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const parameterCount = (datasetSeed % 3) + 1;

      return HttpResponse.json({
        data: {
          datasetKey,
          emissionsPayload: { total: { value: 500 + datasetSeed, unit: "kgCO2e" } },
          parameterSnapshot: {
            items: Array.from({ length: parameterCount }, (_, index) => ({
              key: `mock-${datasetKey}-factor-${index + 1}`,
              selector: { datasetKey },
              value: index + 1,
              unit: "kgCO2e/unit",
              gas: "CO2e",
              country: null,
              validFromYear: null,
              validToYear: null,
              sourceReferenceId: null,
            })),
          },
          formulaVersion: `mock-debug-${parameterCount}`,
        },
      });
    }
  ),
  http.get("*/api/collectivity/supported-values/:familyKey/:selectorKey", ({ params }) => {
    const familyKey = String(params.familyKey);
    const selectorKey = String(params.selectorKey);
    const values = getMockCollectivitySupportedValues(familyKey, selectorKey);

    return values
      ? HttpResponse.json({ data: { familyKey, selectorKey, values } })
      : error(404, "Collectivity supported values not found");
  }),
];
