import { describe, expect, it } from "vitest";

import {
  collectivitySetupSchema,
  getCollectivityCountryOptions,
  getCollectivityYearOptions,
  latestCollectivityAvailableYear,
  slugifyCollectivitySlug,
} from "@/app/[locale]/collectivity/projects/setup/_lib/schema";

function makeValidSetup(overrides: Record<string, unknown> = {}) {
  return {
    name: "Grand Sfax",
    slug: "grand-sfax",
    country: "tunisia",
    territory: "Sfax",
    referenceYear: 2023,
    inventoryYears: [2022, 2023],
    applicability: {
      port: false,
      agriculture: true,
    },
    ...overrides,
  };
}

describe("collectivity project setup schema", () => {
  it("accepts a valid project setup", () => {
    expect(collectivitySetupSchema.safeParse(makeValidSetup()).success).toBe(true);
  });

  it("rejects a slug that is not URL-safe", () => {
    const result = collectivitySetupSchema.safeParse(makeValidSetup({ slug: "Grand Sfax" }));

    expect(result.success).toBe(false);
    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({ path: ["slug"], message: "collectivityProjectSlugInvalid" })
    );
  });

  it("requires the reference year among inventory years", () => {
    const result = collectivitySetupSchema.safeParse(
      makeValidSetup({ inventoryYears: [2021, 2022] })
    );

    expect(result.success).toBe(false);
    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({
        path: ["inventoryYears"],
        message: "collectivityInventoryYearsReferenceMissing",
      })
    );
  });

  it("rejects duplicate inventory years", () => {
    const result = collectivitySetupSchema.safeParse(
      makeValidSetup({ inventoryYears: [2022, 2022, 2023] })
    );

    expect(result.success).toBe(false);
    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({
        path: ["inventoryYears"],
        message: "collectivityInventoryYearsDuplicate",
      })
    );
  });

  it("offers localized country and available year options", () => {
    expect(getCollectivityCountryOptions(["FRA", "BEL"], "fr-FR")).toEqual([
      { value: "FRA", label: "France" },
      { value: "BEL", label: "Belgique" },
    ]);
    expect(getCollectivityYearOptions(2022, 2024)).toEqual([
      { value: "2022", label: "2022" },
      { value: "2023", label: "2023" },
      { value: "2024", label: "2024" },
    ]);
    expect(getCollectivityYearOptions(2024, 2022)).toEqual([]);
    expect(latestCollectivityAvailableYear).toBe(new Date().getFullYear() - 1);
  });

  it("turns a territory name into a URL slug", () => {
    expect(slugifyCollectivitySlug("Thiès Centre")).toBe("thies-centre");
  });
});
