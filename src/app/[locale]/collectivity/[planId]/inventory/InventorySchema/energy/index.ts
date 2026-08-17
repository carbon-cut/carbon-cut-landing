import { z } from "zod";

import { createGroupSchema, createMatrixSchema, metadata } from "../_shared";
import { electricity, naturalGas } from "./config";
import { createTerritorialEnergyBlockSchema } from "./territorial-energy";
export { energyDefault } from "./default";
export {
  energyCatalog,
  energyDatasetKeys,
  getEnergyDatasetFieldCatalog,
  resolveEnergyAIField,
  type EnergyDatasetKey,
} from "./catalog";

const electricitySchema = z.object({
  dataSet: z.object({
    lt: createTerritorialEnergyBlockSchema({
      fixedLines: electricity.lines.lt,
      metrics: {
        consumption: electricity.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: electricity.units.tensions.subscribers,
      },
    }),
    mt: createTerritorialEnergyBlockSchema({
      fixedLines: electricity.lines.mt,
      metrics: {
        consumption: electricity.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: electricity.units.tensions.subscribers,
      },
    }),
    ht: createTerritorialEnergyBlockSchema({
      fixedLines: electricity.lines.ht,
      metrics: {
        consumption: electricity.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: electricity.units.tensions.subscribers,
      },
    }),
  }),
  metadata,
});

const naturalGasSchema = z.object({
  dataSet: z.object({
    lp: createTerritorialEnergyBlockSchema({
      fixedLines: naturalGas.lines.lp,
      metrics: {
        consumption: naturalGas.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: naturalGas.units.tensions.subscribers,
      },
    }),
    mp: createTerritorialEnergyBlockSchema({
      fixedLines: naturalGas.lines.mp,
      metrics: {
        consumption: naturalGas.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: naturalGas.units.tensions.subscribers,
      },
    }),
    hp: createTerritorialEnergyBlockSchema({
      fixedLines: naturalGas.lines.hp,
      metrics: {
        consumption: naturalGas.units.tensions.consumption,
      },
      optionalMetrics: {
        subscribers: naturalGas.units.tensions.subscribers,
      },
    }),
  }),
  metadata,
});

const energySchema = createGroupSchema({
  electricity: electricitySchema,
  naturalGas: naturalGasSchema,
});

export { energySchema };
