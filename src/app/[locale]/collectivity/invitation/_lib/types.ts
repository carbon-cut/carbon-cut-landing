export type InvitationPreviewState = "valid" | "invalid" | "expired" | "replaced" | "disabled";

export type InvitationInviter = {
  firstName: string;
  lastName: string;
  organization: string | null;
};

export type CollectivityInvitationPreview = {
  state: InvitationPreviewState;
  inviter: InvitationInviter | null;
  createdAt: string | null;
  expiresAt: string | null;
  stateChangedAt: string | null;
};

export type CollectivityInvitationClaim = {
  id: number;
  status: "pending" | "approved" | "denied" | "consumed" | "revoked";
  source: "invite_link" | "self_assignment" | "direct_assignment";
  createdAt: string;
  approvedAt: string | null;
  deniedAt: string | null;
  revokedAt: string | null;
  consumedAt: string | null;
  project: { id: number; slug: string; name: string } | null;
  subscriptionStatus: string;
  canCreateProject: boolean;
  inviter: InvitationInviter;
  invitation: CollectivityInvitationPreview;
};

export type AvailableCollectivityClaim = {
  id: number;
  source: CollectivityInvitationClaim["source"];
  approvedAt: string;
  subscription: {
    purchaserName: string | null;
    organization: string | null;
  };
};
