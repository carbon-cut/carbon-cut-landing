import { createGroupSchema, metadata, createMatrixSchema, createGridSchema } from "../_shared";
import { z } from "zod";
import { fleet, publicLighting, buildings, treesParksWaste } from "./config";

const fleetSchema = z.object({
  dataSet: z.object({
    vehicles: createMatrixSchema(fleet.carEngineKeys, { unit: fleet.units.vehicles.default }),
    consumption: createMatrixSchema(fleet.fuelKeys, { unitsByKeys: fleet.units.consumption }),
    spend: createMatrixSchema(fleet.fuelKeys, { unit: fleet.units.spend.default }),
    composition: createGridSchema(fleet.categoryKeys, fleet.carEngineKeys, {
      unit: fleet.units.composition.default,
    }),
  }),
  metadata: metadata,
});

const publicLightingSchema = z.object({
  dataSet: z.object({
    infrastructure: createMatrixSchema(publicLighting.infrastructureKeys, {
      unitsByKeys: publicLighting.units.infrastructure,
    }),
    lamps: createGridSchema(publicLighting.lampKeys, publicLighting.lampCols, {
      unitsByCols: publicLighting.units.lamps,
    }),
    yearly: createMatrixSchema(publicLighting.yearlyKeys, {
      unitsByKeys: publicLighting.units.yearly,
    }),
  }),
  metadata: metadata,
});

const buildingsSchema = z.object({
  dataSet: z.object({
    areas: createMatrixSchema(buildings.areaKeys, { unitsByKeys: buildings.units.areas }),
    consumption: createMatrixSchema(buildings.consumptionKeys, {
      unitsByKeys: buildings.units.consumption,
    }),
  }),
  metadata: metadata,
});

const treesParksWasteSchema = z.object({
  dataSet: createMatrixSchema(treesParksWaste.yearlyKeys, {
    unitsByKeys: treesParksWaste.units.yearly,
  }),
  metadata: metadata,
});

const municipalSchema = createGroupSchema({
  fleet: fleetSchema,
  publicLighting: publicLightingSchema,
  buildings: buildingsSchema,
  treesParksWaste: treesParksWasteSchema,
});

export { municipalSchema };
