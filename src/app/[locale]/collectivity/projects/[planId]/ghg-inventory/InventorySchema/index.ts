import { z } from "zod";

import type {
  CollectivityProjectSnapshot,
  CollectivitySetupApplicability,
} from "@/app/[locale]/collectivity/projects/setup/_lib/types";
import { buildInventoryRegistry } from "../registry";

import { createGroupSchema } from "./_shared";
import { yearsSchema } from "./years";
import { municipalSchema } from "./municipal";
import { energySchema } from "./energy";
import { transportSchema } from "./transport";
import { afatSchema } from "./afat";
import { validateWastewaterCalculation, wastewaterSanitationSchema } from "./wastewaterSanitation";
import { wasteSchema } from "./waste";
import { priceAssumptionsSchema } from "./price-assumptions";
import { createSharedDataSchema, sharedDataSchema } from "./shared-data";

const inventorySchemaBase = createGroupSchema({
  years: yearsSchema,
  municipal: municipalSchema,
  energy: energySchema,
  transport: transportSchema,
  afat: afatSchema,
  wastewaterSanitation: wastewaterSanitationSchema,
  waste: wasteSchema,
  sharedData: sharedDataSchema.optional(),
  priceAssumptions: priceAssumptionsSchema.optional(),
});

const inventorySchema = inventorySchemaBase.superRefine((data, ctx) => {
  for (const issue of validateWastewaterCalculation(data).issues) {
    ctx.addIssue({
      code: "custom",
      path: issue.path,
      message: issue.message,
    });
  }
});

const inventoryInputSchema = inventorySchemaBase.omit({
  years: true,
});

function selectDatasetSchemas(
  groupSchema: z.ZodObject<z.ZodRawShape>,
  activeDatasetKeys: ReadonlySet<string>
) {
  const entries = Object.entries(groupSchema.shape);

  if (!entries.some(([key]) => activeDatasetKeys.has(key))) {
    return z.unknown().optional();
  }

  return z
    .object(
      Object.fromEntries(
        entries.map(([key, schema]) => [
          key,
          activeDatasetKeys.has(key) ? schema : z.unknown().optional(),
        ])
      )
    )
    .strict();
}

export type InventorySchemaContext = {
  perimeter: CollectivityProjectSnapshot["perimeter"];
  applicability: CollectivitySetupApplicability | null;
};

export function createInventorySchema({ perimeter, applicability }: InventorySchemaContext) {
  const { workspace } = buildInventoryRegistry(applicability, perimeter);
  const activeDatasetKeys = new Set(workspace.datasets.map((dataset) => dataset.key));
  const isWholeTerritory = perimeter === "territorial_communes";
  const selectedSchema = inventorySchemaBase.extend({
    municipal: selectDatasetSchemas(municipalSchema, activeDatasetKeys),
    energy: selectDatasetSchemas(energySchema, activeDatasetKeys),
    transport: selectDatasetSchemas(transportSchema, activeDatasetKeys),
    afat: selectDatasetSchemas(afatSchema, activeDatasetKeys),
    wastewaterSanitation: selectDatasetSchemas(wastewaterSanitationSchema, activeDatasetKeys),
    waste: isWholeTerritory ? wasteSchema : z.unknown().optional(),
    sharedData: createSharedDataSchema(perimeter),
    priceAssumptions: isWholeTerritory ? priceAssumptionsSchema.optional() : z.unknown().optional(),
  });

  if (!activeDatasetKeys.has("wastewaterTreatment")) {
    return selectedSchema;
  }

  return selectedSchema.superRefine((data, ctx) => {
    for (const issue of validateWastewaterCalculation(data as z.infer<typeof inventorySchemaBase>)
      .issues) {
      ctx.addIssue({ code: "custom", path: issue.path, message: issue.message });
    }
  });
}

export { inventorySchema, inventoryInputSchema };
