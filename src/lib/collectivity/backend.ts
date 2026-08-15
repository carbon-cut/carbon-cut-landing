import "server-only";

import { fetchWithAuth, UnauthenticatedRequestError } from "@/lib/auth/fetchWithAuth";
import type { AuthUser } from "@/lib/auth/types";
import type { CollectivityResultsByYear } from "@/lib/collectivity/result-types";
import type {
  CollectivityProjectSnapshot,
  CollectivitySetupData,
  CollectivitySetupSnapshot,
} from "@/app/[locale]/collectivity/setup/_lib/types";

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
