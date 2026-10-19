import type { CollectivityInvitationClaim, CollectivityInvitationPreview } from "./types";
import { fetchAuthenticated } from "@/lib/auth/browser-request";

export const invitationPreviewQueryKey = (token: string) =>
  ["collectivity", "invitation", "preview", token] as const;
export const invitationClaimQueryKey = (claimId: number) =>
  ["collectivity", "invitation", "claim", claimId] as const;

export class InvitationApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: { code?: string; claimId?: number; status?: string }
  ) {
    super(message);
    this.name = "InvitationApiError";
  }
}

async function readInvitationResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T & {
    error?: { message?: string; details?: { code?: string; claimId?: number; status?: string } };
  };
  if (!response.ok) {
    throw new InvitationApiError(
      response.status,
      payload.error?.message ?? "Invitation request failed",
      payload.error?.details
    );
  }
  return payload;
}

export async function fetchInvitationPreview(token: string) {
  const response = await fetchAuthenticated(
    `/api/collectivity/subscription-invitations/preview?${new URLSearchParams({ token })}`,
    { credentials: "same-origin" }
  );
  return (await readInvitationResponse<{ data: CollectivityInvitationPreview }>(response)).data;
}

export async function submitInvitationRequest(token: string) {
  const response = await fetchAuthenticated("/api/collectivity/subscription-claims", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ token }),
  });
  return (
    await readInvitationResponse<{
      data: Pick<CollectivityInvitationClaim, "id" | "status" | "createdAt">;
    }>(response)
  ).data;
}

export async function fetchInvitationClaim(claimId: number) {
  const response = await fetchAuthenticated(`/api/collectivity/subscription-claims/${claimId}`, {
    credentials: "same-origin",
  });
  return (await readInvitationResponse<{ data: CollectivityInvitationClaim }>(response)).data;
}

export async function retryInvitationRequest(claimId: number, token: string) {
  const response = await fetchAuthenticated(
    `/api/collectivity/subscription-claims/${claimId}/retry`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ token }),
    }
  );
  return (
    await readInvitationResponse<{
      data: Pick<CollectivityInvitationClaim, "id" | "status" | "createdAt">;
    }>(response)
  ).data;
}
