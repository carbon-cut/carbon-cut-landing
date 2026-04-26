import { z } from "zod";

const inventoryYearSchema = z.coerce.number().int();
const inventoryYearsSchema = z.object({
  reference: inventoryYearSchema,
  comparisons: z.array(inventoryYearSchema).min(1),
});

const inventoryFamilySchema = z.object({
  key: z.string(),
  title: z.string(),
});

const inventoryDatasetSurfaceKindSchema = z.enum([
  "fleet",
  "publicLighting",
  "buildings",
  "treesParksWaste",
  "electricity",
  "photovoltaic",
  "naturalGas",
  "solarWaterHeating",
  "port",
  "publicTransport",
  "airTransport",
  "vehicleCounts",
  "perennialPlantationStock",
  "livestock",
  "fertilizers",
  "agriculturalProduction",
  "placeholder",
]);

const inventoryDatasetSchema = z.object({
  key: z.string(),
  familyKey: z.string(),
  surfaceKind: inventoryDatasetSurfaceKindSchema,
  title: z.string(),
  status: z.string(),
  description: z.string(),
  sourceMode: z.string(),
  yearMode: z.string(),
  implementationNote: z.string(),
});

const inventoryControlsSchema = z.object({
  familyLabel: z.string(),
  datasetLabel: z.string(),
});

const inventoryHintsSchema = z.object({
  sourceFirst: z.string(),
  multiYear: z.string(),
  todoLabel: z.string(),
  provenanceTodo: z.string(),
  progressTodo: z.string(),
  placeholderTitle: z.string(),
});

const inventoryWorkspaceConfigSchema = z.object({
  controls: inventoryControlsSchema,
  hints: inventoryHintsSchema,
  families: z.array(inventoryFamilySchema),
  datasets: z.array(inventoryDatasetSchema),
});

const inventoryTableRowSchema = z.object({
  key: z.string(),
  label: z.string(),
  values: z.array(z.string()),
});

const inventoryTableSectionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  columns: z.array(z.string()),
  rows: z.array(inventoryTableRowSchema),
  editableRows: z
    .object({
      addLabel: z.string(),
      rowLabelPrefix: z.string(),
      minRows: z.number().int().nonnegative().optional(),
      newRowValues: z.array(z.string()).optional(),
    })
    .optional(),
});

const inventoryColumnLabelSchema = z.object({
  key: z.string(),
  label: z.string(),
  calculated: z.literal("sum").optional(),
  editable: z.boolean().optional(),
  className: z.string().optional(),
});

const inventoryRowLabelSchema = z.object({
  key: z.string(),
  label: z.string(),
});

const inventoryYearBlockTableBlockSchema = z.object({
  key: z.string(),
  title: z.string(),
  columns: z.array(inventoryColumnLabelSchema),
  rows: z.array(inventoryRowLabelSchema),
  note: z.string().optional(),
  editableColumns: z.boolean().optional(),
});

const perennialPlantationStockRowSchema = z.object({
  plantType: z.string(),
  customName: z.string(),
  values: z.record(z.string(), z.record(z.string(), z.string())),
});

const perennialPlantationStockSchema = z.object({
  rows: z.array(perennialPlantationStockRowSchema).min(1),
});

const inventorySchema = z.object({
  years: inventoryYearsSchema,
  workspace: inventoryWorkspaceConfigSchema,
  tableSection: inventoryTableSectionSchema.optional(),
  yearBlockTable: inventoryYearBlockTableBlockSchema.optional(),
  perennialPlantationStock: perennialPlantationStockSchema.optional(),
});

export {
  inventoryColumnLabelSchema,
  inventoryDatasetSchema,
  inventoryFamilySchema,
  inventoryHintsSchema,
  inventoryRowLabelSchema,
  inventorySchema,
  inventoryTableRowSchema,
  inventoryTableSectionSchema,
  inventoryWorkspaceConfigSchema,
  inventoryYearsSchema,
  inventoryYearBlockTableBlockSchema,
  inventoryYearSchema,
  perennialPlantationStockRowSchema,
  perennialPlantationStockSchema,
};
