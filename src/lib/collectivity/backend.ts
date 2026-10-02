import "server-only";

import { fetchWithAuth, UnauthenticatedRequestError } from "@/lib/auth/fetchWithAuth";
import type { AuthUser } from "@/lib/auth/types";
import type { CollectivityResultsByYear } from "@/lib/collectivity/result-types";
import type {
  CreateCollectivityQuoteRequest,
  PublicCollectivityQuote,
  QuoteContext,
  SubscriptionCatalogue,
  SubscriptionPricePreview,
  SubscriptionPricePreviewRequest,
} from "@/app/[locale]/collectivity/pricing/_lib/pricing";
import type {
  CollectivityProjectSnapshot,
  CollectivitySetupData,
  CollectivitySetupSnapshot,
} from "@/app/[locale]/collectivity/setup/_lib/types";
import type {
  CollectivitySubscriptionClaim,
  CollectivitySubscriptionDetail,
  CollectivitySubscriptionInvitationLink,
} from "@/app/[locale]/collectivity/subscription/_lib/claims";

type CollectivityErrorBody = {
  error?: {
    status?: number;
    message?: string;
    details?: Record<string, unknown>;
  };
};

type ListProjectsResponse = {
  data: CollectivityProjectSnapshot[];
};

type CurrentInventoryResponse = {
  data: CollectivitySetupSnapshot;
};

type InitProjectResponse = {
  data: CollectivitySetupSnapshot;
};

type UpdateProjectSetupResponse = {
  data: CollectivitySetupSnapshot;
};

type SaveInventoryInputResponse = {
  data: CollectivitySetupSnapshot;
};

type CalculateInventoryResponse = Record<string, unknown>;

type CurrentInventoryResultResponse = Record<string, unknown>;

type DebugCalculationResponse = {
  data: {
    datasetKey: string;
    resultRows: CollectivityResultsByYear;
    parameterSnapshot: {
      items: Array<Record<string, unknown>>;
    };
    formulaVersion: string;
    warnings?: Array<Record<string, unknown>>;
  };
};

type SupportedValuesResponse = {
  data: {
    familyKey: string;
    selectorKey: string;
    values: Array<{
      value: string;
      label: string;
      selector: Record<string, string>;
    }>;
  };
};

export class CollectivityBackendError extends Error {
  status: number;
  body: CollectivityErrorBody;

  constructor(status: number, body: CollectivityErrorBody) {
    super(body.error?.message ?? "Collectivity backend request failed");
    this.name = "CollectivityBackendError";
    this.status = status;
    this.body = body;
  }
}

function getCollectivityBaseUrl() {
  const baseUrl = process.env.STRAPI_INTERNAL_URL ?? process.env.NEXT_PUBLIC_SERVER;

  if (!baseUrl) {
    throw new Error("Missing STRAPI_INTERNAL_URL or NEXT_PUBLIC_SERVER");
  }

  return baseUrl.replace(/\/$/, "");
}

async function parseJson<T>(response: Response) {
  const text = await response.text();

  if (!text) {
    return null as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new CollectivityBackendError(response.status || 502, {
      error: {
        status: response.status || 502,
        message: "Collectivity backend returned a non-JSON response",
        details: {
          body: text.slice(0, 500),
        },
      },
    });
  }
}

async function requestCollectivity<T>(path: string, init?: RequestInit) {
  let response: Response;

  try {
    response = await fetchWithAuth(`${getCollectivityBaseUrl()}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof UnauthenticatedRequestError) {
      throw new CollectivityBackendError(401, {
        error: {
          status: 401,
          message: "Authentication required",
        },
      });
    }

    throw new CollectivityBackendError(503, {
      error: {
        status: 503,
        message: "Collectivity backend unavailable",
      },
    });
  }

  const body = await parseJson<T | CollectivityErrorBody>(response);

  if (!response.ok) {
    throw new CollectivityBackendError(response.status, (body ?? {}) as CollectivityErrorBody);
  }

  return body as T;
}

async function requestPublicCollectivity<T>(path: string) {
  let response: Response;

  try {
    response = await fetch(`${getCollectivityBaseUrl()}${path}`, { cache: "no-store" });
  } catch {
    throw new CollectivityBackendError(503, {
      error: { status: 503, message: "Collectivity backend unavailable" },
    });
  }

  const body = await parseJson<T | CollectivityErrorBody>(response);

  if (!response.ok) {
    throw new CollectivityBackendError(response.status, (body ?? {}) as CollectivityErrorBody);
  }

  return body as T;
}

export async function getSubscriptionCatalogue(): Promise<SubscriptionCatalogue> {
  const response = await requestPublicCollectivity<{ data: SubscriptionCatalogue }>(
    "/api/collectivity/subscription-catalogue"
  );
  return response.data;
}

export async function getQuoteContext(): Promise<QuoteContext> {
  const response = await requestPublicCollectivity<{ data: QuoteContext }>(
    "/api/collectivity/quote-context"
  );
  return response.data;
}

export async function getSubscriptionPricePreview(
  request: SubscriptionPricePreviewRequest
): Promise<SubscriptionPricePreview> {
  const response = await requestCollectivity<{ data: SubscriptionPricePreview }>(
    "/api/collectivity/subscription-prices",
    {
      method: "POST",
      body: JSON.stringify(request),
    }
  );
  return response.data;
}

export async function createCollectivityQuote(
  request: CreateCollectivityQuoteRequest
): Promise<PublicCollectivityQuote> {
  const response = await requestCollectivity<{ data: PublicCollectivityQuote }>(
    "/api/collectivity/quotes",
    {
      method: "POST",
      body: JSON.stringify(request),
    }
  );
  return response.data;
}

export async function getLatestCollectivityQuote(): Promise<PublicCollectivityQuote> {
  const response = await requestCollectivity<{ data: PublicCollectivityQuote }>(
    "/api/collectivity/quotes/latest"
  );
  return response.data;
}

export async function getCollectivitySubscriptionDetail(
  subscriptionId: number
): Promise<CollectivitySubscriptionDetail> {
  const response = await requestCollectivity<{ data: CollectivitySubscriptionDetail }>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}`
  );
  return response.data;
}

export async function getCollectivitySubscriptionClaims(
  subscriptionId: number
): Promise<CollectivitySubscriptionClaim[]> {
  const response = await requestCollectivity<{ data: CollectivitySubscriptionClaim[] }>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims`
  );
  return response.data;
}

export async function assignCollectivitySubscriptionPlaceToSelf(
  subscriptionId: number
): Promise<CollectivitySubscriptionClaim> {
  const response = await requestCollectivity<{ data: CollectivitySubscriptionClaim }>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/self-claims`,
    { method: "POST" }
  );
  return response.data;
}

export async function assignCollectivitySubscriptionPlaceDirectly(
  subscriptionId: number,
  claimantUserId: number
): Promise<CollectivitySubscriptionClaim> {
  const response = await requestCollectivity<{ data: CollectivitySubscriptionClaim }>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims/direct`,
    {
      method: "POST",
      body: JSON.stringify({ claimantUserId }),
    }
  );
  return response.data;
}

export async function createCollectivitySubscriptionInvitationLink(
  subscriptionId: number
): Promise<CollectivitySubscriptionInvitationLink> {
  const response = await requestCollectivity<{ data: CollectivitySubscriptionInvitationLink }>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claim-link`,
    { method: "POST" }
  );
  return response.data;
}

export async function revokeCollectivitySubscriptionInvitationLink(subscriptionId: number) {
  await requestCollectivity<unknown>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claim-link`,
    { method: "DELETE" }
  );
}

export async function revokeCollectivitySubscriptionClaim(
  subscriptionId: number,
  claimId: number
): Promise<CollectivitySubscriptionClaim> {
  const response = await requestCollectivity<{ data: CollectivitySubscriptionClaim }>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims/${encodeURIComponent(claimId)}/revoke`,
    { method: "POST" }
  );
  return response.data;
}

export async function approveCollectivitySubscriptionClaim(
  subscriptionId: number,
  claimId: number
) {
  const response = await requestCollectivity<{ data: CollectivitySubscriptionClaim }>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims/${encodeURIComponent(claimId)}/approve`,
    { method: "POST" }
  );
  return response.data;
}

export async function denyCollectivitySubscriptionClaim(subscriptionId: number, claimId: number) {
  const response = await requestCollectivity<{ data: CollectivitySubscriptionClaim }>(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims/${encodeURIComponent(claimId)}/deny`,
    { method: "POST" }
  );
  return response.data;
}

export async function cancelCollectivityQuote(quoteId: number): Promise<PublicCollectivityQuote> {
  const response = await requestCollectivity<{ data: PublicCollectivityQuote }>(
    `/api/collectivity/quotes/${encodeURIComponent(quoteId)}/cancel`,
    { method: "POST" }
  );
  return response.data;
}

export async function listCollectivityProjects(
  _user: Pick<AuthUser, "planId">
): Promise<CollectivityProjectSnapshot[]> {
  const response = await requestCollectivity<ListProjectsResponse>("/api/collectivity/projects");
  return response.data;
}

export async function getCollectivitySetupSnapshot(
  projectSlug: string
): Promise<CollectivitySetupSnapshot | null> {
  const response = await requestCollectivity<CurrentInventoryResponse>(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory`
  );
  return response.data;
}

export async function saveCollectivitySetup(
  _user: Pick<AuthUser, "id" | "email">,
  setup: CollectivitySetupData,
  currentPlanId?: string | null
): Promise<CollectivitySetupSnapshot> {
  if (currentPlanId) {
    const response = await requestCollectivity<UpdateProjectSetupResponse>(
      `/api/collectivity/projects/${encodeURIComponent(currentPlanId)}/setup`,
      {
        method: "PUT",
        body: JSON.stringify(setup),
      }
    );

    return response.data;
  }

  const response = await requestCollectivity<InitProjectResponse>(
    "/api/collectivity/projects/init",
    {
      method: "POST",
      body: JSON.stringify(setup),
    }
  );

  return response.data;
}

export async function saveCollectivityInventoryInput(
  _user: Pick<AuthUser, "email">,
  projectSlug: string,
  inventoryInput: Record<string, unknown>
): Promise<CollectivitySetupSnapshot> {
  const response = await requestCollectivity<SaveInventoryInputResponse>(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/input`,
    {
      method: "PUT",
      body: JSON.stringify({
        inventoryInput,
      }),
    }
  );

  return response.data;
}

export async function calculateCollectivityInventory(
  projectSlug: string,
  inventoryInput: Record<string, unknown>
): Promise<CalculateInventoryResponse> {
  const path = `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/calculate`;
  console.log("collectivityCalculateForward", `${getCollectivityBaseUrl()}${path}`);

  return requestCollectivity<CalculateInventoryResponse>(path, {
    method: "POST",
    body: JSON.stringify({
      inventoryInput,
    }),
  });
}

export async function getCollectivityInventoryResult(
  projectSlug: string
): Promise<CurrentInventoryResultResponse> {
  const path = `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/result`;
  console.log("collectivityResultForward", `${getCollectivityBaseUrl()}${path}`);

  return requestCollectivity<CurrentInventoryResultResponse>(path);
}

export async function debugCalculateCollectivityDataset({
  projectSlug,
  datasetKey,
  inventoryInput,
}: {
  projectSlug: string;
  datasetKey: string;
  inventoryInput: Record<string, unknown>;
}) {
  const response = await requestCollectivity<DebugCalculationResponse>(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/debug-calculate`,
    {
      method: "POST",
      body: JSON.stringify({
        datasetKey,
        inventoryInput,
      }),
    }
  );

  return response.data;
}

export async function listCollectivitySupportedValues(familyKey: string, selectorKey: string) {
  const response = await requestCollectivity<SupportedValuesResponse>(
    `/api/collectivity/supported-values/${encodeURIComponent(familyKey)}/${encodeURIComponent(selectorKey)}`
  );

  return response.data;
}
