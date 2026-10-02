import { http, HttpResponse } from "msw";
import type { CollectivitySetupData } from "@/app/[locale]/collectivity/setup/_lib/types";
import type { SubscriptionCatalogue } from "@/app/[locale]/collectivity/pricing/_lib/pricing";
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
import {
  approveMockCollectivitySubscriptionClaim,
  assignMockCollectivitySubscriptionPlaceDirectly,
  assignMockCollectivitySubscriptionPlaceToSelf,
  createMockCollectivitySubscriptionInvitationLink,
  denyMockCollectivitySubscriptionClaim,
  getMockCollectivitySubscriptionClaims,
  getMockCollectivitySubscriptionDetail,
  getMockLatestCollectivityQuote,
  revokeMockCollectivitySubscriptionClaim,
  revokeMockCollectivitySubscriptionInvitationLink,
} from "@/mocks/collectivity-subscription";

const strapiUrl = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

const subscriptionCatalogue: SubscriptionCatalogue = {
  catalogueVersion: "2026-09-adjusted-v1",
  discountPolicyVersion: "2026-09-adjusted-v1",
  perimeters: ["patrimoine_communal", "territorial_communes"],
  modules: [
    {
      key: "ghg_inventory_scope_1_2",
      status: "available",
      annualRatesCents: { patrimoine_communal: 150000, territorial_communes: 350000 },
      conditions: [],
    },
    {
      key: "ghg_inventory_scope_3",
      status: "planned_later",
      annualRatesCents: { patrimoine_communal: 200000, territorial_communes: 600000 },
      conditions: [],
    },
    {
      key: "emission_factor_consolidation",
      status: "available",
      annualRatesCents: { patrimoine_communal: 60000, territorial_communes: 120000 },
      conditions: [],
    },
    {
      key: "prospective_objectives",
      status: "in_development",
      annualRatesCents: { patrimoine_communal: 80000, territorial_communes: 180000 },
      conditions: [],
    },
    {
      key: "ghg_mitigation_investment_plan",
      status: "in_development",
      annualRatesCents: { patrimoine_communal: 150000, territorial_communes: 450000 },
      conditions: [],
    },
    {
      key: "mrv_tracking",
      status: "in_development",
      annualRatesCents: { patrimoine_communal: 120000, territorial_communes: 350000 },
      conditions: [],
    },
    {
      key: "significant_indicators",
      status: "coming_soon",
      annualRatesCents: { patrimoine_communal: 70000, territorial_communes: 150000 },
      conditions: [],
    },
    {
      key: "scoring_100",
      status: "coming_soon",
      annualRatesCents: { patrimoine_communal: 80000, territorial_communes: 180000 },
      conditions: [],
    },
    {
      key: "intermunicipal_aggregation",
      status: "in_development",
      annualRatesCents: { patrimoine_communal: 40000, territorial_communes: 100000 },
      conditions: [{ field: "commune_count", operator: "gte", value: 3 }],
    },
  ],
  discountPolicy: {
    termYears: { "3": 2000 },
    communeCount: [
      { minimum: 5, discountBasisPoints: 1000 },
      { minimum: 10, discountBasisPoints: 2000 },
    ],
    maximumDiscountBasisPoints: 2500,
  },
};

function error(status: number, message: string, details?: Record<string, unknown>) {
  return HttpResponse.json(
    { data: null, error: { status, message, ...(details ? { details } : {}) } },
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

function numericParam(params: Record<string, string | readonly string[] | undefined>, key: string) {
  const value = params[key];
  const parsed = typeof value === "string" ? Number(value) : NaN;
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

function mutationError(result: { kind: string }) {
  if (result.kind === "capacity_full") {
    return error(409, "Subscription capacity is full", { code: "SUBSCRIPTION_CAPACITY_FULL" });
  }

  if (result.kind === "not_invited") {
    return error(409, "Claimant has no invitation history", { code: "CLAIMANT_NOT_INVITED" });
  }

  return error(409, "Subscription claim cannot be changed", { code: "INVALID_CLAIM_STATE" });
}

export const collectivityHandlers = [
  http.get(`${strapiUrl}/api/collectivity/subscription-catalogue`, () =>
    HttpResponse.json({ data: subscriptionCatalogue })
  ),
  http.get(`${strapiUrl}/api/collectivity/quotes/latest`, ({ request }) => {
    const user = authenticatedUser(request);
    if (!user) return error(401, "Authentication required");

    const quote = getMockLatestCollectivityQuote(user);
    return quote ? HttpResponse.json({ data: quote }) : error(404, "Collectivity quote not found");
  }),
  http.get(`${strapiUrl}/api/collectivity/subscriptions/:subscriptionId`, ({ request, params }) => {
    const user = authenticatedUser(request);
    if (!user) return error(401, "Authentication required");

    const subscriptionId = numericParam(params, "subscriptionId");
    if (subscriptionId === null) return error(404, "Collectivity subscription not found");

    const subscription = getMockCollectivitySubscriptionDetail(user, subscriptionId);
    return subscription
      ? HttpResponse.json({ data: subscription })
      : error(404, "Collectivity subscription not found");
  }),
  http.get(
    `${strapiUrl}/api/collectivity/subscriptions/:subscriptionId/claims`,
    ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const subscriptionId = numericParam(params, "subscriptionId");
      if (subscriptionId === null) return error(404, "Collectivity subscription not found");

      const claims = getMockCollectivitySubscriptionClaims(user, subscriptionId);
      return claims
        ? HttpResponse.json({ data: claims })
        : error(404, "Collectivity subscription not found");
    }
  ),
  http.post(
    `${strapiUrl}/api/collectivity/subscriptions/:subscriptionId/claim-link`,
    ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const subscriptionId = numericParam(params, "subscriptionId");
      if (subscriptionId === null) return error(404, "Collectivity subscription not found");

      const invitationLink = createMockCollectivitySubscriptionInvitationLink(user, subscriptionId);
      return invitationLink
        ? HttpResponse.json({ data: invitationLink })
        : error(404, "Collectivity subscription not found");
    }
  ),
  http.delete(
    `${strapiUrl}/api/collectivity/subscriptions/:subscriptionId/claim-link`,
    ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const subscriptionId = numericParam(params, "subscriptionId");
      if (subscriptionId === null) return error(404, "Collectivity subscription not found");

      return revokeMockCollectivitySubscriptionInvitationLink(user, subscriptionId)
        ? new HttpResponse(null, { status: 204 })
        : error(404, "Collectivity subscription not found");
    }
  ),
  http.post(
    `${strapiUrl}/api/collectivity/subscriptions/:subscriptionId/self-claims`,
    ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const subscriptionId = numericParam(params, "subscriptionId");
      if (subscriptionId === null) return error(404, "Collectivity subscription not found");

      const result = assignMockCollectivitySubscriptionPlaceToSelf(user, subscriptionId);
      if (result.kind === "success") return HttpResponse.json({ data: result.claim });
      if (result.kind === "not_found") return error(404, "Collectivity subscription not found");
      return mutationError(result);
    }
  ),
  http.post(
    `${strapiUrl}/api/collectivity/subscriptions/:subscriptionId/claims/direct`,
    async ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const subscriptionId = numericParam(params, "subscriptionId");
      const body = (await request.json().catch(() => null)) as { claimantUserId?: unknown } | null;
      const claimantUserId =
        typeof body?.claimantUserId === "number" && Number.isSafeInteger(body.claimantUserId)
          ? body.claimantUserId
          : null;
      if (subscriptionId === null || claimantUserId === null || claimantUserId < 1) {
        return error(400, "Invalid subscription or claimant user id");
      }

      const result = assignMockCollectivitySubscriptionPlaceDirectly(
        user,
        subscriptionId,
        claimantUserId
      );
      if (result.kind === "success") return HttpResponse.json({ data: result.claim });
      if (result.kind === "not_found") return error(404, "Collectivity subscription not found");
      return mutationError(result);
    }
  ),
  http.post(
    `${strapiUrl}/api/collectivity/subscriptions/:subscriptionId/claims/:claimId/approve`,
    ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const subscriptionId = numericParam(params, "subscriptionId");
      const claimId = numericParam(params, "claimId");
      if (subscriptionId === null || claimId === null) {
        return error(404, "Collectivity subscription claim not found");
      }

      const result = approveMockCollectivitySubscriptionClaim(user, subscriptionId, claimId);
      if (result.kind === "success") return HttpResponse.json({ data: result.claim });
      if (result.kind === "not_found")
        return error(404, "Collectivity subscription claim not found");
      return mutationError(result);
    }
  ),
  http.post(
    `${strapiUrl}/api/collectivity/subscriptions/:subscriptionId/claims/:claimId/deny`,
    ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const subscriptionId = numericParam(params, "subscriptionId");
      const claimId = numericParam(params, "claimId");
      if (subscriptionId === null || claimId === null) {
        return error(404, "Collectivity subscription claim not found");
      }

      const result = denyMockCollectivitySubscriptionClaim(user, subscriptionId, claimId);
      if (result.kind === "success") return HttpResponse.json({ data: result.claim });
      if (result.kind === "not_found")
        return error(404, "Collectivity subscription claim not found");
      return mutationError(result);
    }
  ),
  http.post(
    `${strapiUrl}/api/collectivity/subscriptions/:subscriptionId/claims/:claimId/revoke`,
    ({ request, params }) => {
      const user = authenticatedUser(request);
      if (!user) return error(401, "Authentication required");

      const subscriptionId = numericParam(params, "subscriptionId");
      const claimId = numericParam(params, "claimId");
      if (subscriptionId === null || claimId === null) {
        return error(404, "Collectivity subscription claim not found");
      }

      const result = revokeMockCollectivitySubscriptionClaim(user, subscriptionId, claimId);
      if (result.kind === "success") return HttpResponse.json({ data: result.claim });
      if (result.kind === "not_found")
        return error(404, "Collectivity subscription claim not found");
      return mutationError(result);
    }
  ),
  http.get(`${strapiUrl}/api/collectivity/projects`, ({ request }) => {
    const user = authenticatedUser(request);
    if (!user) return error(401, "Authentication required");

    const projects = getUserPlanIds(user)
      .map((planId) => getMockCollectivitySetupSnapshot(planId)?.project ?? null)
      .filter(Boolean);

    return HttpResponse.json({ data: projects });
  }),
  http.get(
    `${strapiUrl}/api/collectivity/projects/:projectSlug/current-inventory`,
    ({ request, params }) => {
      if (!authenticatedUser(request)) return error(401, "Authentication required");

      const snapshot = getMockCollectivitySetupSnapshot(projectSlug(params));
      return snapshot
        ? HttpResponse.json({ data: snapshot })
        : error(404, "Collectivity inventory draft not found");
    }
  ),
  http.post(`${strapiUrl}/api/collectivity/projects/init`, async ({ request }) => {
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
  http.put(
    `${strapiUrl}/api/collectivity/projects/:projectSlug/setup`,
    async ({ request, params }) => {
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
    }
  ),
  http.put(
    `${strapiUrl}/api/collectivity/projects/:projectSlug/current-inventory/input`,
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
  http.post(`${strapiUrl}/api/collectivity/projects/:projectSlug/current-inventory/calculate`, () =>
    error(501, "Collectivity inventory calculation endpoint not implemented")
  ),
  http.get(
    `${strapiUrl}/api/collectivity/projects/:projectSlug/current-inventory/result`,
    ({ request, params }) => {
      if (!authenticatedUser(request)) return error(401, "Authentication required");

      const result = getMockCollectivityInventoryResult(projectSlug(params));
      return result ? HttpResponse.json(result) : error(404, "Calculation result not found");
    }
  ),
  http.post(
    `${strapiUrl}/api/collectivity/projects/:projectSlug/current-inventory/debug-calculate`,
    async ({ request }) => {
      if (!authenticatedUser(request)) return error(401, "Authentication required");

      const { datasetKey } = (await request.json()) as { datasetKey: string };
      const datasetSeed = Array.from(datasetKey).reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const parameterCount = (datasetSeed % 3) + 1;

      return HttpResponse.json({
        data: {
          datasetKey,
          resultRows: {
            "y-2021": [
              {
                key: "municipalPublicLighting",
                value: 500 + datasetSeed,
                unit: "tCO2e",
                owner: "municipal",
                family: "energy",
                sector: "tertiary",
                scope: "scope2",
                energy: "electricity",
                direction: "emission",
              },
            ],
          },
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
  http.get(
    `${strapiUrl}/api/collectivity/supported-values/:familyKey/:selectorKey`,
    ({ params }) => {
      const familyKey = String(params.familyKey);
      const selectorKey = String(params.selectorKey);
      const values = getMockCollectivitySupportedValues(familyKey, selectorKey);

      return values
        ? HttpResponse.json({ data: { familyKey, selectorKey, values } })
        : error(404, "Collectivity supported values not found");
    }
  ),
];
