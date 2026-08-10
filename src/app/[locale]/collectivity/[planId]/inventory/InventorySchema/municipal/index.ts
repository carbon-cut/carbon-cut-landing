import { createGroupSchema, metadata, createMatrixSchema, createGridSchema } from "../_shared";
import { z } from "zod";
import { fleet, publicLighting, buildings, treesParksWaste } from "./config";
export { municipalDefault } from "./default";

const fleetSchema = z.object({
  dataSet: z.object({
    vehicles: createMatrixSchema(fleet.carEngineKeys, { unit: fleet.units.vehicles.default }, true),
    consumption: createMatrixSchema(fleet.fuelKeys, { unitsByKeys: fleet.units.consumption }, true),
    spend: createMatrixSchema(fleet.fuelKeys, { unit: fleet.units.spend.default }, true),
    composition: createGridSchema(
      fleet.categoryKeys,
      fleet.carEngineKeys,
      {
        unit: fleet.units.composition.default,
      },
      true
    ),
  }),
  metadata: metadata,
});

const publicLightingSchema = z.object({
  dataSet: z.object({
    infrastructure: createMatrixSchema(
      publicLighting.infrastructureKeys,
      {
        unitsByKeys: publicLighting.units.infrastructure,
      },
      true
    ),
    lamps: createGridSchema(
      publicLighting.lampKeys,
      publicLighting.lampCols,
      {
        unitsByCols: publicLighting.units.lamps,
      },
      true
    ),
    yearly: createMatrixSchema(
      publicLighting.yearlyKeys,
      {
        unitsByKeys: publicLighting.units.yearly,
      },
      true
    ),
  }),
  metadata: metadata,
});

const buildingsSchema = z.object({
  dataSet: z.object({
    areas: createMatrixSchema(buildings.areaKeys, { unitsByKeys: buildings.units.areas }, true),
    consumption: createMatrixSchema(
      buildings.consumptionKeys,
      {
        unitsByKeys: buildings.units.consumption,
      },
      true
    ),
  }),
  metadata: metadata,
});

const optionalTreesParksWasteDestinationKeys = [
  "controlledLandfill",
  "uncontrolledLandfill",
] as const;
const optionalTreesParksWasteDestinationKeySet = new Set<string>(
  optionalTreesParksWasteDestinationKeys
);
const requiredTreesParksWasteYearlyKeys = treesParksWaste.yearlyKeys.filter(
  (key) => !optionalTreesParksWasteDestinationKeySet.has(key)
);

const treesParksWasteSchema = z.object({
  dataSet: createMatrixSchema(requiredTreesParksWasteYearlyKeys, {
    unitsByKeys: treesParksWaste.units.yearly,
  }).merge(
    createMatrixSchema(
      optionalTreesParksWasteDestinationKeys,
      {
        unitsByKeys: treesParksWaste.units.yearly,
      },
      true
    )
  ),
  metadata: metadata,
});

const municipalSchema = createGroupSchema({
  fleet: fleetSchema,
  publicLighting: publicLightingSchema,
  buildings: buildingsSchema,
  treesParksWaste: treesParksWasteSchema,
});

export { municipalSchema };
