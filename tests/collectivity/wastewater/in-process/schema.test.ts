import { describe, expect, it } from "vitest";

import {
  validateWastewaterCalculation,
  wastewaterSanitationSchema,
} from "@/app/[locale]/collectivity/projects/[planId]/inventory/InventorySchema/wastewaterSanitation";

const metric = (unit: string, value: Record<string, number | undefined> = {}) => ({ value, unit });

function treatmentRow(overrides: Record<string, unknown> = {}) {
  return {
    system: "anaerobicReactor",
    loadType: "domestic",
    withinMunicipalBoundary: true,
    dischargesToWater: "no",
    value: {
      domestic: metric("kg BOD"),
      sludgeRemovedDomestic: metric("kg BOD"),
      nitrogen: metric("kg N"),
      outgoingNitrogen: metric("kg N"),
      methaneRecovery: metric("kg CH4"),
      populationAllocation: metric("%"),
      outgoingDomestic: metric("kg BOD"),
    },
    ...overrides,
  };
}

function input(rows: unknown[], overrides: Record<string, unknown> = {}) {
  return {
    years: { reference: 2024, comparisons: [2023] },
    sharedData: {
      population: { dataSet: { count: metric("capita", { "y-2023": 900, "y-2024": 1000 }) } },
    },
    wastewaterSanitation: {
      treatmentDischarge: { dataSet: rows },
      sludgeDestination: { dataSet: [], landfillSites: { dataSet: [] } },
      populationFallback: {
        dataSet: {
          utility: {
            connectionPercentage: metric("%", { "y-2023": 80, "y-2024": 80 }),
            foodWasteToSewer: "no",
          },
        },
      },
    },
    ...overrides,
  };
}

describe("wastewater calculation schema rules", () => {
  it("treats zero as supplied annual activity", () => {
    const row = treatmentRow({
      value: {
        domestic: metric("kg BOD", { "y-2024": 0 }),
        methaneRecovery: metric("kg CH4", { "y-2024": 0 }),
      },
    });

    expect(validateWastewaterCalculation(input([row])).issues).toEqual([]);
  });

  it("allows nitrogen-only activity", () => {
    const row = treatmentRow({ value: { nitrogen: metric("kg N", { "y-2024": 10 }) } });

    expect(validateWastewaterCalculation(input([row])).issues).toEqual([]);
  });

  it("validates dependencies independently for each active year", () => {
    const row = treatmentRow({
      value: {
        domestic: metric("kg BOD", { "y-2023": 10 }),
        methaneRecovery: metric("kg CH4", { "y-2024": 1 }),
      },
    });

    expect(validateWastewaterCalculation(input([row])).issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "orphanAnnualValue",
          path: [
            "wastewaterSanitation",
            "treatmentDischarge",
            "dataSet",
            0,
            "value",
            "methaneRecovery",
            "value",
            "y-2024",
          ],
        }),
      ])
    );
  });

  it("rejects unsupported industrial treatment systems", () => {
    const row = treatmentRow({
      system: "septicTank",
      loadType: "industrial",
      value: {
        industrial: metric("kg COD", { "y-2024": 10 }),
        sludgeRemovedIndustrial: metric("kg COD", { "y-2024": 0 }),
      },
    });

    expect(validateWastewaterCalculation(input([row])).issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "unsupportedWastewaterMethod" })])
    );
  });

  it("reconciles population allocations across rows", () => {
    const populationRow = (amount: number) =>
      treatmentRow({
        system: "flowingSewer",
        value: { populationAllocation: metric("%", { "y-2024": amount }) },
      });

    const valid = validateWastewaterCalculation(input([populationRow(40), populationRow(35)]));
    expect(valid.issues).toEqual([]);
    expect(valid.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "wastewaterPopulationUnallocated",
          details: { allocatedPercent: 75, unallocatedPercent: 25 },
        }),
      ])
    );

    const exceeded = validateWastewaterCalculation(
      input([populationRow(40), populationRow(35), populationRow(30)])
    );
    expect(
      exceeded.issues.filter((issue) => issue.code === "populationAllocationExceeded")
    ).toHaveLength(3);
  });

  it("ignores calculation rules for rows outside the municipal boundary", () => {
    const row = treatmentRow({
      withinMunicipalBoundary: false,
      system: "septicTank",
      loadType: "industrial",
      value: { industrial: metric("kg COD", { "y-2024": 10 }) },
    });

    expect(validateWastewaterCalculation(input([row])).issues).toEqual([]);
  });
});

describe("wastewater landfill schema", () => {
  const base = {
    treatmentDischarge: { dataSet: [treatmentRow()] },
    sludgeDestination: {
      dataSet: [],
      landfillSites: {
        dataSet: [
          {
            landfillIdentifier: "site-1",
            commissioningYear: 2023,
            climate: "temperateDry",
            landfillSiteType: "managedAnaerobic",
            oxidationCover: "noneOrUnspecified",
            disposalHistory: {
              domestic: metric("t wet sludge", { "y-2023": 0, "y-2024": 1 }),
              industrial: metric("t wet sludge", { "y-2023": 0, "y-2024": 0 }),
            },
            methaneRecovery: metric("kg CH4", { "y-2023": 0, "y-2024": 0 }),
          },
        ],
      },
    },
    populationFallback: {
      dataSet: {
        utility: { connectionPercentage: metric("%"), foodWasteToSewer: "no" },
      },
    },
  };

  it("accepts the controlled landfill-site shape", () => {
    expect(wastewaterSanitationSchema.safeParse(base).success).toBe(true);
  });

  it("allows a sludge-only wastewater inventory", () => {
    expect(
      wastewaterSanitationSchema.safeParse({
        ...base,
        treatmentDischarge: { dataSet: [] },
      }).success
    ).toBe(true);
  });

  it("rejects uncontrolled landfill values", () => {
    const invalid = structuredClone(base);
    invalid.sludgeDestination.landfillSites.dataSet[0].climate = "custom climate";

    expect(wastewaterSanitationSchema.safeParse(invalid).success).toBe(false);
  });

  it("reports incomplete history as not estimated", () => {
    const landfillRow = {
      destination: "landfill",
      sludgeType: "domestic",
      landfillIdentifier: "site-1",
      withinMunicipalBoundary: true,
      value: {
        mass: metric("t wet sludge", { "y-2024": 1 }),
        methaneRecovery: metric("kg CH4"),
        nitrogenApplied: metric("kg N"),
      },
    };
    const site = structuredClone(base.sludgeDestination.landfillSites.dataSet[0]);
    delete site.disposalHistory.domestic.value["y-2023"];
    const result = validateWastewaterCalculation(
      input([], {
        wastewaterSanitation: {
          ...base,
          treatmentDischarge: { dataSet: [] },
          sludgeDestination: { dataSet: [landfillRow], landfillSites: { dataSet: [site] } },
        },
      })
    );

    expect(result.issues).toEqual([]);
    expect(result.warnings).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "wastewaterLandfillNotEstimated" })])
    );
  });
});
