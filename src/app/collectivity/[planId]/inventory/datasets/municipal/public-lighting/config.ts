import build from "next/dist/build";
import { publicLighting } from "../../../InventorySchema/municipal/config";
import type { InventoryTableRow, InventoryTableColumn } from "../../../types";

export function buildPublicLightingRows(
  input: string,
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  switch (input) {
    case "infrastructure":
      return publicLighting.infrastructureKeys.map((key) => ({
        key,
        label: labelFunc(`infrastructure.${key}`),
        unit: publicLighting.units.infrastructure[key][0],
      }));
    case "lamps":
      return publicLighting.lampKeys.map((key) => ({
        key,
        label: labelFunc(`lamps.${key}`),
        unit: "",
      }));
    case "yearly":
      return publicLighting.yearlyKeys.map((key) => ({
        key,
        label: labelFunc(`yearly.${key}`),
        unit: publicLighting.units.yearly[key][0],
      }));
    default:
      return [];
  }
}

export function buildPublicLightingColumns(
  input: "lamps",
  labelFunc: (key: string) => string
): InventoryTableColumn[] {
  return publicLighting.lampCols.map((key) => ({
    key,
    label: labelFunc(`lampColumns.${key}`),
    unit: publicLighting.units.lamps[key][0],
  }));
}
