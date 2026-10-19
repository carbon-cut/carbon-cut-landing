import { describe, expect, it } from "vitest";

import { createInventorySchema } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/InventorySchema";
import {
  buildInventoryDefaultValues,
  buildInventoryDefaultValuesAfterPerimeterChange,
} from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/inventoryDefaultValues";
import { buildInventoryRegistry } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/registry";
import { getInventoryDatasetHasError } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/inventoryErrors";
import { getInventoryDatasetProgress } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/inventoryProgress";
import {
  sharedDataDefault,
  sharedDataSchema,
} from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/InventorySchema/shared-data";
import type { InventoryFormValues } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/context/inventory-context";

const savedTerritorialActivity = {
  transport: {
    territoryVehicles: {
      dataSet: {
        rows: [{ vehicleType: "privateVehicles", fuel: "petrol" }],
      },
    },
  },
};

function buildInventoryValues(perimeter: "patrimoine_communal" | "territorial_communes") {
  const { workspace } = buildInventoryRegistry(null, perimeter);
  const defaults = buildInventoryDefaultValues(null, [2024], workspace);
  const population = defaults.sharedData?.population.dataSet.count.value as Record<string, number>;
  population["y-2024"] = 0;
  if (perimeter === "territorial_communes") {
    const consumptionNorm = defaults.sharedData?.householdEnergy?.assumptions.consumptionNorm as {
      value: number | undefined;
    };
    consumptionNorm.value = 0;
  }

  return {
    ...defaults,
    years: { reference: 2024, comparisons: [] },
  };
}

describe("inventory boundary behavior", () => {
  it("retains the original territory requirement for household energy", () => {
    const values = sharedDataDefault([2024]);
    values.population.dataSet.count.value["y-2024"] = 0;

    expect(sharedDataSchema.safeParse(values).success).toBe(false);
    expect(sharedDataSchema.safeParse({ population: values.population }).success).toBe(false);

    const householdEnergy = {
      assumptions: {
        consumptionNorm: { ...values.householdEnergy.assumptions.consumptionNorm, value: 0 },
      },
    };
    expect(sharedDataSchema.safeParse({ ...values, householdEnergy }).success).toBe(true);

    const missingPopulation = sharedDataSchema.safeParse({
      ...values,
      population: { dataSet: { count: { value: { "y-2024": undefined }, unit: "capita" } } },
    });
    expect(missingPopulation.success).toBe(false);
  });

  it("requires shared data for both inventory boundaries", () => {
    for (const perimeter of ["patrimoine_communal", "territorial_communes"] as const) {
      const result = createInventorySchema({ perimeter, applicability: null }).safeParse({
        ...buildInventoryValues(perimeter),
        sharedData: undefined,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((issue) => issue.path[0] === "sharedData")).toBe(true);
      }
    }
  });

  it("does not validate hidden household energy for municipal-assets projects", () => {
    const values = buildInventoryValues("patrimoine_communal");
    const municipal = values.municipal as Record<string, unknown>;
    const treesParksWaste = municipal.treesParksWaste as Record<string, unknown>;
    const treesParksWasteData = treesParksWaste.dataSet as Record<
      string,
      { value: Record<string, number | undefined> }
    >;
    for (const key of ["treeCanopyArea", "greenWaste", "composting"]) {
      treesParksWasteData[key].value["y-2024"] = 0;
    }
    const hiddenHouseholdEnergy = { assumptions: { consumptionNorm: "saved value" } };
    const result = createInventorySchema({
      perimeter: "patrimoine_communal",
      applicability: null,
    }).safeParse({
      ...values,
      sharedData: { ...values.sharedData, householdEnergy: hiddenHouseholdEnergy },
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sharedData.householdEnergy).toEqual(hiddenHouseholdEnergy);
    }
  });

  it("keeps municipal activity datasets for the municipal-assets boundary", () => {
    const { workspace } = buildInventoryRegistry(null, "patrimoine_communal");

    expect(workspace.datasets.map((dataset) => dataset.key)).toEqual([
      "referenceData",
      "fleet",
      "publicLighting",
      "buildings",
      "treesParksWaste",
    ]);
  });

  it("tracks population errors and progress on the reference-data tab", () => {
    const values = buildInventoryValues("patrimoine_communal");
    const progress = getInventoryDatasetProgress("referenceData", values, [2024]);

    expect(progress?.percent).toBe(100);
    expect(
      getInventoryDatasetHasError("referenceData", {
        sharedData: { population: { dataSet: { count: { type: "required" } } } },
      })
    ).toBe(true);
    expect(getInventoryDatasetHasError("fleet", { sharedData: { population: {} } })).toBe(false);
  });

  it("keeps municipal and territorial activity datasets for the whole-territory boundary", () => {
    const { workspace } = buildInventoryRegistry(null, "territorial_communes");

    expect(workspace.datasets.map((dataset) => dataset.key)).toContain("fleet");
    expect(workspace.datasets.map((dataset) => dataset.key)).toContain("referenceData");
    expect(workspace.datasets.map((dataset) => dataset.key)).toContain("territoryVehicles");
    expect(workspace.datasets.map((dataset) => dataset.key)).toContain("trees");
  });

  it("preserves territorial draft values when the project changes to municipal assets", () => {
    const { workspace: wholeTerritoryWorkspace } = buildInventoryRegistry(
      null,
      "territorial_communes"
    );
    const { workspace: municipalAssetsWorkspace } = buildInventoryRegistry(
      null,
      "patrimoine_communal"
    );
    const currentValues = {
      ...buildInventoryDefaultValues(savedTerritorialActivity, [2024], wholeTerritoryWorkspace),
      years: { reference: 2024, comparisons: [] },
    } as unknown as InventoryFormValues;
    const changedValues = buildInventoryDefaultValuesAfterPerimeterChange(
      currentValues,
      [2024],
      municipalAssetsWorkspace,
      currentValues.years
    );

    expect(changedValues).toMatchObject({
      transport: {
        territoryVehicles: {
          dataSet: {
            rows: expect.arrayContaining([
              expect.objectContaining({ vehicleType: "privateVehicles" }),
            ]),
          },
        },
      },
    });
  });

  it("preserves hidden territorial values without validating them for municipal assets", () => {
    const territorialActivity = {
      transport: {
        territoryVehicles: { dataSet: { rows: "invalid hidden value" } },
      },
      energy: "invalid hidden value",
    };
    const values = { ...buildInventoryValues("patrimoine_communal"), ...territorialActivity };
    const municipal = values.municipal as Record<string, unknown>;
    const treesParksWaste = municipal.treesParksWaste as Record<string, unknown>;
    const treesParksWasteData = treesParksWaste.dataSet as Record<
      string,
      { value: Record<string, number | undefined> }
    >;
    for (const key of ["treeCanopyArea", "greenWaste", "composting"]) {
      treesParksWasteData[key].value["y-2024"] = 0;
    }
    const result = createInventorySchema({
      perimeter: "patrimoine_communal",
      applicability: null,
    }).safeParse(values);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.transport).toEqual(territorialActivity.transport);
      expect(result.data.energy).toEqual(territorialActivity.energy);
    }
  });

  it("validates territorial values for the whole-territory boundary", () => {
    const values = {
      ...buildInventoryValues("territorial_communes"),
      transport: {
        buses: { dataSet: [] },
        urbanRail: { dataSet: [] },
        territoryVehicles: { dataSet: { rows: "invalid value" } },
      },
    };
    const result = createInventorySchema({
      perimeter: "territorial_communes",
      applicability: null,
    }).safeParse(values);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path[0] === "transport" &&
            issue.path[1] === "territoryVehicles" &&
            issue.path[2] === "dataSet"
        )
      ).toBe(true);
    }
  });

  it("does not require a dataset excluded by project setup", () => {
    const { workspace } = buildInventoryRegistry(
      { port: false, agriculture: false },
      "territorial_communes"
    );
    expect(workspace.datasets.some((dataset) => dataset.key === "port")).toBe(false);
    const baseValues = buildInventoryValues("territorial_communes");
    const values = {
      ...baseValues,
      transport: {
        ...baseValues.transport,
        buses: { dataSet: "invalid active value" },
      },
    };
    const result = createInventorySchema({
      perimeter: "territorial_communes",
      applicability: { port: false, agriculture: false },
    }).safeParse(values);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path.join(".").startsWith("transport.buses"))
      ).toBe(true);
      expect(result.error.issues.some((issue) => issue.path[1] === "port")).toBe(false);
    }
  });
});
