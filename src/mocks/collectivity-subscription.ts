import type { AuthUser } from "@/lib/auth/types";
import type { PublicCollectivityQuote } from "@/app/[locale]/collectivity/pricing/_lib/pricing";
import type {
  CollectivitySubscriptionClaim,
  CollectivitySubscriptionDetail,
  CollectivitySubscriptionInvitationLink,
} from "@/app/[locale]/collectivity/subscription/_lib/claims";
import { COLLECTIVITY_MOCK_USERS } from "@/mocks/collectivity";

export const MOCK_SUBSCRIPTION_ID = 9001;
export const MOCK_SUBSCRIPTION_QUOTE_ID = 8001;

const owner = COLLECTIVITY_MOCK_USERS.subscriptionDemo;
const subscriptionStartsAt = "2026-10-01T00:00:00.000Z";
const subscriptionEndsAt = "2027-09-30T23:59:59.999Z";

type MockSubscriptionState = {
  assignments: CollectivitySubscriptionClaim[];
  invitationLink: CollectivitySubscriptionInvitationLink | null;
  nextClaimId: number;
  invitationRotation: number;
};

function initialAssignments(): CollectivitySubscriptionClaim[] {
  return [
    {
      id: 501,
      claimantEmail: "sofia.almeida@example.com",
      claimantUserId: 201,
      claimantFullName: "Sofia Almeida",
      projectId: null,
      source: "invite_link",
      status: "approved",
      approvedAt: "2026-10-01T09:00:00.000Z",
      deniedAt: null,
      consumedAt: null,
      revokedAt: null,
      createdAt: "2026-09-14T09:00:00.000Z",
    },
    {
      id: 502,
      claimantEmail: "erik.johansson@example.com",
      claimantUserId: 202,
      claimantFullName: "Erik Johansson",
      projectId: null,
      source: "invite_link",
      status: "approved",
      approvedAt: "2026-10-01T10:00:00.000Z",
      deniedAt: null,
      consumedAt: null,
      revokedAt: null,
      createdAt: "2026-09-16T10:00:00.000Z",
    },
    {
      id: 503,
      claimantEmail: "camille.bernard@example.com",
      claimantUserId: 203,
      claimantFullName: "Camille Bernard",
      projectId: null,
      source: "invite_link",
      status: "denied",
      approvedAt: null,
      deniedAt: "2026-10-01T11:00:00.000Z",
      consumedAt: null,
      revokedAt: null,
      createdAt: "2026-09-18T11:00:00.000Z",
    },
    {
      id: 504,
      claimantEmail: "marco.rossi@example.com",
      claimantUserId: 204,
      claimantFullName: "Marco Rossi",
      projectId: null,
      source: "invite_link",
      status: "denied",
      approvedAt: null,
      deniedAt: "2026-09-30T12:00:00.000Z",
      consumedAt: null,
      revokedAt: null,
      createdAt: "2026-09-19T12:00:00.000Z",
    },
    {
      id: 505,
      claimantEmail: "nora.kim@example.com",
      claimantUserId: 205,
      claimantFullName: "Nora Kim",
      projectId: null,
      source: "invite_link",
      status: "pending",
      approvedAt: null,
      deniedAt: null,
      consumedAt: null,
      revokedAt: null,
      createdAt: "2026-10-01T13:00:00.000Z",
    },
    {
      id: 506,
      claimantEmail: "amina.diallo@example.com",
      claimantUserId: 206,
      claimantFullName: "Amina Diallo",
      projectId: null,
      source: "invite_link",
      status: "pending",
      approvedAt: null,
      deniedAt: null,
      consumedAt: null,
      revokedAt: null,
      createdAt: "2026-10-01T14:00:00.000Z",
    },
    {
      id: 507,
      claimantEmail: "thomas.meyer@example.com",
      claimantUserId: 207,
      claimantFullName: "Thomas Meyer",
      projectId: null,
      source: "invite_link",
      status: "pending",
      approvedAt: null,
      deniedAt: null,
      consumedAt: null,
      revokedAt: null,
      createdAt: "2026-10-02T08:00:00.000Z",
    },
  ];
}

function createInitialState(): MockSubscriptionState {
  return {
    assignments: initialAssignments(),
    invitationLink: null,
    nextClaimId: 508,
    invitationRotation: 0,
  };
}

let state = createInitialState();

export function resetMockCollectivitySubscription() {
  state = createInitialState();
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isOwner(user: Pick<AuthUser, "id"> | null, subscriptionId: number) {
  return user?.id === owner.id && subscriptionId === MOCK_SUBSCRIPTION_ID;
}

export function ownsMockCollectivitySubscription(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number
) {
  return isOwner(user, subscriptionId);
}

function credits() {
  const reserved = state.assignments.filter((claim) => claim.status === "approved").length;
  const used = state.assignments.filter((claim) => claim.status === "consumed").length;

  return {
    purchased: 5,
    reserved,
    used,
    available: 5 - reserved - used,
  };
}

export function getMockLatestCollectivityQuote(user: Pick<AuthUser, "id"> | null) {
  return user?.id === owner.id ? clone(mockQuote) : null;
}

export function getMockCollectivitySubscriptionDetail(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number
): CollectivitySubscriptionDetail | null {
  if (!isOwner(user, subscriptionId)) return null;

  return {
    id: MOCK_SUBSCRIPTION_ID,
    quoteId: MOCK_SUBSCRIPTION_QUOTE_ID,
    productKey: "collectivity",
    status: "active",
    startsAt: subscriptionStartsAt,
    endsAt: subscriptionEndsAt,
    paymentConfirmedAt: "2026-09-28T10:00:00.000Z",
    activatedAt: subscriptionStartsAt,
    communeQuantity: 5,
    credits: credits(),
    assignments: clone(state.assignments),
    projects: [],
  };
}

export function getMockCollectivitySubscriptionClaims(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number
) {
  return isOwner(user, subscriptionId) ? clone(state.assignments) : null;
}

function canReserveCredit() {
  return credits().available > 0;
}

function findClaim(claimId: number) {
  return state.assignments.find((claim) => claim.id === claimId) ?? null;
}

export function approveMockCollectivitySubscriptionClaim(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number,
  claimId: number
) {
  if (!isOwner(user, subscriptionId)) return { kind: "not_found" as const };

  const claim = findClaim(claimId);
  if (!claim) return { kind: "not_found" as const };
  if (claim.status !== "pending") return { kind: "invalid" as const };
  if (!canReserveCredit()) return { kind: "capacity_full" as const };

  claim.status = "approved";
  claim.approvedAt = new Date().toISOString();
  return { kind: "success" as const, claim: clone(claim) };
}

export function denyMockCollectivitySubscriptionClaim(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number,
  claimId: number
) {
  if (!isOwner(user, subscriptionId)) return { kind: "not_found" as const };

  const claim = findClaim(claimId);
  if (!claim) return { kind: "not_found" as const };
  if (claim.status !== "pending") return { kind: "invalid" as const };

  claim.status = "denied";
  claim.deniedAt = new Date().toISOString();
  return { kind: "success" as const, claim: clone(claim) };
}

export function revokeMockCollectivitySubscriptionClaim(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number,
  claimId: number
) {
  if (!isOwner(user, subscriptionId)) return { kind: "not_found" as const };

  const claim = findClaim(claimId);
  if (!claim) return { kind: "not_found" as const };
  if (claim.status === "revoked") return { kind: "success" as const, claim: clone(claim) };
  if (claim.status !== "approved" || claim.projectId != null) return { kind: "invalid" as const };

  claim.status = "revoked";
  claim.revokedAt = new Date().toISOString();
  return { kind: "success" as const, claim: clone(claim) };
}

export function assignMockCollectivitySubscriptionPlaceToSelf(
  user: AuthUser | null,
  subscriptionId: number
) {
  if (!user || !isOwner(user, subscriptionId)) return { kind: "not_found" as const };
  if (!canReserveCredit()) return { kind: "capacity_full" as const };

  const timestamp = new Date().toISOString();
  const claim: CollectivitySubscriptionClaim = {
    id: state.nextClaimId++,
    claimantEmail: user.email,
    claimantUserId: user.id,
    claimantFullName: user.username,
    projectId: null,
    source: "self_assignment",
    status: "approved",
    approvedAt: timestamp,
    deniedAt: null,
    consumedAt: null,
    revokedAt: null,
    createdAt: timestamp,
  };
  state.assignments.push(claim);
  return { kind: "success" as const, claim: clone(claim) };
}

export function assignMockCollectivitySubscriptionPlaceDirectly(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number,
  claimantUserId: number
) {
  if (!isOwner(user, subscriptionId)) return { kind: "not_found" as const };
  if (!canReserveCredit()) return { kind: "capacity_full" as const };

  const invitationClaims = state.assignments.filter(
    (claim) => claim.source === "invite_link" && claim.claimantUserId === claimantUserId
  );
  const invitationClaim = invitationClaims[0] ?? null;
  if (!invitationClaim) return { kind: "not_invited" as const };

  const pendingClaim = invitationClaims.find((claim) => claim.status === "pending");
  if (pendingClaim) {
    pendingClaim.status = "approved";
    pendingClaim.approvedAt = new Date().toISOString();
    return { kind: "success" as const, claim: clone(pendingClaim) };
  }

  const timestamp = new Date().toISOString();
  const claim: CollectivitySubscriptionClaim = {
    id: state.nextClaimId++,
    claimantEmail: invitationClaim.claimantEmail,
    claimantUserId,
    claimantFullName: invitationClaim.claimantFullName,
    projectId: null,
    source: "direct_assignment",
    status: "approved",
    approvedAt: timestamp,
    deniedAt: null,
    consumedAt: null,
    revokedAt: null,
    createdAt: timestamp,
  };
  state.assignments.push(claim);
  return { kind: "success" as const, claim: clone(claim) };
}

export function createMockCollectivitySubscriptionInvitationLink(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number
) {
  if (!isOwner(user, subscriptionId)) return null;

  state.invitationRotation += 1;
  state.invitationLink = {
    token: `mock-subscription-${MOCK_SUBSCRIPTION_ID}-${state.invitationRotation}`,
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  };
  return clone(state.invitationLink);
}

export function revokeMockCollectivitySubscriptionInvitationLink(
  user: Pick<AuthUser, "id"> | null,
  subscriptionId: number
) {
  if (!isOwner(user, subscriptionId)) return false;
  state.invitationLink = null;
  return true;
}

const mockQuote: PublicCollectivityQuote = {
  id: MOCK_SUBSCRIPTION_QUOTE_ID,
  productKey: "collectivity",
  reference: "DEVIS-COL-2026-8001",
  status: "paid",
  cancelled: false,
  cancelledAt: null,
  submittedAt: "2026-09-15T09:00:00.000Z",
  acceptedAt: "2026-09-20T09:00:00.000Z",
  paidAt: "2026-09-28T10:00:00.000Z",
  rejectedAt: null,
  requestedContractStartDate: "2026-10-01",
  subscriptionId: MOCK_SUBSCRIPTION_ID,
  startsAt: subscriptionStartsAt,
  endsAt: subscriptionEndsAt,
  buyerSnapshot: {
    customerType: "LEGAL_ENTITY",
    legalName: "Commune de Subtest",
    addressLine1: "5 rue des Lilas",
    addressLine2: "",
    postalCode: "45000",
    city: "Orléans",
    countryCode: "FRA",
    siren: "912345678",
    siret: "91234567800012",
    vatNumber: "FR45912345678",
    hasNoVatNumber: false,
    contact: {
      name: "Sub Test",
      email: owner.email,
      phone: "+33102030405",
    },
  },
  sellerSnapshot: {
    legalName: "Carbone Territoires SAS",
    registeredOffice: "24 rue des Carmes, 45000 Orléans, France",
    siren: "912 345 678",
    rcs: "RCS Orléans 912345678",
    vatNumber: "FR45912345678",
  },
  termsSnapshot: {
    quoteValidityEndsAt: "2026-10-15T09:00:00.000Z",
    paymentMethod: "BANK_TRANSFER",
    paymentTermsDays: 30,
  },
  pricingSnapshot: {
    catalogueVersion: "2026-09-adjusted-v1",
    discountPolicyVersion: "2026-09-adjusted-v1",
    selection: {
      communeQuantity: 5,
      termYears: 1,
      perimeter: "patrimoine_communal",
      moduleKeys: ["ghg_inventory_scope_1_2"],
    },
    lines: [
      {
        key: "ghg_inventory_scope_1_2",
        annualUnitAmountCents: 150000,
        annualAmountCents: 750000,
        conditions: [],
      },
    ],
    annualSubtotalCents: 750000,
    discountBasisPoints: 0,
    quotedAnnualAmountCents: 750000,
    quotedContractAmountCents: 750000,
    amounts: {
      currency: "EUR",
      annualSubtotalExcludingTaxCents: 750000,
      annualDiscountCents: 0,
      annualTotalExcludingTaxCents: 750000,
      contractTotalExcludingTaxCents: 750000,
      vatRateBasisPoints: 2000,
      vatAmountCents: 150000,
      totalIncludingTaxCents: 900000,
      taxTreatment: "france",
      legalTaxMention: "TVA française appliquée au taux en vigueur.",
    },
  },
  refusalReasonForCustomer: null,
};
