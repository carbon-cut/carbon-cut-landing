import { z, type ZodRawShape, type ZodTypeAny } from "zod";

type Year = `${number}${number}${number}${number}`;
const yearSchema = z.string().regex(/^\d{4}$/) as z.ZodType<Year>;
const numberByYearSchema = z.record(yearSchema, z.number());

const metadata = z.object({
  source: z.object({
    organization: z.string().optional(),
    documentName: z.string().optional(),
    contactPerson: z.string().optional(),
    collectionDate: z.string().optional(),
    sourceType: z.enum(["invoice", "report", "excel", "manual", "estimate"]).optional(),
    documents: z.array(z.instanceof(File)).optional(),
  }),
  quality: z.object({
    status: z.enum(["missing", "provided", "estimated", "verified"]).optional(), // "missing" | "provided" | "estimated" | "verified";
    confidence: z.enum(["low", "medium", "high"]).optional(),
    comment: z.string().optional(),
  }),
});

const constructUnit = (input: [string, ...string[]]) => {
  return z.enum(input).default(input[0]);
};

type NonEmptyStringArray = [string, ...string[]];
type MatrixSchemaOptions =
  | {
      unit: NonEmptyStringArray;
      unitsByKeys?: never;
    }
  | {
      unit?: never;
      unitsByKeys: Record<string, NonEmptyStringArray>;
    };

export function createMatrixSchema(
  keys: readonly string[],
  MatrixSchemaOptions: MatrixSchemaOptions
) {
  const { unit, unitsByKeys } = MatrixSchemaOptions;
  return z.object(
    Object.fromEntries(
      keys.map((key) => [
        key,
        z.object({
          value: numberByYearSchema,
          unit: constructUnit(unit ?? unitsByKeys![key]),
        }),
      ])
    )
  );
}

function createGroupSchema<Shape extends ZodRawShape>(shape: Shape) {
  return z.object(shape).strict();
}

const datasetPlaceholderSchema = z.object({});

function createRepeatableRowGroupSchema<RowSchema extends ZodTypeAny>(rowSchema: RowSchema) {
  return z
    .object({
      rows: z.array(rowSchema).min(1),
    })
    .strict();
}

function createYearBlockSectionSchema<BlockSchema extends ZodTypeAny>(blockSchema: BlockSchema) {
  return z
    .object({
      blocks: z.array(blockSchema).min(1),
    })
    .strict();
}

export {
  createGroupSchema,
  createRepeatableRowGroupSchema,
  createYearBlockSectionSchema,
  datasetPlaceholderSchema,
  metadata,
};
