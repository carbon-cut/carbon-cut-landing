import { naturalGas } from "../../../InventorySchema/energy/config";
import { sharedData } from "../../../InventorySchema/shared-data/config";
import type { InventoryTableColumn, InventoryTableRow } from "../../../types";
import type { YearMetricsColumn, YearMetricsRow } from "@/components/table/year-metrics/types";
import type { ScalarTableField } from "@/components/table/scalar/types";
import type { InventoryFormValues } from "../../../context/inventory-context";

type NaturalGasBlockKey = "bp" | "mp" | "hp";

export function buildNaturalGasRows(
  input: NaturalGasBlockKey,
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  switch (input) {
    case "bp":
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
  labelFunc: (key: string) => string
): InventoryTableColumn[] {
  switch (input) {
    case "bp":
      return naturalGas.bpColumnKeys.map((key) => ({
        key,
        label: labelFunc(`bp.${key}`),
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

export function buildNaturalGasFixedLines(
  block: NaturalGasBlockKey,
  labelFunc: (key: string) => string,
  sectorLabelFunc: (sector: string) => string
): YearMetricsColumn[] {
  return Object.entries(naturalGas.lines[block]).map(([key, definition]) => ({
    key,
    label: labelFunc(key),
    sector: definition.sector,
    metaLabel: sectorLabelFunc(definition.sector),
  }));
}

export function buildNaturalGasMetrics(labelFunc: (key: string) => string): YearMetricsRow[] {
  return naturalGas.rowKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: naturalGas.units.tensions[key][0],
  }));
}

export function buildNaturalGasPopulationRows(
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  return sharedData.population.metricKeys.map((key) => ({
    key,
    label: labelFunc(`population.${key}`),
    unit: sharedData.population.units.dataSet[key][0],
  }));
}

export function buildNaturalGasAssumptionFields(
  labelFunc: (key: string) => string
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
