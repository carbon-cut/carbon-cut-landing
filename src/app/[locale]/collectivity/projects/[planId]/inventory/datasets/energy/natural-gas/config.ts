import React from "react";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import { naturalGas, Sectors } from "../../../InventorySchema/energy/config";
import { sharedData } from "../../../InventorySchema/shared-data/config";
import type { InventoryTableColumn, InventoryTableRow } from "../../../types";
import type { YearMetricsColumn, YearMetricsRow } from "@/components/table/year-metrics/types";
import type { ScalarTableField } from "@/components/table/scalar/types";
import type { InventoryFormValues } from "../../../context/inventory-context";

type NaturalGasBlockKey = "lp" | "mp" | "hp";

export function buildNaturalGasRows(
  input: NaturalGasBlockKey,
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  switch (input) {
    case "lp":
    case "mp":
    case "hp":
      return naturalGas.rowKeys.map((key) => ({
        key,
        label: labelFunc(`rows.${key}`),
        unit: naturalGas.units.tensions[key][0],
      }));
    default:
      return [];
  }
}

export function buildNaturalGasColumns(
  input: NaturalGasBlockKey,
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableColumn[] {
  switch (input) {
    case "lp":
      return naturalGas.lpColumnKeys.map((key) => ({
        key,
        label: labelFunc(`lp.${key}`),
      }));
    case "mp":
      return naturalGas.mpColumnKeys.map((key) => ({
        key,
        label: labelFunc(`mp.${key}`),
      }));
    case "hp":
      return naturalGas.hpColumnKeys.map((key) => ({
        key,
        label: labelFunc(`hp.${key}`),
      }));
    default:
      return [];
  }
}

export type FixedLineKey =
  | keyof (typeof naturalGas.lines)["lp"]
  | keyof (typeof naturalGas.lines)["mp"]
  | keyof (typeof naturalGas.lines)["hp"];

export function buildNaturalGasFixedLines(
  block: NaturalGasBlockKey,
  labelFunc: (...args: [FixedLineKey, ...any]) => string,
  sectorLabelFunc: (...args: [Sectors, ...any]) => string
): YearMetricsColumn[] {
  return (
    Object.entries(naturalGas.lines[block]) as [
      FixedLineKey,
      { required: boolean; sector: Sectors },
    ][]
  ).map(([key, definition]) => ({
    key,
    label: labelFunc(key),
    required: definition.required === true,
    sector: definition.sector,
    metaLabel: sectorLabelFunc(definition.sector),
  }));
}

export function buildNaturalGasMetrics(
  labelFunc: (...args: [string, ...any]) => string
): YearMetricsRow[] {
  return naturalGas.rowKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: naturalGas.units.tensions[key][0],
  }));
}

export function buildNaturalGasPopulationRows(
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  return sharedData.population.metricKeys.map((key) => ({
    key,
    label: labelFunc(`population.${key}`),
    unit: sharedData.population.units.dataSet[key][0],
  }));
}

export function buildNaturalGasAssumptionFields(
  labelFunc: (...args: [string, ...any]) => string
): ScalarTableField<InventoryFormValues>[] {
  return [
    {
      key: "consumptionNorm",
      label: labelFunc("assumptions.consumptionNorm"),
      helper: labelFunc("assumptions.consumptionNormHelper"),
      valueName: "sharedData.householdEnergy.assumptions.consumptionNorm.value",
      unitName: "sharedData.householdEnergy.assumptions.consumptionNorm.unit",
      unit: sharedData.householdEnergy.units.assumptions.consumptionNorm[0],
    },
  ];
}

export function buildNaturalGasTitleWithRequirement(title: string, requirement: string) {
  return React.createElement(
    Typography,
    {
      variant: "sectionTitle",
      size: "lg",
      className: "inline-flex items-center gap-1",
    },
    React.createElement("span", null, title),
    React.createElement(FieldRequired, { content: requirement })
  );
}
