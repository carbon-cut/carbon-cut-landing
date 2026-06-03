import type { AuthUser } from "@/lib/auth/types";
import type { CollectivityCadrageData } from "@/app/collectivity/_cadrage/types";

export const COLLECTIVITY_MOCK_PASSWORD = "123";
export const COLLECTIVITY_MOCK_COUNTRY_OPTIONS = [
  { value: "tunisia", label: "Tunisie" },
  { value: "senegal", label: "Sénégal" },
  { value: "france", label: "France" },
] as const;
export const COLLECTIVITY_MOCK_TERRITORY_OPTIONS = {
  tunisia: [
    { value: "Grand Sfax", label: "Grand Sfax", planId: "grand-sfax" },
    { value: "Sfax", label: "Sfax", planId: "sfax" },
    { value: "Tunis", label: "Tunis", planId: "tunis" },
  ],
  senegal: [
    { value: "Dakar", label: "Dakar", planId: "dakar" },
    { value: "Thiès", label: "Thiès", planId: "thies" },
  ],
  france: [
    { value: "Lyon", label: "Lyon", planId: "lyon" },
    { value: "Marseille", label: "Marseille", planId: "marseille" },
  ],
} as const;

export const COLLECTIVITY_MOCK_USERS = {
  developedInventory: {
    id: 4,
    username: "collectivity-ready-user",
    email: "collectivity.ready@example.com",
    planId: ["grand-sfax"],
    cadrage: {
      country: "tunisia",
      planId: "grand-sfax",
      territoryName: "Grand Sfax",
      referenceYear: "2022",
      supportYears: ["2021"],
    },
    inventory: {
      municipalElectricityConsumptionKwh: 42000,
    },
  },
  noInventory: {
    id: 5,
    username: "collectivity-no-inventory-user",
    email: "collectivity.no-inventory@example.com",
    planId: undefined,
    cadrage: null,
    inventory: null,
  },
  newlyCreated: {
    id: 6,
    username: "collectivity-new-user",
    email: "collectivity.new@example.com",
    planId: undefined,
    cadrage: null,
    inventory: null,
  },
};

export type MockCollectivityUserState = {
  userId: number;
  email: string;
  planId: string[] | undefined;
  cadrage: CollectivityCadrageData | null;
  hasInventory: boolean;
  inventory: { municipalElectricityConsumptionKwh: number } | null;
};

function cloneCadrage(cadrage: CollectivityCadrageData | null): CollectivityCadrageData | null {
  if (!cadrage) {
    return null;
  }

  return {
    ...cadrage,
    supportYears: [...cadrage.supportYears],
  };
}

const collectivityStateByEmail = new Map<string, MockCollectivityUserState>(
  Object.values(COLLECTIVITY_MOCK_USERS).map((user) => [
    user.email,
    {
      userId: user.id,
      email: user.email,
      planId: user.planId,
      cadrage: cloneCadrage(user.cadrage),
      hasInventory: Boolean(user.inventory),
      inventory: user.inventory,
    },
  ])
);

const collectivityCadrageByPlanId = new Map<string, CollectivityCadrageData>(
  Object.values(COLLECTIVITY_MOCK_USERS)
    .filter((user) => user.cadrage)
    .map((user) => [user.cadrage!.planId, cloneCadrage(user.cadrage)!])
);

export function getMockCollectivityUserState(userOrEmail: Pick<AuthUser, "email"> | string) {
  const email = typeof userOrEmail === "string" ? userOrEmail : userOrEmail.email;
  const state = collectivityStateByEmail.get(email.toLowerCase()) ?? null;

  if (!state) {
    return null;
  }

  return {
    ...state,
    planId: state.planId ? [...state.planId] : undefined,
    cadrage: cloneCadrage(state.cadrage),
  };
}

export function getMockCollectivityCadrage(planId: string) {
  return cloneCadrage(collectivityCadrageByPlanId.get(planId) ?? null);
}

export function isMockCollectivityPlanIdUnique(
  userOrEmail: Pick<AuthUser, "email"> | string,
  planId: string,
  currentPlanId?: string | null
) {
  if (currentPlanId && currentPlanId === planId) {
    return true;
  }

  const email = typeof userOrEmail === "string" ? userOrEmail : userOrEmail.email;
  const existingPlan = collectivityCadrageByPlanId.get(planId);

  if (!existingPlan) {
    return true;
  }

  const userState = collectivityStateByEmail.get(email.toLowerCase()) ?? null;
  return Boolean(userState?.planId?.includes(planId));
}

export function saveMockCollectivityCadrage(
  user: Pick<AuthUser, "id" | "email">,
  cadrage: CollectivityCadrageData,
  currentPlanId?: string | null
) {
  const normalizedEmail = user.email.toLowerCase();
  const previousState = collectivityStateByEmail.get(normalizedEmail) ?? null;
  const nextCadrage = cloneCadrage(cadrage)!;
  const previousPlanIds = previousState?.planId ?? [];
  const shouldRenamePlan =
    typeof currentPlanId === "string" &&
    currentPlanId !== cadrage.planId &&
    previousPlanIds.includes(currentPlanId);
  const nextPlanIds = shouldRenamePlan
    ? previousPlanIds.map((planId) => (planId === currentPlanId ? cadrage.planId : planId))
    : previousPlanIds.includes(cadrage.planId)
      ? previousPlanIds
      : [...previousPlanIds, cadrage.planId];

  if (shouldRenamePlan && currentPlanId) {
    collectivityCadrageByPlanId.delete(currentPlanId);
  }

  collectivityCadrageByPlanId.set(cadrage.planId, nextCadrage);

  collectivityStateByEmail.set(normalizedEmail, {
    userId: previousState?.userId ?? user.id,
    email: normalizedEmail,
    planId: nextPlanIds,
    cadrage: nextCadrage,
    hasInventory: previousState?.hasInventory ?? false,
    inventory: previousState?.inventory ?? null,
  });

  return cloneCadrage(nextCadrage)!;
}
