export type CollectivitySubscriptionClaim = {
  id: number;
  claimantEmail: string;
  claimantUserId: number | null;
  claimantFullName: string | null;
  projectId?: number | null;
  source: "invite_link" | "self_assignment" | "direct_assignment";
  status: "pending" | "approved" | "denied" | "consumed" | "revoked";
  approvedAt: string | null;
  deniedAt: string | null;
  consumedAt: string | null;
  revokedAt: string | null;
  createdAt: string;
};

export type CollectivitySubscriptionInvitationLink = {
  token: string;
  expiresAt: string;
};

export type CollectivitySubscriptionDetail = {
  id: number;
  quoteId: number | null;
  productKey: "collectivity";
  status: string;
  startsAt: string | null;
  endsAt: string | null;
  paymentConfirmedAt: string | null;
  activatedAt: string | null;
  communeQuantity: number;
  credits: {
    purchased: number;
    reserved: number;
    used: number;
    available: number;
  };
  assignments: CollectivitySubscriptionClaim[];
  projects: Array<{
    id: number;
    name: string;
    slug: string;
    ownerUserId: number | null;
  }>;
};
