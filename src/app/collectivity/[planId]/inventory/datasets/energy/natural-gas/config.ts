import { naturalGas } from "../../../InventorySchema/energy/config";
import type { InventoryTableColumn, InventoryTableRow } from "../../../types";

export function buildNaturalGasRows(
  input: "bp" | "mp" | "hp",
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
  input: "bp" | "mp" | "hp",
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
