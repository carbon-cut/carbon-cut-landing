import type {
  CollectivitySubscriptionClaim,
  CollectivitySubscriptionDetail,
  CollectivitySubscriptionInvitationLink,
} from "./claims";

export const subscriptionDetailQueryKey = (subscriptionId: number) =>
  ["collectivity", "subscription", subscriptionId, "detail"] as const;

export const subscriptionDetailQueryOptions = {
  staleTime: 15 * 1000,
  refetchInterval: 30 * 1000,
  refetchOnWindowFocus: true,
  retry: 1,
};

export const subscriptionClaimsQueryKey = (subscriptionId: number) =>
  ["collectivity", "subscription", subscriptionId, "claims"] as const;

export const subscriptionClaimsQueryOptions = {
  staleTime: 15 * 1000,
  refetchInterval: 30 * 1000,
  refetchOnWindowFocus: true,
  retry: 1,
};

export class SubscriptionApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly code?: string
  ) {
    super(message);
    this.name = "SubscriptionApiError";
  }
}

async function readSubscriptionResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T & {
    error?: { message?: string; details?: { code?: string } };
  };

  if (!response.ok) {
    throw new SubscriptionApiError(
      response.status,
      payload.error?.message ?? "Subscription request failed",
      payload.error?.details?.code
    );
  }

  return payload;
}

export async function fetchSubscriptionDetail(subscriptionId: number) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}`,
    { credentials: "same-origin" }
  );
  const payload = await readSubscriptionResponse<{ data: CollectivitySubscriptionDetail }>(
    response
  );
  return payload.data;
}

export async function fetchSubscriptionClaims(subscriptionId: number) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims`,
    { credentials: "same-origin" }
  );
  const payload = await readSubscriptionResponse<{ data: CollectivitySubscriptionClaim[] }>(
    response
  );
  return payload.data;
}

export async function assignSubscriptionPlaceToSelf(subscriptionId: number) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/self-claims`,
    { method: "POST", credentials: "same-origin" }
  );
  const payload = await readSubscriptionResponse<{ data: CollectivitySubscriptionClaim }>(response);
  return payload.data;
}

export async function assignSubscriptionPlaceDirectly(
  subscriptionId: number,
  claimantUserId: number
) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims/direct`,
    {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ claimantUserId }),
    }
  );
  const payload = await readSubscriptionResponse<{ data: CollectivitySubscriptionClaim }>(response);
  return payload.data;
}

export async function createSubscriptionInvitationLink(subscriptionId: number) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claim-link`,
    { method: "POST", credentials: "same-origin" }
  );
  const payload = await readSubscriptionResponse<{ data: CollectivitySubscriptionInvitationLink }>(
    response
  );
  return payload.data;
}

export async function revokeSubscriptionInvitationLink(subscriptionId: number) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claim-link`,
    { method: "DELETE", credentials: "same-origin" }
  );

  if (!response.ok) {
    await readSubscriptionResponse<never>(response);
  }
}

export async function revokeSubscriptionAssignment(subscriptionId: number, claimId: number) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims/${encodeURIComponent(claimId)}/revoke`,
    { method: "POST", credentials: "same-origin" }
  );
  const payload = await readSubscriptionResponse<{ data: CollectivitySubscriptionClaim }>(response);
  return payload.data;
}

export async function approveSubscriptionRequest(subscriptionId: number, claimId: number) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims/${encodeURIComponent(claimId)}/approve`,
    { method: "POST", credentials: "same-origin" }
  );
  const payload = await readSubscriptionResponse<{ data: CollectivitySubscriptionClaim }>(response);
  return payload.data;
}

export async function denySubscriptionRequest(subscriptionId: number, claimId: number) {
  const response = await fetch(
    `/api/collectivity/subscriptions/${encodeURIComponent(subscriptionId)}/claims/${encodeURIComponent(claimId)}/deny`,
    { method: "POST", credentials: "same-origin" }
  );
  const payload = await readSubscriptionResponse<{ data: CollectivitySubscriptionClaim }>(response);
  return payload.data;
}
