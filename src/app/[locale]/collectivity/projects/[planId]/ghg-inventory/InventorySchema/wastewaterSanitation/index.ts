import { z } from "zod";

import {
  booleanSchema,
  createGroupSchema,
  createRecordGridSchemaByOptionalKeys,
  createYearValueSchema,
  metadata,
} from "../_shared";
import { wastewaterSanitation } from "./config";

export { wastewaterSanitationDefault } from "./default";
export {
  getWastewaterCalculationReadinessPaths,
  validateWastewaterCalculation,
  type WastewaterValidationIssue,
  type WastewaterValidationResult,
  type WastewaterValidationWarning,
} from "./validation";

const treatmentSystemValues = [...wastewaterSanitation.treatmentSystemValues] as [
  (typeof wastewaterSanitation.treatmentSystemValues)[number],
  ...(typeof wastewaterSanitation.treatmentSystemValues)[number][],
];
const sludgeDestinationValues = [...wastewaterSanitation.sludgeDestinationKeys] as [
  (typeof wastewaterSanitation.sludgeDestinationKeys)[number],
  ...(typeof wastewaterSanitation.sludgeDestinationKeys)[number][],
];

const treatmentDischargeDataSetSchema = createRecordGridSchemaByOptionalKeys(
  wastewaterSanitation.treatmentValueKeys,
  z.enum(treatmentSystemValues),
  { unitsByKeys: wastewaterSanitation.units.organicLoad },
  wastewaterSanitation.treatmentValueKeys,
  {
    loadType: z.enum(wastewaterSanitation.organicLoadKeys),
    withinMunicipalBoundary: booleanSchema,
    dischargesToWater: z.enum(wastewaterSanitation.yesNoValues).optional(),
    receivingWater: z.enum(wastewaterSanitation.receivingWaterValues).optional(),
    effluentPath: z.enum(wastewaterSanitation.effluentPathValues).optional(),
    effluentTreatmentLevel: z.enum(wastewaterSanitation.effluentTreatmentLevelValues).optional(),
    biologicalTreatment: z.enum(wastewaterSanitation.biologicalTreatmentValues).optional(),
    receivingWaterCondition: z.enum(wastewaterSanitation.receivingWaterConditionValues).optional(),
  },
  "system",
  wastewaterSanitation.treatmentValueKeys
);

const treatmentDischargeSchema = z.object({
  dataSet: treatmentDischargeDataSetSchema,
  metadata,
});

const sludgeDestinationDataSetSchema = createRecordGridSchemaByOptionalKeys(
  wastewaterSanitation.sludgeValueKeys,
  z.enum(sludgeDestinationValues),
  { unitsByKeys: wastewaterSanitation.units.sludgeMass },
  ["methaneRecovery", "nitrogenApplied"],
  {
    withinMunicipalBoundary: booleanSchema,
    sludgeType: z.enum(wastewaterSanitation.sludgeTypeValues).optional(),
    climate: z.enum(wastewaterSanitation.landfillClimateValues).optional(),
    landfillSiteType: z.enum(wastewaterSanitation.landfillSiteTypeValues).optional(),
    landfillIdentifier: z.string().trim().min(1).optional(),
  },
  "destination"
);

const landfillSiteSchema = z.object({
  landfillIdentifier: z.string().trim().min(1, { message: "Required" }),
  commissioningYear: z.coerce.number().int(),
  climate: z.enum(wastewaterSanitation.landfillClimateValues),
  landfillSiteType: z.enum(wastewaterSanitation.landfillSiteTypeValues),
  oxidationCover: z.enum(wastewaterSanitation.landfillOxidationCoverValues),
  disposalHistory: z.object({
    domestic: createYearValueSchema(["t wet sludge"], true),
    industrial: createYearValueSchema(["t wet sludge"], true),
  }),
  methaneRecovery: createYearValueSchema(["kg CH4"], true),
});

const sludgeDestinationSchema = z.object({
  dataSet: sludgeDestinationDataSetSchema,
  landfillSites: z.object({
    dataSet: z.array(landfillSiteSchema),
  }),
  metadata,
});

const populationFallbackDataSetSchema = z.object({
  utility: z.object({
    connectionPercentage: createYearValueSchema(
      wastewaterSanitation.units.populationFallback.connectionPercentage,
      true
    ),
    foodWasteToSewer: z.enum(wastewaterSanitation.yesNoValues),
  }),
});

const populationFallbackSchema = z.object({
  dataSet: populationFallbackDataSetSchema,
  metadata,
});

const wastewaterSanitationSchema = createGroupSchema({
  treatmentDischarge: treatmentDischargeSchema,
  sludgeDestination: sludgeDestinationSchema,
  populationFallback: populationFallbackSchema,
});

export { wastewaterSanitationSchema };
