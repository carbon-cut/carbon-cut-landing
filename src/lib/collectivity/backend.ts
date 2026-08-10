import "server-only";

import { getUserPlanIds } from "@/lib/auth/profile";
import { fetchWithAuth, UnauthenticatedRequestError } from "@/lib/auth/fetchWithAuth";
import type { AuthUser } from "@/lib/auth/types";
import type {
  CollectivityProjectSnapshot,
  CollectivitySetupData,
  CollectivitySetupSnapshot,
} from "@/app/[locale]/collectivity/setup/_lib/types";
import { isMockBackendEnabled } from "@/mocks/config";
import {
  getMockCollectivitySupportedValues,
  getMockCollectivitySetupSnapshot,
  isMockCollectivityPlanIdUnique,
  saveMockCollectivityInventoryInput,
  saveMockCollectivitySetup,
} from "@/mocks/collectivity";

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
    emissionsPayload: Record<string, unknown>;
    parameterSnapshot: {
      items: Array<Record<string, unknown>>;
    };
    formulaVersion: string;
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
  user: Pick<AuthUser, "planId">
): Promise<CollectivityProjectSnapshot[]> {
  if (isMockBackendEnabled()) {
    return getUserPlanIds(user)
      .map((planId) => getMockCollectivitySetupSnapshot(planId)?.project ?? null)
      .filter((project): project is CollectivityProjectSnapshot => Boolean(project));
  }

  const response = await requestCollectivity<ListProjectsResponse>("/api/collectivity/projects");
  return response.data;
}

export async function getCollectivitySetupSnapshot(
  projectSlug: string
): Promise<CollectivitySetupSnapshot | null> {
  if (isMockBackendEnabled()) {
    return getMockCollectivitySetupSnapshot(projectSlug);
  }

  const response = await requestCollectivity<CurrentInventoryResponse>(
    `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory`
  );
  return response.data;
}

export async function saveCollectivitySetup(
  user: Pick<AuthUser, "id" | "email">,
  setup: CollectivitySetupData,
  currentPlanId?: string | null
): Promise<CollectivitySetupSnapshot> {
  if (isMockBackendEnabled()) {
    if (!isMockCollectivityPlanIdUnique(user, setup.slug, currentPlanId)) {
      throw new CollectivityBackendError(409, {
        error: {
          status: 409,
          message: "collectivityProjectSlugNotUnique",
          details: {
            fieldErrors: {
              slug: "collectivityProjectSlugNotUnique",
            },
          },
        },
      });
    }

    return saveMockCollectivitySetup(user, setup, currentPlanId);
  }

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
  user: Pick<AuthUser, "email">,
  projectSlug: string,
  inventoryInput: Record<string, unknown>
): Promise<CollectivitySetupSnapshot> {
  if (isMockBackendEnabled()) {
    const saved = saveMockCollectivityInventoryInput(user, projectSlug, inventoryInput);

    if (!saved) {
      throw new CollectivityBackendError(404, {
        error: {
          status: 404,
          message: "Collectivity inventory draft not found",
        },
      });
    }

    return saved;
  }

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
  if (isMockBackendEnabled()) {
    throw new CollectivityBackendError(501, {
      error: {
        status: 501,
        message: "Collectivity inventory calculation endpoint not implemented",
      },
    });
  }

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
  if (isMockBackendEnabled()) {
    throw new CollectivityBackendError(501, {
      error: {
        status: 501,
        message: "Collectivity inventory result endpoint not implemented",
      },
    });
  }

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
  if (isMockBackendEnabled()) {
    const datasetSeed = Array.from(datasetKey).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const parameterCount = (datasetSeed % 3) + 1;

    return {
      datasetKey,
      emissionsPayload: {
        total: {
          value: 500 + datasetSeed,
          unit: "kgCO2e",
        },
      },
      parameterSnapshot: {
        items: Array.from({ length: parameterCount }, (_, index) => ({
          key: `mock-${datasetKey}-factor-${index + 1}`,
          selector: {
            datasetKey,
          },
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
    };
  }

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
  if (isMockBackendEnabled()) {
    const values = getMockCollectivitySupportedValues(familyKey, selectorKey);

    if (!values) {
      throw new CollectivityBackendError(404, {
        error: {
          status: 404,
          message: "Collectivity supported values not found",
        },
      });
    }

    return {
      familyKey,
      selectorKey,
      values,
    };
  }

  const response = await requestCollectivity<SupportedValuesResponse>(
    `/api/collectivity/supported-values/${encodeURIComponent(familyKey)}/${encodeURIComponent(selectorKey)}`
  );

  return response.data;
}
