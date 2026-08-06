import { describe, expect, it } from "vitest";

import {
  collectivityCadrageSchema,
  getCollectivityCountryOptions,
  getCollectivityPlanIdSuggestion,
  getCollectivityTerritoryOptions,
  slugifyCollectivityPlanId,
} from "@/app/collectivity/_cadrage/schema";
import {
  getMockCollectivityCadrage,
  getMockCollectivityUserState,
  isMockCollectivityPlanIdUnique,
  saveMockCollectivityCadrage,
} from "@/mocks/collectivity";

describe("collectivity cadrage schema", () => {
  it("accepts a valid collectivity cadrage payload", () => {
    const result = collectivityCadrageSchema.safeParse({
      country: "tunisia",
      planId: "grand-sfax",
      territoryName: "Grand Sfax",
      referenceYear: "2022",
      supportYears: ["2021"],
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid plan id", () => {
    const result = collectivityCadrageSchema.safeParse({
      country: "tunisia",
      planId: "Grand Sfax",
      territoryName: "Grand Sfax",
      referenceYear: "2022",
      supportYears: ["2021"],
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("collectivityPlanIdInvalid");
  });

  it("rejects support years that repeat the reference year", () => {
    const result = collectivityCadrageSchema.safeParse({
      country: "tunisia",
      planId: "grand-sfax",
      territoryName: "Grand Sfax",
      referenceYear: "2022",
      supportYears: ["2022"],
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("collectivitySupportYearsReferenceConflict");
  });

  it("returns the mocked backend country options", async () => {
    await expect(getCollectivityCountryOptions()).resolves.toEqual([
      { value: "tunisia", label: "Tunisie" },
      { value: "senegal", label: "Sénégal" },
      { value: "france", label: "France" },
    ]);
  });

  it("returns territory options filtered by country", () => {
    expect(getCollectivityTerritoryOptions("tunisia").map((option) => option.label)).toEqual([
      "Grand Sfax",
      "Sfax",
      "Tunis",
    ]);
    expect(getCollectivityTerritoryOptions("")).toEqual([]);
  });

  it("slugifies a territory name and prefers known territory suggestions", () => {
    expect(slugifyCollectivityPlanId("Thiès Centre")).toBe("thies-centre");
    expect(getCollectivityPlanIdSuggestion("tunisia", "Grand Sfax")).toBe("grand-sfax");
  });

  it("persists cadrage data by plan id and mirrors it to the user state", () => {
    const saved = saveMockCollectivityCadrage(
      {
        id: 5,
        email: "collectivity.no-inventory@example.com",
      },
      {
        country: "senegal",
        planId: "dakar-test",
        territoryName: "Dakar",
        referenceYear: "2023",
        supportYears: ["2022"],
      }
    );

    expect(saved).toEqual({
      country: "senegal",
      planId: "dakar-test",
      territoryName: "Dakar",
      referenceYear: "2023",
      supportYears: ["2022"],
    });

    expect(getMockCollectivityCadrage("dakar-test")).toEqual(saved);
    expect(getMockCollectivityUserState("collectivity.no-inventory@example.com")?.cadrage).toEqual(
      saved
    );
    expect(getMockCollectivityUserState("collectivity.no-inventory@example.com")?.planId).toEqual([
      "dakar-test",
    ]);
  });

  it("rejects a plan id already owned by another user", () => {
    expect(
      isMockCollectivityPlanIdUnique("collectivity.no-inventory@example.com", "grand-sfax")
    ).toBe(false);
    expect(
      isMockCollectivityPlanIdUnique("collectivity.ready@example.com", "grand-sfax", "grand-sfax")
    ).toBe(true);
  });
});
