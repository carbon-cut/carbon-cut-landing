import { port } from "../../../InventorySchema/transport/config";
import type { InventoryTableRow } from "../../../types";

const { electricityKeys, fuelKeys, units } = port;

export function buildPortRows(
  input: "electricityConsumption" | "fuelConsumption",
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  if (input === "fuelConsumption") {
    return fuelKeys.map((key) => ({
      key,
      label: labelFunc(`fuelConsumption.fuels.${key}`),
      unit: units.fuelConsumption[key][0],
    }));
  }

  return electricityKeys.map((key) => ({
    key,
    label: labelFunc(`electricityConsumption.rows.${key}`),
    unit: units.electricityConsumption[key][0],
  }));
}
