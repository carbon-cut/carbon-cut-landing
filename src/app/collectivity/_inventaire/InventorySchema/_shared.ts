import { z, ZodAny, ZodEnum, ZodString, type ZodRawShape, type ZodTypeAny } from "zod";

type Year = `y-${number}${number}${number}${number}`;
const yearSchema = z.string().regex(/^y-\d{4}$/) as z.ZodType<Year>;
const numberByYearSchema = z.record(
  yearSchema,
  z.coerce.number({ errorMap: () => ({ message: "Required" }) })
);

export const metadataSourceTypeValues = [
  "invoice",
  "report",
  "excel",
  "manual",
  "estimate",
] as const;

export const metadataQualityStatusValues = [
  "missing",
  "provided",
  "estimated",
  "verified",
] as const;

export const metadataConfidenceValues = ["low", "medium", "high"] as const;

const metadata = z.object({
  source: z.object({
    organization: z.string().optional(),
    documentName: z.string().optional(),
    contactPerson: z.string().optional(),
    collectionDate: z.string().optional(),
    sourceType: z.enum(metadataSourceTypeValues).optional(),
    documents: z.array(z.instanceof(File)).optional(),
  }),
  quality: z.object({
    status: z.enum(metadataQualityStatusValues).optional(),
    confidence: z.enum(metadataConfidenceValues).optional(),
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
      unitsByCols?: never;
    }
  | {
      unit?: never;
      unitsByKeys: Record<string, NonEmptyStringArray>;
      unitsByCols?: never;
    };
type GridSchemaOptions =
  | MatrixSchemaOptions
  | {
      unit?: never;
      unitsByKeys?: never;
      unitsByCols: Record<string, NonEmptyStringArray>;
    };
type RecordGridSchemaOptions = MatrixSchemaOptions;

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

export function createGridSchema(
  keys: readonly string[],
  nestedKeys: readonly string[],
  GridSchemaOptions: GridSchemaOptions
) {
  const { unit, unitsByKeys, unitsByCols } = GridSchemaOptions;
  return z.object(
    Object.fromEntries(
      keys.map((key) => [
        key,
        z.object(
          Object.fromEntries(
            nestedKeys.map((nestedKey) => [
              nestedKey,
              z.object({
                value: numberByYearSchema,
                unit: constructUnit(unit ?? unitsByKeys?.[key] ?? unitsByCols![nestedKey]),
              }),
            ])
          )
        ),
      ])
    )
  );
}

export function createRecordGridSchema(
  keys: readonly [string, ...string[]],
  nestedKeys: ZodString | ZodEnum<[string, ...string[]]>,
  GridSchemaOptions: RecordGridSchemaOptions
) {
  const { unit, unitsByKeys } = GridSchemaOptions;

  return z.array(
    z.object({
      key: nestedKeys,
      value: z.object(
        Object.fromEntries(
          keys.map((key) => [
            key,
            z.object({
              value: numberByYearSchema,
              unit: constructUnit(unit ?? unitsByKeys?.[key]),
            }),
          ])
        )
      ),
    })
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
