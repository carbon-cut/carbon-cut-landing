import "server-only";

import { getUserPlanIds } from "@/lib/auth/profile";
import { fetchWithAuth, UnauthenticatedRequestError } from "@/lib/auth/fetchWithAuth";
import type { AuthUser } from "@/lib/auth/types";
import type {
  CollectivityProjectSnapshot,
  CollectivitySetupData,
  CollectivitySetupSnapshot,
} from "@/app/collectivity/setup/_lib/types";
import { isMockBackendEnabled } from "@/mocks/config";
import {
  getMockCollectivitySetupSnapshot,
  isMockCollectivityPlanIdUnique,
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

  return JSON.parse(text) as T;
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
    throw new CollectivityBackendError(501, {
      error: {
        status: 501,
        message: "Collectivity setup update endpoint not implemented",
      },
    });
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
