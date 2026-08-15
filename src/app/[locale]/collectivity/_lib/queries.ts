import type { CollectivitySetupSnapshot } from "@/app/[locale]/collectivity/setup/_lib/types";
import type { CollectivitySetupValues } from "@/app/[locale]/collectivity/setup/_lib/schema";
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

export const collectivityQueryKeys = {
  currentInventory: (projectSlug: string) =>
    ["collectivity", "currentInventory", projectSlug] as const,
  result: (projectSlug: string) => ["collectivity", "result", projectSlug] as const,
  supportedValues: (familyKey: string, selectorKey: string) =>
    ["collectivity", "supportedValues", familyKey, selectorKey] as const,
};

type ApiErrorPayload = {
  error?: {
    status?: number;
    message?: string;
    details?: {
      fieldErrors?: Partial<Record<string, string>>;
      reasons?: Array<{
        code?: string;
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

export async function saveCollectivitySetupRequest({
  currentPlanId,
  values,
}: {
  currentPlanId?: string | null;
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
      body: JSON.stringify(values),
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
  const payload = await readApiJson<{ data?: CollectivitySetupSnapshot }>(response);

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
