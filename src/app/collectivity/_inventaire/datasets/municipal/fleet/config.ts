import {
  fleetFuelKeys,
  fleetCategoryKeys,
  fleetCarEngineKeys,
  fleetUnits,
} from "../../../InventorySchema/municipal/config";
import type { InventoryTableRow } from "../../../types";

export function buildFleetCompositionColumns(labelFunc: (key: string) => string) {
  return fleetFuelKeys.map((key) => ({ key, label: labelFunc(`fuel.${key}`) }));
}

export function buildFleetRows(
  input: string,
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  switch (input) {
    case "category":
      return fleetCategoryKeys.map((key) => ({
        key,
        label: labelFunc(`category.${key}`),
        unit: fleetUnits.composition.default[0],
      }));
    case "fuel":
      return fleetFuelKeys.map((key) => ({
        key,
        label: labelFunc(`fuel.${key}`),
        unit: fleetUnits.consumption[key][0],
      }));
    case "engine":
      return fleetCarEngineKeys.map((key) => ({
        key,
        label: labelFunc(`engine.${key}`),
        unit: fleetUnits.vehicles.default[0],
      }));
    default:
      return [];
  }
}
