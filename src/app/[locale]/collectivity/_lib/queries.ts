import type { CollectivitySetupSnapshot } from "@/app/[locale]/collectivity/projects/setup/_lib/types";
import type { operations } from "@/generated/backend-api";
import type { CollectivitySetupValues } from "@/app/[locale]/collectivity/projects/setup/_lib/schema";
import type { AvailableCollectivityClaim } from "@/app/[locale]/collectivity/invitation/_lib/types";
import type {
  CreateCollectivityQuoteRequest,
  PublicCollectivityQuote,
  QuoteContext,
  SubscriptionCatalogue,
  SubscriptionPricePreview,
  SubscriptionPricePreviewRequest,
} from "@/app/[locale]/collectivity/pricing/_lib/pricing";
import type {
  CollectivityResultRow,
  CollectivityResultsByYear,
  CollectivityResultYearKey,
} from "@/lib/collectivity/result-types";

export type {
  CollectivityResultRow,
  CollectivityResultsByYear,
  CollectivityResultYearKey,
} from "@/lib/collectivity/result-types";

export const collectivityQueryOptions = {
  staleTime: 0,
  gcTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: 1,
};

export const subscriptionCatalogueQueryOptions = {
  ...collectivityQueryOptions,
  staleTime: 5 * 60 * 1000,
};

export const latestQuoteQueryOptions = {
  ...collectivityQueryOptions,
  staleTime: 30 * 1000,
};

export const collectivityQueryKeys = {
  subscriptionCatalogue: () => ["collectivity", "subscriptionCatalogue"] as const,
  quoteContext: () => ["collectivity", "quoteContext"] as const,
  latestQuote: () => ["collectivity", "latestQuote"] as const,
  currentInventory: (projectSlug: string) =>
    ["collectivity", "currentInventory", projectSlug] as const,
  result: (projectSlug: string) => ["collectivity", "result", projectSlug] as const,
  supportedValues: (familyKey: string, selectorKey: string) =>
    ["collectivity", "supportedValues", familyKey, selectorKey] as const,
  availableClaims: () => ["collectivity", "availableClaims"] as const,
};

type ApiErrorPayload = {
  error?: {
    status?: number;
    message?: string;
    details?: {
      fieldErrors?: Partial<Record<string, string>>;
      reasons?: Array<{
        code?: string;
        paths?: string[];
        path?: string;
        parameterKey?: string;
      }>;
    };
  };
};

type DebugCalculationWarning = {
  code?: string;
  itemId?: string;
  path?: string;
  message?: string;
  details?: Record<string, unknown>;
};

export type CollectivityCalculationWarning = {
  code:
    | "negativeEstimatedActivityClamped"
    | "missingLtoCorrectionFactorDefaulted"
    | "treeAbsorptionFactorFallbackUsed"
    | "greenWasteAbsorptionFallbackUsed";
  itemId?: string;
  path?: string;
  message: string;
  details?: Record<string, unknown>;
};

export type CollectivityInventoryCalculationResult = {
  id: string;
  calculationRunId: string;
  resultRows: Record<CollectivityResultYearKey, CollectivityResultRow[]>;
  context: {
    population: Partial<Record<CollectivityResultYearKey, { value: number; unit: "capita" }>>;
  };
  warnings: CollectivityCalculationWarning[];
  createdAt: string;
};

export type CollectivitySupportedValue = {
  value: string;
  label: string;
  selector: Record<string, string>;
};

export class CollectivityApiError extends Error {
  payload: ApiErrorPayload;

  constructor(payload: ApiErrorPayload) {
    super(payload.error?.message ?? "Collectivity request failed");
    this.name = "CollectivityApiError";
    this.payload = payload;
  }
}

export async function fetchCollectivitySubscriptionCatalogue() {
  const response = await fetch("/api/collectivity/subscription-catalogue", {
    credentials: "same-origin",
  });
  const payload = await readApiJson<{ data?: SubscriptionCatalogue }>(response);

  if (!payload.data) {
    throw new Error("Subscription catalogue not found");
  }

  return payload.data;
}

export async function fetchCollectivityQuoteContext() {
  const response = await fetch("/api/collectivity/quote-context", {
    credentials: "same-origin",
  });
  const payload = await readApiJson<{ data?: QuoteContext }>(response);

  if (!payload.data) {
    throw new Error("Quote context not found");
  }

  return payload.data;
}

export async function fetchCollectivitySubscriptionPricePreview(
  request: SubscriptionPricePreviewRequest
) {
  const response = await fetch("/api/collectivity/subscription-prices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(request),
  });
  const payload = await readApiJson<{ data?: SubscriptionPricePreview }>(response);

  if (!payload.data) {
    throw new Error("Subscription price preview not found");
  }

  return payload.data;
}

export async function createCollectivityQuote(
  request: CreateCollectivityQuoteRequest
): Promise<PublicCollectivityQuote> {
  const response = await fetch("/api/collectivity/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(request),
  });
  const payload = await readApiJson<{ data: PublicCollectivityQuote }>(response);
  return payload.data;
}

export async function fetchLatestCollectivityQuote() {
  const response = await fetch("/api/collectivity/quotes/latest", {
    credentials: "same-origin",
  });
  const payload = await readApiJson<{ data?: PublicCollectivityQuote }>(response);

  if (!payload.data) {
    throw new Error("Latest collectivity quote not found");
  }

  return payload.data;
}

export async function cancelCollectivityQuote(quoteId: number): Promise<PublicCollectivityQuote> {
  const response = await fetch(`/api/collectivity/quotes/${encodeURIComponent(quoteId)}/cancel`, {
    method: "POST",
    credentials: "same-origin",
  });
  const payload = await readApiJson<{ data: PublicCollectivityQuote }>(response);
  return payload.data;
}

async function readApiJson<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T & ApiErrorPayload;

  if (!response.ok) {
    throw new CollectivityApiError(payload);
  }

  return payload;
}

export async function fetchCollectivityInventoryResult(projectSlug: string) {
  const response = await fetch(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/result`,
    {
      credentials: "same-origin",
    }
  );

  const payload = await readApiJson<{ data?: CollectivityInventoryCalculationResult }>(response);

  if (!payload.data) {
    throw new Error("Collectivity inventory result not found");
  }

  return payload.data;
}

export async function fetchCollectivitySetupSnapshot(projectSlug: string) {
  const response = await fetch(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory`,
    {
      credentials: "same-origin",
    }
  );
  const payload = await readApiJson<{ data?: CollectivitySetupSnapshot }>(response);

  if (!payload.data) {
    throw new Error("Collectivity setup not found");
  }

  return payload.data;
}

export async function fetchCollectivityCurrentInventory(projectSlug: string) {
  return fetchCollectivitySetupSnapshot(projectSlug);
}

export async function fetchAvailableCollectivityClaims() {
  const response = await fetch("/api/collectivity/subscription-claims/available", {
    credentials: "same-origin",
  });
  const payload = await readApiJson<{ data?: AvailableCollectivityClaim[] }>(response);

  if (!payload.data) {
    throw new Error("Available collectivity claims not found");
  }

  return payload.data;
}

export async function saveCollectivitySetupRequest({
  currentPlanId,
  approvedClaimId,
  values,
}: {
  currentPlanId?: string | null;
  approvedClaimId?: number | null;
  values: CollectivitySetupValues;
}) {
  const response = await fetch(
    currentPlanId
      ? `/api/collectivity/projects/${encodeURIComponent(currentPlanId)}/setup`
      : "/api/collectivity/setup",
    {
      method: currentPlanId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(currentPlanId ? values : { ...values, approvedClaimId }),
    }
  );
  const payload = await readApiJson<{ data?: CollectivitySetupSnapshot }>(response);

  if (!payload.data) {
    throw new Error("Collectivity setup save returned no data");
  }

  return payload.data;
}

export async function saveCollectivityInventoryDraftRequest({
  projectSlug,
  inventoryInput,
}: {
  projectSlug: string;
  inventoryInput: Record<string, unknown>;
}) {
  const response = await fetch(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/input`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        inventoryInput,
      }),
    }
  );
  const payload =
    await readApiJson<
      operations["saveCollectivityInventoryInput"]["responses"][200]["content"]["application/json"]
    >(response);

  if (!payload.data) {
    throw new Error("Collectivity inventory draft save returned no data");
  }

  return payload.data;
}

export async function calculateCollectivityInventoryRequest({
  projectSlug,
  inventoryInput,
}: {
  projectSlug: string;
  inventoryInput: Record<string, unknown>;
}) {
  const response = await fetch(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/calculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        inventoryInput,
      }),
    }
  );

  return readApiJson<Record<string, unknown>>(response);
}

export async function debugCalculateCollectivityDatasetRequest({
  projectSlug,
  datasetKey,
  inventoryInput,
}: {
  projectSlug: string;
  datasetKey: string;
  inventoryInput: Record<string, unknown>;
}) {
  const response = await fetch(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/debug-calculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        datasetKey,
        inventoryInput,
      }),
    }
  );
  const payload = await readApiJson<{
    data?: {
      datasetKey: string;
      resultRows: CollectivityResultsByYear;
      parameterSnapshot?: {
        items?: unknown[];
      };
      warnings?: DebugCalculationWarning[];
      formulaVersion: string;
    };
  }>(response);

  if (!payload.data) {
    throw new Error("Collectivity debug calculation returned no data");
  }

  return payload.data;
}

export async function fetchCollectivitySupportedValues(familyKey: string, selectorKey: string) {
  const response = await fetch(
    `/api/collectivity/supported-values/${encodeURIComponent(familyKey)}/${encodeURIComponent(selectorKey)}`,
    {
      credentials: "same-origin",
    }
  );
  const payload = await readApiJson<{
    data?: {
      familyKey: string;
      selectorKey: string;
      values: CollectivitySupportedValue[];
    };
  }>(response);

  if (!payload.data) {
    throw new Error("Collectivity supported values not found");
  }

  return payload.data;
}
