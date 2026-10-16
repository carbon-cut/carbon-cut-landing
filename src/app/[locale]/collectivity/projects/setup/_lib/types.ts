import type { components } from "@/generated/backend-api";

export type CollectivitySetupApplicability = {
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

export type CollectivityProjectSnapshot = components["schemas"]["Project"];
export type CollectivityInventorySnapshot = components["schemas"]["Inventory"];
export type CollectivitySetupSnapshot = components["schemas"]["ProjectSnapshot"];
