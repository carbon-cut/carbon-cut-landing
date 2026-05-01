import { createGroupSchema, datasetPlaceholderSchema } from "../_shared";
import { z } from "zod";

export const fleetFuelKeys = ["petrol", "diesel", "gpl", "electricity", "gnv"] as const;
export const fleetCarEngineKeys = [...fleetFuelKeys, "hybrid"] as const;
export const fleetCategoryKeys = ["service", "function", "serviceEngines", "other"] as const;
export type FleetFuelKey = (typeof fleetFuelKeys)[number];
export type FleetCarEngineKey = (typeof fleetCarEngineKeys)[number];
export type FleetCategoryKey = (typeof fleetCategoryKeys)[number];

const fleetFuelKeySchema = z.enum(fleetFuelKeys);
const fleetCategoryKeySchema = z.enum(fleetCategoryKeys);
type Year = `${number}${number}${number}${number}`;

const yearSchema = z.string().regex(/^\d{4}$/) as z.ZodType<Year>;

const numberByYearSchema = z.record(yearSchema, z.number());

const fleetSchema = z.object({
  vehicles: z.record(fleetFuelKeySchema, numberByYearSchema),
  consumption: z.record(fleetFuelKeySchema, numberByYearSchema),
  spend: z.record(fleetFuelKeySchema, numberByYearSchema),
  composition: z.record(fleetCategoryKeySchema, z.record(fleetFuelKeySchema, numberByYearSchema)),
});

const municipalSchema = createGroupSchema({
  fleet: fleetSchema,
  publicLighting: datasetPlaceholderSchema,
  buildings: datasetPlaceholderSchema,
  treesParksWaste: datasetPlaceholderSchema,
});

export { municipalSchema };
