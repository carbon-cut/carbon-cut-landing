import {
  fleetFuelKeys,
  fleetCategoryKeys,
  fleetCarEngineKeys,
} from "../../../InventorySchema/municipal";
import type { InventoryRowLabel } from "../../../types";

export function buildFleetCompositionColumns(labelFunc: (key: string) => string) {
  return fleetFuelKeys.map((key) => ({ key, label: labelFunc(`fuel.${key}`) }));
}

export function buildFleetRows(
  input: string,
  labelFunc: (key: string) => string
): InventoryRowLabel[] {
  switch (input) {
    case "category":
      return fleetCategoryKeys.map((key) => ({ key, label: labelFunc(`category.${key}`) }));
    case "fuel":
      return fleetFuelKeys.map((key) => ({ key, label: labelFunc(`fuel.${key}`) }));
    case "engine":
      return fleetCarEngineKeys.map((key) => ({ key, label: labelFunc(`engine.${key}`) }));
    default:
      return [];
  }
}
