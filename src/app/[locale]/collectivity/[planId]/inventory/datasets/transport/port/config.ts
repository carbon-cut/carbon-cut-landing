import { port } from "../../../InventorySchema/transport/config";
import type { InventoryTableRow } from "../../../types";

const { electricityKeys, fuelKeys, units } = port;

export function buildPortRows(
  input: "electricityConsumption" | "fuel",
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  if (input === "fuel") {
    return fuelKeys.map((key) => ({
      key,
      label: labelFunc(`fuel.${key}`),
      unit: units.fuelConsumption[key][0],
    }));
  }

  return electricityKeys.map((key) => ({
    key,
    label: labelFunc(`electricityConsumption.rows.${key}`),
    unit: units.electricityConsumption[key][0],
  }));
}
