import {
  number,
  z,
  ZodAny,
  ZodEnum,
  ZodString,
  ZodUndefined,
  type ZodRawShape,
  type ZodTypeAny,
} from "zod";

type Year = `y-${number}${number}${number}${number}`;
const yearSchema = z.string().regex(/^y-\d{4}$/) as z.ZodType<Year>;
const currentYear = new Date().getFullYear();
export const futureYearSchema = yearSchema.refine(
  (value) => Number(value.slice(2)) >= currentYear,
  {
    message: "Year cannot be later than the current year",
  }
);

const numberSchema = z.coerce.number({ errorMap: () => ({ message: "Required" }) });

export const numberFutureSchema = z.record(futureYearSchema, numberSchema);

export const numberByYearSchema = z.record(yearSchema, numberSchema);
export const numberByYearOptionalSchema = z.record(yearSchema, numberSchema.optional());

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

const metadata = z
  .object({
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
  })
  .optional();

type NonEmptyStringArray = [string, ...string[]];

const normalizeUnitValue = (input: NonEmptyStringArray) => (value: unknown) =>
  value === undefined || value === null ? input[0] : value;

export const constructUnit = (input: NonEmptyStringArray) => {
  return z.preprocess(normalizeUnitValue(input), z.enum(input));
};

export function createScalarValueSchema(unit: NonEmptyStringArray, optional: boolean = false) {
  return z.object({
    value: optional ? numberSchema.optional() : numberSchema,
    unit: constructUnit(unit),
  });
}

export function createYearValueSchema(unit: NonEmptyStringArray, optional: boolean = false) {
  return z.object({
    value: optional ? numberByYearOptionalSchema : numberByYearSchema,
    unit: constructUnit(unit),
  });
}

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

export function createGridSchema(
  keys: readonly string[],
  nestedKeys: readonly string[],
  GridSchemaOptions: GridSchemaOptions,
  optional: boolean = false
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
                value: optional ? numberByYearOptionalSchema : numberByYearSchema,
                unit: constructUnit(unit ?? unitsByKeys?.[key] ?? unitsByCols![nestedKey]),
              }),
            ])
          )
        ),
      ])
    )
  );
}

export function createDynamicGridSchema(
  nestedKeys: readonly string[],
  GridSchemaOptions: GridSchemaOptions,
  optional: boolean = false
) {
  const { unit, unitsByCols } = GridSchemaOptions;

  return z.record(
    z.string(),
    z.object(
      Object.fromEntries(
        nestedKeys.map((nestedKey) => [
          nestedKey,
          z.object({
            value: optional ? numberByYearOptionalSchema : numberByYearSchema,
            unit: constructUnit(unit ?? unitsByCols![nestedKey]),
          }),
        ])
      )
    )
  );
}

export function createRecordGridSchema<RowFields extends ZodRawShape = Record<string, never>>(
  keys: readonly [string, ...string[]],
  nestedKeys: ZodString | ZodEnum<[string, ...string[]]>,
  GridSchemaOptions: RecordGridSchemaOptions,
  rowFields?: RowFields
) {
  const { unit, unitsByKeys } = GridSchemaOptions;

  return z.array(
    z.object({
      key: nestedKeys,
      ...(rowFields ?? {}),
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

function createRecordMatrix(
  keys: ZodString | ZodEnum<[string, ...string[]]>,
  MatrixSchemaOptions: MatrixSchemaOptions,
  type: ZodEnum<[string, ...string[]]> | ZodString | ZodUndefined = z.undefined()
) {
  const { unit, unitsByKeys } = MatrixSchemaOptions;
  const dynamicUnitSchema = unitsByKeys
    ? z
        .object({
          type: z.enum(Object.keys(unitsByKeys) as [string, ...string[]]),
          unit: z.string(),
          value: numberByYearSchema,
        })
        .superRefine((value, ctx) => {
          const validUnits = unitsByKeys[value.type];
          if (!validUnits.includes(value.unit)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["unit"],
              message: `Unit must match selected type (${validUnits.join(" or ")})`,
            });
          }
        })
    : undefined;

  return z.object({
    key: keys,
    value: unit
      ? z.object({
          value: numberByYearSchema,
          unit: constructUnit(unit),
          type,
        })
      : dynamicUnitSchema
        ? dynamicUnitSchema
        : z.object({}).strict(),
  });
}
export function createRecordMatrixSchema(
  keys: ZodString | ZodEnum<[string, ...string[]]>,
  MatrixSchemaOptions: MatrixSchemaOptions,
  type: ZodEnum<[string, ...string[]]> | ZodString | ZodUndefined = z.undefined()
) {
  return z.array(createRecordMatrix(keys, MatrixSchemaOptions, type));
}
export type RecordMatrixSchema = z.infer<ReturnType<typeof createRecordMatrixSchema>>;
export function createMatrixSchema(
  keys: readonly string[],
  MatrixSchemaOptions: MatrixSchemaOptions,
  optional: boolean = false,
  type: ZodEnum<[string, ...string[]]> | ZodString | ZodUndefined = z.undefined()
) {
  const { unit, unitsByKeys } = MatrixSchemaOptions;
  return z.object(
    Object.fromEntries(
      keys.map((key) => [
        key,
        z.object({
          value: optional ? numberByYearOptionalSchema : numberByYearSchema,
          type,
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
