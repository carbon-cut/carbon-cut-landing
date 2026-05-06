import { electricity } from "../../../InventorySchema/energy/config";
import type { InventoryTableColumn, InventoryTableRow } from "../../../types";

export function buildElectricityRows(
  input: "lt" | "mt" | "ht",
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
  input: "lt" | "mt" | "ht",
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
