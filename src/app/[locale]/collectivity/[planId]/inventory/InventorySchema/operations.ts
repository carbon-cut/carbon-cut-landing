import { z } from "zod";

import { getAIFieldDimensionKind, type AIFieldDefinition, type AIFieldDimension } from "./_shared";

const confidenceSchema = z.enum(["low", "medium", "high"]);

const evidenceSchema = z
  .object({
    filename: z.string().min(1).max(512),
    section: z.string().min(1).max(512).optional(),
    row: z.number().int().nonnegative().optional(),
    column: z.string().min(1).max(64).optional(),
    cell: z.string().min(1).max(64).optional(),
    excerpt: z.string().min(1).max(2_000).optional(),
  })
  .strict();

const dimensionValueSchema = z.union([z.string().min(1).max(256), z.number().finite()]);

const aiFormOperationBaseSchema = z
  .object({
    type: z.literal("setField"),
    fieldId: z.string().min(1).max(256),
    dimensions: z.record(dimensionValueSchema),
    value: z.union([z.number().finite(), z.string().min(1).max(4_000)]),
    unit: z.string().min(1).max(128).nullable(),
    confidence: confidenceSchema.optional(),
    evidence: z.array(evidenceSchema).max(32).optional(),
  })
  .strict();

export type AIFormOperation = z.infer<typeof aiFormOperationBaseSchema>;

function addIssue(ctx: z.RefinementCtx, path: (string | number)[], message: string) {
  ctx.addIssue({ code: z.ZodIssueCode.custom, path, message });
}

function validateDimension(
  dimension: AIFieldDimension,
  value: string | number,
  ctx: z.RefinementCtx
) {
  const kind = getAIFieldDimensionKind(dimension);

  if (kind === "year" || kind === "integer") {
    if (typeof value !== "number" || !Number.isInteger(value)) {
      addIssue(ctx, ["dimensions", dimension.key], "Expected an integer");
    }
    return;
  }

  if (typeof value !== "string") {
    addIssue(ctx, ["dimensions", dimension.key], "Expected a string");
    return;
  }

  if (kind === "enum" && !dimension.allowedValues?.includes(value)) {
    addIssue(ctx, ["dimensions", dimension.key], "Unsupported value");
  }
}

function resolveExpectedUnit(
  field: AIFieldDefinition,
  dimensions: Record<string, string | number>
) {
  for (const [dimensionKey, units] of Object.entries(field.unitByDimension ?? {})) {
    const dimensionValue = dimensions[dimensionKey];

    if (typeof dimensionValue === "string" && units[dimensionValue] !== undefined) {
      return units[dimensionValue];
    }
  }

  return field.expectedUnit;
}

function isExpectedUnit(unit: string | null, expectedUnit: string | readonly string[] | null) {
  if (expectedUnit === null) {
    return unit === null;
  }

  return typeof expectedUnit === "string"
    ? unit === expectedUnit
    : unit !== null && expectedUnit.includes(unit);
}

export function createAIFormOperationSchema(catalog: readonly AIFieldDefinition[]) {
  const fieldsById = new Map(catalog.map((field) => [field.id, field]));

  return aiFormOperationBaseSchema.superRefine((operation, ctx) => {
    const field = fieldsById.get(operation.fieldId);

    if (!field) {
      addIssue(ctx, ["fieldId"], "Unknown field");
      return;
    }

    const expectedDimensions = new Set(field.dimensions.map((dimension) => dimension.key));

    for (const dimension of field.dimensions) {
      const value = operation.dimensions[dimension.key];

      if (value === undefined) {
        addIssue(ctx, ["dimensions", dimension.key], "Required");
        continue;
      }

      validateDimension(dimension, value, ctx);
    }

    for (const key of Object.keys(operation.dimensions)) {
      if (!expectedDimensions.has(key)) {
        addIssue(ctx, ["dimensions", key], "Unsupported dimension");
      }
    }

    if (typeof operation.value !== field.valueType) {
      addIssue(ctx, ["value"], `Expected a ${field.valueType}`);
    }

    const expectedUnit = resolveExpectedUnit(field, operation.dimensions);

    if (!isExpectedUnit(operation.unit, expectedUnit)) {
      addIssue(ctx, ["unit"], "Unsupported unit");
    }
  });
}
