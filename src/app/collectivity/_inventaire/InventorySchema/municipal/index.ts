import {
  createGroupSchema,
  datasetPlaceholderSchema,
  metadata,
  createMatrixSchema,
} from "../_shared";
import { z } from "zod";
import { fleetUnits, fleetFuelKeys, fleetCategoryKeys, fleetCarEngineKeys } from "./config";

const fleetSchema = z.object({
  dataSet: z.object({
    vehicles: createMatrixSchema(fleetCarEngineKeys, { unit: fleetUnits.vehicles.default }),
    consumption: createMatrixSchema(fleetFuelKeys, { unitsByKeys: fleetUnits.consumption }),
    spend: createMatrixSchema(fleetFuelKeys, { unit: fleetUnits.spend.default }),
    composition: createMatrixSchema(fleetCategoryKeys, { unit: fleetUnits.composition.default }),
  }),
  metadata: metadata,
});

const municipalSchema = createGroupSchema({
  fleet: fleetSchema,
  publicLighting: datasetPlaceholderSchema,
  buildings: datasetPlaceholderSchema,
  treesParksWaste: datasetPlaceholderSchema,
});

export { municipalSchema };
