import type { AuthUser } from "@/lib/auth/types";
import type {
  CollectivityInventorySnapshot,
  CollectivityProjectSnapshot,
  CollectivitySetupData,
  CollectivitySetupSnapshot,
} from "@/app/collectivity/setup/_lib/types";

export const COLLECTIVITY_MOCK_PASSWORD = "123";

export const COLLECTIVITY_MOCK_USERS = {
  developedInventory: {
    id: 4,
    username: "collectivity-ready-user",
    email: "collectivity.ready@example.com",
    planId: ["grand-sfax-inventory"],
    setup: {
      name: "Inventaire carbone Grand Sfax",
      slug: "grand-sfax-inventory",
      country: "TUN",
      territory: "Grand Sfax",
      referenceYear: 2022,
      inventoryYears: [2021, 2022],
      applicability: {
        airport: true,
        port: true,
        agriculture: false,
      },
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
    setup: null,
    inventory: null,
  },
  newlyCreated: {
    id: 6,
    username: "collectivity-new-user",
    email: "collectivity.new@example.com",
    planId: undefined,
    setup: null,
    inventory: null,
  },
  superUser: {
    id: 7,
    username: "collectivity-super-user",
    email: "collectivity.super@example.com",
    planId: ["grand-sfax-inventory"],
    setup: {
      name: "Inventaire carbone Grand Sfax",
      slug: "grand-sfax-inventory",
      country: "TUN",
      territory: "Grand Sfax",
      referenceYear: 2022,
      inventoryYears: [2021, 2022],
      applicability: {
        airport: true,
        port: true,
        agriculture: false,
      },
    },
    inventory: {
      municipalElectricityConsumptionKwh: 42000,
    },
  },
};

export type MockCollectivityUserState = {
  userId: number;
  email: string;
  planId: string[] | undefined;
  setup: CollectivitySetupData | null;
  hasInventory: boolean;
  inventory: Record<string, unknown> | null;
  project: CollectivityProjectSnapshot | null;
  currentInventory: CollectivityInventorySnapshot | null;
};

const mockCollectivitySupportedValues = {
  "ef-lto:aircraft": [
    "A220",
    "A319",
    "A320",
    "A321",
    "A330",
    "A350",
    "B737",
    "B757",
    "B767",
    "B777",
    "B787",
    "RegionalTurboprop",
    "RegionalJet",
    "Other",
  ].map((value) => ({
    value,
    label: value,
    selector: {
      aircraft: value,
    },
  })),
} as const;

function cloneSetup(setup: CollectivitySetupData | null): CollectivitySetupData | null {
  if (!setup) {
    return null;
  }

  return {
    ...setup,
    inventoryYears: [...setup.inventoryYears],
    applicability: {
      ...setup.applicability,
    },
  };
}

function cloneProject(
  project: CollectivityProjectSnapshot | null
): CollectivityProjectSnapshot | null {
  if (!project) {
    return null;
  }

  return {
    ...project,
    inventoryYears: [...project.inventoryYears],
  };
}

function cloneCurrentInventory(
  currentInventory: CollectivityInventorySnapshot | null
): CollectivityInventorySnapshot | null {
  if (!currentInventory) {
    return null;
  }

  return {
    ...currentInventory,
    setupPayload: cloneSetup(currentInventory.setupPayload)!,
    inventoryInput: currentInventory.inventoryInput ? { ...currentInventory.inventoryInput } : null,
    lockedYears: [...currentInventory.lockedYears],
  };
}

function buildProjectSnapshot(
  setup: CollectivitySetupData,
  options?: {
    projectId?: string;
    currentInventoryId?: string;
    createdAt?: string;
    updatedAt?: string;
  }
): CollectivityProjectSnapshot {
  const timestamp = options?.updatedAt ?? new Date().toISOString();

  return {
    id: options?.projectId ?? `project:${setup.slug}`,
    slug: setup.slug,
    name: setup.name,
    territory: setup.territory,
    country: setup.country,
    referenceYear: setup.referenceYear,
    inventoryYears: [...setup.inventoryYears],
    currentInventoryId: options?.currentInventoryId ?? `inventory:${setup.slug}:current`,
    createdAt: options?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

function buildCurrentInventorySnapshot(
  setup: CollectivitySetupData,
  options?: {
    projectId?: string;
    inventoryId?: string;
    inventoryInput?: Record<string, unknown> | null;
    createdAt?: string;
    updatedAt?: string;
  }
): CollectivityInventorySnapshot {
  const timestamp = options?.updatedAt ?? new Date().toISOString();

  return {
    id: options?.inventoryId ?? `inventory:${setup.slug}:current`,
    projectId: options?.projectId ?? `project:${setup.slug}`,
    setupPayload: cloneSetup(setup)!,
    inventoryInput: options?.inventoryInput ? { ...options.inventoryInput } : null,
    status: "draft",
    lockedYears: [],
    latestCalculationRunId: null,
    createdAt: options?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

function buildSetupSnapshot(
  setup: CollectivitySetupData,
  options?: {
    inventoryInput?: Record<string, unknown> | null;
    projectId?: string;
    inventoryId?: string;
    createdAt?: string;
    updatedAt?: string;
  }
): CollectivitySetupSnapshot {
  const projectId = options?.projectId ?? `project:${setup.slug}`;
  const inventoryId = options?.inventoryId ?? `inventory:${setup.slug}:current`;
  const createdAt = options?.createdAt ?? new Date().toISOString();
  const updatedAt = options?.updatedAt ?? createdAt;
  const currentInventory = buildCurrentInventorySnapshot(setup, {
    projectId,
    inventoryId,
    inventoryInput: options?.inventoryInput ?? null,
    createdAt,
    updatedAt,
  });

  return {
    project: buildProjectSnapshot(setup, {
      projectId,
      currentInventoryId: inventoryId,
      createdAt,
      updatedAt,
    }),
    currentInventory,
  };
}

const collectivityStateByEmail = new Map<string, MockCollectivityUserState>(
  Object.values(COLLECTIVITY_MOCK_USERS).map((user) => [
    user.email,
    (() => {
      const createdAt = "2026-01-01T00:00:00.000Z";
      const updatedAt = user.inventory ? "2026-06-01T00:00:00.000Z" : createdAt;
      const snapshot = user.setup
        ? buildSetupSnapshot(user.setup, {
            inventoryInput: user.inventory,
            createdAt,
            updatedAt,
          })
        : null;

      return {
        userId: user.id,
        email: user.email,
        planId: user.planId,
        setup: cloneSetup(user.setup),
        hasInventory: Boolean(snapshot?.currentInventory),
        inventory: user.inventory,
        project: cloneProject(snapshot?.project ?? null),
        currentInventory: cloneCurrentInventory(snapshot?.currentInventory ?? null),
      };
    })(),
  ])
);

const collectivitySetupByPlanId = new Map<string, CollectivitySetupData>(
  Object.values(COLLECTIVITY_MOCK_USERS)
    .filter((user) => user.setup)
    .map((user) => [user.setup!.slug, cloneSetup(user.setup)!])
);

const collectivitySnapshotByPlanId = new Map<string, CollectivitySetupSnapshot>(
  Array.from(collectivityStateByEmail.values())
    .filter((state) => state.project && state.currentInventory)
    .map((state) => [
      state.project!.slug,
      {
        project: cloneProject(state.project)!,
        currentInventory: cloneCurrentInventory(state.currentInventory)!,
      },
    ])
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
    setup: cloneSetup(state.setup),
    inventory: state.inventory ? { ...state.inventory } : null,
    project: cloneProject(state.project),
    currentInventory: cloneCurrentInventory(state.currentInventory),
  };
}

export function getMockCollectivitySetup(planId: string) {
  return cloneSetup(collectivitySetupByPlanId.get(planId) ?? null);
}

export function getMockCollectivitySupportedValues(familyKey: string, selectorKey: string) {
  const key = `${familyKey}:${selectorKey}` as keyof typeof mockCollectivitySupportedValues;
  const values = mockCollectivitySupportedValues[key];

  if (!values) {
    return null;
  }

  return values.map((entry) => ({
    value: entry.value,
    label: entry.label,
    selector: { ...entry.selector },
  }));
}

export function getMockCollectivitySetupSnapshot(planId: string) {
  const snapshot = collectivitySnapshotByPlanId.get(planId) ?? null;

  if (!snapshot) {
    return null;
  }

  return {
    project: cloneProject(snapshot.project)!,
    currentInventory: cloneCurrentInventory(snapshot.currentInventory)!,
  };
}

export function userOwnsMockCollectivityPlan(
  userOrEmail: Pick<AuthUser, "email"> | string,
  planId: string
) {
  const email = typeof userOrEmail === "string" ? userOrEmail : userOrEmail.email;
  const userState = collectivityStateByEmail.get(email.toLowerCase()) ?? null;

  return Boolean(userState?.planId?.includes(planId));
}

export function isMockCollectivityPlanIdUnique(
  userOrEmail: Pick<AuthUser, "email"> | string,
  slug: string,
  currentPlanId?: string | null
) {
  if (currentPlanId && currentPlanId === slug && userOwnsMockCollectivityPlan(userOrEmail, slug)) {
    return true;
  }

  const email = typeof userOrEmail === "string" ? userOrEmail : userOrEmail.email;
  const existingPlan = collectivitySetupByPlanId.get(slug);

  if (!existingPlan) {
    return true;
  }

  const userState = collectivityStateByEmail.get(email.toLowerCase()) ?? null;
  return Boolean(userState?.planId?.includes(slug));
}

export function saveMockCollectivitySetup(
  user: Pick<AuthUser, "id" | "email">,
  setup: CollectivitySetupData,
  currentPlanId?: string | null
) {
  const normalizedEmail = user.email.toLowerCase();
  const previousState = collectivityStateByEmail.get(normalizedEmail) ?? null;
  const nextSetup = cloneSetup(setup)!;
  const previousPlanIds = previousState?.planId ?? [];
  const shouldRenamePlan =
    typeof currentPlanId === "string" &&
    currentPlanId !== setup.slug &&
    previousPlanIds.includes(currentPlanId);
  const previousSnapshot =
    (currentPlanId ? collectivitySnapshotByPlanId.get(currentPlanId) : undefined) ??
    collectivitySnapshotByPlanId.get(setup.slug) ??
    null;
  const nextPlanIds = shouldRenamePlan
    ? previousPlanIds.map((planId) => (planId === currentPlanId ? setup.slug : planId))
    : previousPlanIds.includes(setup.slug)
      ? previousPlanIds
      : [...previousPlanIds, setup.slug];
  const snapshot = buildSetupSnapshot(nextSetup, {
    inventoryInput: previousSnapshot?.currentInventory.inventoryInput ?? null,
    projectId: previousSnapshot?.project.id,
    inventoryId: previousSnapshot?.currentInventory.id,
    createdAt: previousSnapshot?.project.createdAt,
  });

  if (shouldRenamePlan && currentPlanId) {
    collectivitySetupByPlanId.delete(currentPlanId);
    collectivitySnapshotByPlanId.delete(currentPlanId);
  }

  collectivitySetupByPlanId.set(setup.slug, nextSetup);
  collectivitySnapshotByPlanId.set(setup.slug, {
    project: cloneProject(snapshot.project)!,
    currentInventory: cloneCurrentInventory(snapshot.currentInventory)!,
  });

  collectivityStateByEmail.set(normalizedEmail, {
    userId: previousState?.userId ?? user.id,
    email: normalizedEmail,
    planId: nextPlanIds,
    setup: nextSetup,
    hasInventory: true,
    inventory: snapshot.currentInventory.inventoryInput
      ? { ...snapshot.currentInventory.inventoryInput }
      : null,
    project: cloneProject(snapshot.project),
    currentInventory: cloneCurrentInventory(snapshot.currentInventory),
  });

  return {
    project: cloneProject(snapshot.project)!,
    currentInventory: cloneCurrentInventory(snapshot.currentInventory)!,
  };
}

export function saveMockCollectivityInventoryInput(
  userOrEmail: Pick<AuthUser, "email"> | string,
  planId: string,
  inventoryInput: Record<string, unknown>
) {
  if (!userOwnsMockCollectivityPlan(userOrEmail, planId)) {
    return null;
  }

  const snapshot = collectivitySnapshotByPlanId.get(planId) ?? null;

  if (!snapshot) {
    return null;
  }

  const timestamp = new Date().toISOString();
  const nextSnapshot: CollectivitySetupSnapshot = {
    project: {
      ...cloneProject(snapshot.project)!,
      updatedAt: timestamp,
    },
    currentInventory: {
      ...cloneCurrentInventory(snapshot.currentInventory)!,
      inventoryInput: { ...inventoryInput },
      updatedAt: timestamp,
    },
  };

  collectivitySnapshotByPlanId.set(planId, {
    project: cloneProject(nextSnapshot.project)!,
    currentInventory: cloneCurrentInventory(nextSnapshot.currentInventory)!,
  });

  const email = typeof userOrEmail === "string" ? userOrEmail : userOrEmail.email;
  const normalizedEmail = email.toLowerCase();
  const previousState = collectivityStateByEmail.get(normalizedEmail) ?? null;

  if (previousState) {
    collectivityStateByEmail.set(normalizedEmail, {
      ...previousState,
      inventory: { ...inventoryInput },
      project: cloneProject(nextSnapshot.project),
      currentInventory: cloneCurrentInventory(nextSnapshot.currentInventory),
    });
  }

  return {
    project: cloneProject(nextSnapshot.project)!,
    currentInventory: cloneCurrentInventory(nextSnapshot.currentInventory)!,
  };
}
