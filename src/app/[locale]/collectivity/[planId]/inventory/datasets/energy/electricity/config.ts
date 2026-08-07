import React from "react";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import { electricity } from "../../../InventorySchema/energy/config";
import type { InventoryTableColumn, InventoryTableRow } from "../../../types";
import type { YearMetricsColumn, YearMetricsRow } from "@/components/table/year-metrics/types";

type ElectricityBlockKey = "lt" | "mt" | "ht";

export function buildElectricityRows(
  input: ElectricityBlockKey,
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  switch (input) {
    case "lt":
    case "mt":
    case "ht":
      return electricity.rowKeys.map((key) => ({
        key,
        label: labelFunc(`rows.${key}`),
        unit: electricity.units.tensions[key][0],
      }));
    default:
      return [];
  }
}

export function buildElectricityColumns(
  input: ElectricityBlockKey,
  labelFunc: (key: string) => string
): InventoryTableColumn[] {
  switch (input) {
    case "lt":
      return electricity.ltColumnKeys.map((key) => ({
        key,
        label: labelFunc(`lt.${key}`),
      }));
    case "mt":
      return electricity.mtColumnKeys.map((key) => ({
        key,
        label: labelFunc(`mt.${key}`),
      }));
    case "ht":
      return electricity.htColumnKeys.map((key) => ({
        key,
        label: labelFunc(`ht.${key}`),
      }));
    default:
      return [];
  }
}

export function buildElectricityFixedLines(
  block: ElectricityBlockKey,
  labelFunc: (key: string) => string,
  sectorLabelFunc: (sector: string) => string
): YearMetricsColumn[] {
  return Object.entries(electricity.lines[block]).map(([key, definition]) => ({
    key,
    label: labelFunc(`${block}.${key}`),
    required: definition.required === true,
    sector: definition.sector,
    metaLabel: sectorLabelFunc(definition.sector),
  }));
}

export function buildElectricityTitleWithRequirement(title: string, requirement: string) {
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

export function buildElectricityMetrics(labelFunc: (key: string) => string): YearMetricsRow[] {
  return electricity.rowKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: electricity.units.tensions[key][0],
  }));
}
