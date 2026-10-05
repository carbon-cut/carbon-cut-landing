import { z } from "zod";

import countries from "../../../pricing/_lib/countries.json";
import type { CollectivitySetupData } from "./types";

export const latestCollectivityAvailableYear = new Date().getFullYear() - 1;

export function getCollectivityCountryOptions(countryCodes: string[], locale: string) {
  const displayNames = new Intl.DisplayNames([locale], { type: "region" });

  return countryCodes.map((code) => {
    const country = countries.find((candidate) => candidate.alpha3 === code);
    return {
      value: code,
      label: country ? (displayNames.of(country.alpha2) ?? code) : code,
    };
  });
}

export function slugifyCollectivitySlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCollectivityYearOptions(from: number, to: number) {
  if (to < from) {
    return [];
  }

  return Array.from({ length: to - from + 1 }, (_, index) => {
    const year = from + index;
    return { value: String(year), label: String(year) };
  });
}

export const collectivitySetupSchema = z
  .object({
    name: z.string().trim().min(1, "Required"),
    slug: z
      .string()
      .trim()
      .min(1, "Required")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "collectivityProjectSlugInvalid"),
    country: z.string().trim().min(1, "Required"),
    territory: z.string().trim().min(1, "Required"),
    referenceYear: z.number({
      required_error: "Required",
      invalid_type_error: "Required",
    }),
    inventoryYears: z.array(z.number().int("collectivityInventoryYearInvalid")),
    applicability: z.object({
      port: z.boolean(),
      agriculture: z.boolean(),
    }),
  })
  .superRefine((values, context) => {
    if (values.referenceYear >= latestCollectivityAvailableYear + 1) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "collectivityYearMustBePast",
        path: ["referenceYear"],
      });
    }

    if (values.inventoryYears.some((year) => year >= latestCollectivityAvailableYear + 1)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "collectivityYearMustBePast",
        path: ["inventoryYears"],
      });
    }

    if (new Set(values.inventoryYears).size !== values.inventoryYears.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "collectivityInventoryYearsDuplicate",
        path: ["inventoryYears"],
      });
    }

    if (!values.inventoryYears.includes(values.referenceYear)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "collectivityInventoryYearsReferenceMissing",
        path: ["inventoryYears"],
      });
    }

    if (values.inventoryYears.filter((year) => year !== values.referenceYear).length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["inventoryYears"],
      });
    }
  });

export type CollectivitySetupValues = z.infer<typeof collectivitySetupSchema>;
export type { CollectivitySetupData };
