import { naturalGas } from "../../../InventorySchema/energy/config";
import type { InventoryTableColumn, InventoryTableRow } from "../../../types";
import type { YearMetricsColumn, YearMetricsRow } from "@/components/table/year-metrics/types";

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
    label: labelFunc(`${block}.${key}`),
    metaLabel: sectorLabelFunc(definition.sector),
  }));
}

export function buildNaturalGasMetrics(
  labelFunc: (key: string) => string
): YearMetricsRow[] {
  return naturalGas.rowKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: naturalGas.units.tensions[key][0],
  }));
}
