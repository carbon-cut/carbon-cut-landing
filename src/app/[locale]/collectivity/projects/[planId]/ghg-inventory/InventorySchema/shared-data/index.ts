import { z } from "zod";
import type { CollectivityProjectSnapshot } from "@/app/[locale]/collectivity/projects/setup/_lib/types";

import {
  createGroupSchema,
  createMatrixSchema,
  createScalarValueSchema,
  metadata,
} from "../_shared";
import { sharedData } from "./config";
export { sharedDataDefault } from "./default";

const populationSchema = z.object({
  dataSet: createMatrixSchema(sharedData.population.metricKeys, {
    unitsByKeys: sharedData.population.units.dataSet,
  }),
  metadata,
});

const householdEnergySchema = z.object({
  assumptions: z.object({
    consumptionNorm: createScalarValueSchema(
      sharedData.householdEnergy.units.assumptions.consumptionNorm
    ),
  }),
});

const sharedDataSchema = createGroupSchema({
  population: populationSchema,
  householdEnergy: householdEnergySchema,
});

export function createSharedDataSchema(perimeter: CollectivityProjectSnapshot["perimeter"]) {
  return perimeter === "territorial_communes"
    ? sharedDataSchema
    : sharedDataSchema.extend({ householdEnergy: z.unknown().optional() });
}

export { sharedDataSchema };
