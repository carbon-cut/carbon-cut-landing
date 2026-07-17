import { z } from "zod";

import type { CollectivitySetupData } from "./types";

const COLLECTIVITY_COUNTRY_OPTIONS = [
  { value: "TUN", label: "Tunisie" },
  { value: "SEN", label: "Sénégal" },
  { value: "FRA", label: "France" },
] as const;

export const latestCollectivityAvailableYear = new Date().getFullYear() - 1;

export const collectivityCountryOptions = [...COLLECTIVITY_COUNTRY_OPTIONS];
export const collectivityCountryCodes = collectivityCountryOptions.map(
  (option) => option.value
) as [
  (typeof collectivityCountryOptions)[number]["value"],
  ...(typeof collectivityCountryOptions)[number]["value"][],
];

export function getCollectivityCountryOptions() {
  return Promise.resolve(collectivityCountryOptions);
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
    country: z
      .string()
      .trim()
      .min(1, "Required")
      .refine(
        (value) =>
          collectivityCountryCodes.includes(value as (typeof collectivityCountryCodes)[number]),
        {
          message: "collectivityCountryInvalid",
        }
      ),
    territory: z.string().trim().min(1, "Required"),
    referenceYear: z.number({
      required_error: "Required",
      invalid_type_error: "Required",
    }),
    inventoryYears: z.array(z.number().int("collectivityInventoryYearInvalid")).min(1, "Required"),
    applicability: z.object({
      airport: z.boolean(),
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
  });

export type CollectivitySetupValues = z.infer<typeof collectivitySetupSchema>;
export type { CollectivitySetupData };
