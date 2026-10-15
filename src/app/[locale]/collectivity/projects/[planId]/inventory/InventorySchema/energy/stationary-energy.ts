import { z } from "zod";

import { createYearValueSchema } from "../_shared";

type NonEmptyStringArray = [string, ...string[]];
type StationaryEnergyMetricDefinitions = Record<string, NonEmptyStringArray>;

export const stationaryEnergySectorValues = [
  "residential",
  "tertiary",
  "industry",
  "transport",
  "agriculture",
] as const;

export const stationaryEnergySectorSchema = z.enum(stationaryEnergySectorValues, {
  errorMap: () => ({ message: "Required" }),
});

export type StationaryEnergySector = (typeof stationaryEnergySectorValues)[number];

export type StationaryEnergyLineDefinitions = Record<
  string,
  {
    sector: StationaryEnergySector;
    required?: boolean;
  }
>;

type StationaryEnergyBlockSchemaOptions<FixedLines extends StationaryEnergyLineDefinitions> = {
  fixedLines: FixedLines;
  metrics: StationaryEnergyMetricDefinitions;
  optionalMetrics?: StationaryEnergyMetricDefinitions;
};

function createStationaryEnergyMetricShape(
  metrics: StationaryEnergyMetricDefinitions = {},
  optional = false
) {
  return Object.fromEntries(
    Object.entries(metrics).map(([key, unit]) => [key, createYearValueSchema(unit, optional)])
  );
}

export function createStationaryEnergyBlockSchema<
  FixedLines extends StationaryEnergyLineDefinitions,
>({ fixedLines, metrics, optionalMetrics }: StationaryEnergyBlockSchemaOptions<FixedLines>) {
  const metricShape = (optional: boolean = false) => ({
    ...createStationaryEnergyMetricShape(metrics, optional),
    ...createStationaryEnergyMetricShape(optionalMetrics, true),
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
          sector: stationaryEnergySectorSchema,
          ...metricShape(),
        })
      )
      .optional(),
  });
}
