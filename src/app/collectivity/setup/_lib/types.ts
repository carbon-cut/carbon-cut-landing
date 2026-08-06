export type CollectivitySetupApplicability = {
  airport: boolean;
  port: boolean;
  agriculture: boolean;
};

export type CollectivitySetupData = {
  name: string;
  slug: string;
  country: string;
  territory: string;
  referenceYear: number;
  inventoryYears: number[];
  applicability: CollectivitySetupApplicability;
};

export type CollectivityProjectSnapshot = {
  id: string;
  slug: string;
  name: string;
  territory: string;
  country: string;
  referenceYear: number;
  inventoryYears: number[];
  currentInventoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type CollectivityInventorySnapshot = {
  id: string;
  projectId: string;
  setupPayload: CollectivitySetupData;
  inventoryInput: Record<string, unknown> | null;
  status: "draft" | "calculated" | "outdated";
  lockedYears: number[];
  latestCalculationRunId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CollectivitySetupSnapshot = {
  project: CollectivityProjectSnapshot;
  currentInventory: CollectivityInventorySnapshot;
};
