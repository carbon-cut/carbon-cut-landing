import { z } from "zod";

import {
  COLLECTIVITY_MOCK_COUNTRY_OPTIONS,
  COLLECTIVITY_MOCK_TERRITORY_OPTIONS,
} from "@/mocks/collectivity";
import type { CollectivityCadrageData } from "./types";

export const collectivityCountryOptions = [...COLLECTIVITY_MOCK_COUNTRY_OPTIONS];
export const collectivityCountryCodes = collectivityCountryOptions.map(
  (option) => option.value
) as [
  (typeof collectivityCountryOptions)[number]["value"],
  ...(typeof collectivityCountryOptions)[number]["value"][],
];

export function getCollectivityCountryOptions() {
  return Promise.resolve(collectivityCountryOptions);
}

export function getCollectivityTerritoryOptions(country?: string | null) {
  if (!country) {
    return [];
  }

  return [
    ...(COLLECTIVITY_MOCK_TERRITORY_OPTIONS[
      country as keyof typeof COLLECTIVITY_MOCK_TERRITORY_OPTIONS
    ] ?? []),
  ];
}

export function slugifyCollectivityPlanId(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCollectivityPlanIdSuggestion(country: string, territoryName: string) {
  const matchingTerritory = getCollectivityTerritoryOptions(country).find(
    (option) => option.value === territoryName
  );

  return matchingTerritory?.planId ?? slugifyCollectivityPlanId(territoryName);
}

export function getCollectivityYearOptions(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => {
    const year = String(from + index);
    return { value: year, label: year };
  });
}

export const collectivityCadrageSchema = z
  .object({
    country: z
      .string()
      .trim()
      .min(1, "collectivityCountryRequired")
      .refine(
        (value) =>
          collectivityCountryCodes.includes(value as (typeof collectivityCountryCodes)[number]),
        {
          message: "collectivityCountryInvalid",
        }
      ),
    planId: z
      .string()
      .trim()
      .min(1, "collectivityPlanIdRequired")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "collectivityPlanIdInvalid"),
    territoryName: z.string().trim().min(1, "collectivityTerritoryRequired"),
    referenceYear: z.string().trim().min(1, "collectivityReferenceYearRequired"),
    supportYears: z.array(z.string()).min(1, "collectivitySupportYearsRequired"),
  })
  .superRefine((values, context) => {
    if (new Set(values.supportYears).size !== values.supportYears.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "collectivitySupportYearsDuplicate",
        path: ["supportYears"],
      });
    }

    if (values.supportYears.includes(values.referenceYear)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "collectivitySupportYearsReferenceConflict",
        path: ["supportYears"],
      });
    }
  });

export type CollectivityCadrageValues = z.infer<typeof collectivityCadrageSchema>;
export type { CollectivityCadrageData };
