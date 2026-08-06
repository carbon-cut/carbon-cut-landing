import { z } from "zod";

import { createYearValueSchema } from "../_shared";

type NonEmptyStringArray = [string, ...string[]];
type TerritorialEnergyMetricDefinitions = Record<string, NonEmptyStringArray>;

export const territorialEnergySectorValues = [
  "residential",
  "tertiary",
  "industry",
  "transport",
  "agriculture",
] as const;

export const territorialEnergySectorSchema = z.enum(territorialEnergySectorValues, {
  errorMap: () => ({ message: "Required" }),
});

export type TerritorialEnergySector = (typeof territorialEnergySectorValues)[number];

export type TerritorialEnergyLineDefinitions = Record<
  string,
  {
    sector: TerritorialEnergySector;
    required?: boolean;
  }
>;

type TerritorialEnergyBlockSchemaOptions<FixedLines extends TerritorialEnergyLineDefinitions> = {
  fixedLines: FixedLines;
  metrics: TerritorialEnergyMetricDefinitions;
  optionalMetrics?: TerritorialEnergyMetricDefinitions;
};

function createTerritorialEnergyMetricShape(
  metrics: TerritorialEnergyMetricDefinitions = {},
  optional = false
) {
  return Object.fromEntries(
    Object.entries(metrics).map(([key, unit]) => [key, createYearValueSchema(unit, optional)])
  );
}

export function createTerritorialEnergyBlockSchema<
  FixedLines extends TerritorialEnergyLineDefinitions,
>({ fixedLines, metrics, optionalMetrics }: TerritorialEnergyBlockSchemaOptions<FixedLines>) {
  const metricShape = (optional: boolean = false) => ({
    ...createTerritorialEnergyMetricShape(metrics, optional),
    ...createTerritorialEnergyMetricShape(optionalMetrics, true),
  });

  return z.object({
    fixed: z.object(
      Object.fromEntries(
        Object.entries(fixedLines).map(([key, definition]) => {
          const lineSchema = z.object({
            sector: z.literal(definition.sector),
            ...metricShape(!definition.required),
          });

          return [key, definition.required ? lineSchema : lineSchema.optional()];
        })
      )
    ),
    custom: z
      .array(
        z.object({
          label: z.string().min(1, "Required"),
          sector: territorialEnergySectorSchema,
          ...metricShape(),
        })
      )
      .optional(),
  });
}
