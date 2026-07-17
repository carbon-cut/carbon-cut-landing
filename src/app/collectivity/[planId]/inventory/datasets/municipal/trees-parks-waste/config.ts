import { treesParksWaste } from "../../../InventorySchema/municipal/config";
import type { InventoryTableRow } from "../../../types";

export function buildTreesParksWasteRows(labelFunc: (key: string) => string): InventoryTableRow[] {
  return treesParksWaste.yearlyKeys.map((key) => ({
    key,
    label: labelFunc(`yearly.${key}`),
    unit: treesParksWaste.units.yearly[key][0],
  }));
}
