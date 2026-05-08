import { solarWaterHeating } from "../../../InventorySchema/energy/config";
import type { InventoryTableRow } from "../../../types";

export function buildSolarWaterHeatingRows(
  input: "residential" | "tertiary" | "industrial",
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  switch (input) {
    case "residential":
    case "tertiary":
    case "industrial":
      return solarWaterHeating.defaultRowKeys.map((key) => ({
        key,
        label: labelFunc(`${input}.${key}`),
        unit: solarWaterHeating.units.default[key][0],
      }));
    default:
      return [];
  }
}
