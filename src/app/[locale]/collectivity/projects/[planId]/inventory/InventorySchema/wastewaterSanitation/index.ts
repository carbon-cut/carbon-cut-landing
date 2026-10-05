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

const treatmentSystemValues = [...wastewaterSanitation.treatmentSystemValues] as [
  (typeof wastewaterSanitation.treatmentSystemValues)[number],
  ...(typeof wastewaterSanitation.treatmentSystemValues)[number][],
];
const sludgeDestinationValues = [...wastewaterSanitation.sludgeDestinationKeys] as [
  (typeof wastewaterSanitation.sludgeDestinationKeys)[number],
  ...(typeof wastewaterSanitation.sludgeDestinationKeys)[number][],
];

function isPercentage(value: unknown) {
  return typeof value === "number" && value >= 0 && value <= 100;
}

const treatmentDischargeDataSetSchema = createRecordGridSchemaByOptionalKeys(
  wastewaterSanitation.treatmentValueKeys,
  z.enum(treatmentSystemValues),
  {
    unitsByKeys: wastewaterSanitation.units.organicLoad,
  },
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
  "system"
)
  .min(1, { message: "Required" })
  .superRefine((rows, ctx) => {
    rows.forEach((row, rowIndex) => {
      const isDirectDischarge = row.system === "aquaticDischarge";
      const loadKey = row.loadType as (typeof wastewaterSanitation.organicLoadKeys)[number];
      const sludgeRemovedKey = wastewaterSanitation.sludgeRemovedKeyByOrganicLoadKey[loadKey];
      const outgoingLoadKey = wastewaterSanitation.outgoingLoadKeyByOrganicLoadKey[loadKey];
      const loadValues = row.value[loadKey].value;
      const nitrogenValues = row.value.nitrogen.value;
      const populationAllocationValues = row.value.populationAllocation.value;
      const requiresSludgeRemoved = wastewaterSanitation.sludgeRemovedSystemValues.includes(
        row.system as (typeof wastewaterSanitation.sludgeRemovedSystemValues)[number]
      );
      const usesAutomaticEffluentDefault =
        wastewaterSanitation.automaticEffluentDefaultSystemValues.includes(
          row.system as (typeof wastewaterSanitation.automaticEffluentDefaultSystemValues)[number]
        );

      const hasIncomingLoad = Object.values(loadValues).some((value) => value !== undefined);
      const hasPopulationAllocation = Object.values(populationAllocationValues).some(
        (value) => value !== undefined
      );

      if (!hasIncomingLoad && (loadKey !== "domestic" || !hasPopulationAllocation)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [rowIndex, "value", loadKey, "value"],
          message: "Required",
        });
      }

      if (isDirectDischarge || row.dischargesToWater === "yes") {
        if (!row.receivingWater) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [rowIndex, "receivingWater"],
            message: "Required",
          });
        }
      }

      if (!isDirectDischarge && row.dischargesToWater === "yes" && !usesAutomaticEffluentDefault) {
        if (!row.effluentPath) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [rowIndex, "effluentPath"],
            message: "Required",
          });
        }

        if (row.effluentPath === "treatmentLevel" && !row.effluentTreatmentLevel) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [rowIndex, "effluentTreatmentLevel"],
            message: "Required",
          });
        }
      }

      Object.entries(loadValues).forEach(([year, value]) => {
        if (value === undefined) return;

        if (requiresSludgeRemoved && row.value[sludgeRemovedKey].value[year] === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [rowIndex, "value", sludgeRemovedKey, "value", year],
            message: "Required",
          });
        }

        if (
          !isDirectDischarge &&
          row.dischargesToWater === "yes" &&
          row.effluentPath === "measuredOutgoingLoad" &&
          row.value[outgoingLoadKey].value[year] === undefined
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [rowIndex, "value", outgoingLoadKey, "value", year],
            message: "Required",
          });
        }
      });

      Object.entries(populationAllocationValues).forEach(([year, value]) => {
        if (value === undefined || isPercentage(value)) return;

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [rowIndex, "value", "populationAllocation", "value", year],
          message: "between0And100",
        });
      });

      if (Object.values(nitrogenValues).some((value) => value !== undefined)) {
        if (row.system === "centralizedAerobic" && !row.biologicalTreatment) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [rowIndex, "biologicalTreatment"],
            message: "Required",
          });
        }

        if (
          (isDirectDischarge || row.dischargesToWater === "yes") &&
          !row.receivingWaterCondition
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [rowIndex, "receivingWaterCondition"],
            message: "Required",
          });
        }
      }
    });
  });

const treatmentDischargeSchema = z.object({
  dataSet: treatmentDischargeDataSetSchema,
  metadata,
});

const sludgeDestinationDataSetSchema = createRecordGridSchemaByOptionalKeys(
  wastewaterSanitation.sludgeValueKeys,
  z.enum(sludgeDestinationValues),
  {
    unitsByKeys: wastewaterSanitation.units.sludgeMass,
  },
  ["methaneRecovery", "nitrogenApplied"],
  {
    withinMunicipalBoundary: booleanSchema,
    sludgeType: z.string().optional(),
    climate: z.string().optional(),
    landfillSiteType: z.string().optional(),
    landfillIdentifier: z.string().optional(),
  },
  "destination"
).superRefine((rows, ctx) => {
  rows.forEach((row, rowIndex) => {
    if (row.destination !== "landfill") return;

    (["sludgeType", "climate", "landfillSiteType", "landfillIdentifier"] as const).forEach(
      (field) => {
        if (row[field]) return;

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [rowIndex, field],
          message: "Required",
        });
      }
    );
  });
});

const sludgeDestinationSchema = z.object({
  dataSet: sludgeDestinationDataSetSchema,
  metadata,
});

const populationFallbackDataSetSchema = z
  .object({
    utility: z.object({
      connectionPercentage: createYearValueSchema(
        wastewaterSanitation.units.populationFallback.connectionPercentage,
        true
      ),
      foodWasteToSewer: z.enum(wastewaterSanitation.yesNoValues),
    }),
  })
  .superRefine((dataSet, ctx) => {
    Object.entries(dataSet.utility.connectionPercentage.value).forEach(([year, value]) => {
      if (value === undefined || isPercentage(value)) return;

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["utility", "connectionPercentage", "value", year],
        message: "between0And100",
      });
    });
  });

const populationFallbackSchema = z.object({
  dataSet: populationFallbackDataSetSchema,
  metadata,
});

const wastewaterSanitationSchema = createGroupSchema({
  treatmentDischarge: treatmentDischargeSchema,
  sludgeDestination: sludgeDestinationSchema,
  populationFallback: populationFallbackSchema,
}).superRefine((data, ctx) => {
  const connectionPercentage = data.populationFallback.dataSet.utility.connectionPercentage.value;

  data.treatmentDischarge.dataSet.forEach((row) => {
    Object.entries(row.value.populationAllocation.value).forEach(([year, value]) => {
      if (
        value === undefined ||
        connectionPercentage[year as keyof typeof connectionPercentage] !== undefined
      )
        return;

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["populationFallback", "dataSet", "utility", "connectionPercentage", "value", year],
        message: "Required",
      });
    });
  });
});

export { wastewaterSanitationSchema };
