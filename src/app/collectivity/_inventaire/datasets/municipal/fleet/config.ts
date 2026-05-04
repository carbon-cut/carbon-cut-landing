import { fleet } from "../../../InventorySchema/municipal/config";
import type { InventoryTableRow } from "../../../types";

export function buildFleetRows(
  input: string,
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  switch (input) {
    case "category":
      return fleet.categoryKeys.map((key) => ({
        key,
        label: labelFunc(`category.${key}`),
        unit: fleet.units.composition.default[0],
      }));
    case "fuel":
      return fleet.fuelKeys.map((key) => ({
        key,
        label: labelFunc(`fuel.${key}`),
        unit: fleet.units.consumption[key][0],
      }));
    case "engine":
      return fleet.carEngineKeys.map((key) => ({
        key,
        label: labelFunc(`engine.${key}`),
        unit: fleet.units.vehicles.default[0],
      }));
    case "spend":
      return fleet.fuelKeys.map((key) => ({
        key,
        label: labelFunc(`fuel.${key}`),
        unit: fleet.units.spend.default[0],
      }));
    default:
      return [];
  }
}
