import { photovoltaic } from "../../../InventorySchema/energy/config";
import type { InventoryTableRow } from "../../../types";

export function buildPhotovoltaicRows(
  input: "bt" | "mt",
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  switch (input) {
    case "bt":
      return photovoltaic.btRowKeys.map((key) => ({
        key,
        label: labelFunc(`bt.${key}`),
        unit: photovoltaic.units.tension[key][0],
      }));
    case "mt":
      return photovoltaic.mtRowKeys.map((key) => ({
        key,
        label: labelFunc(`mt.${key}`),
        unit: photovoltaic.units.tension[key][0],
      }));
    default:
      return [];
  }
}
