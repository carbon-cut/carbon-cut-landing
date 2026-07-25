import { buildings } from "../../../InventorySchema/municipal/config";
import type { InventoryTableRow } from "../../../types";

export function buildBuildingsRows(
  input: "areas" | "consumption" | "priceAssumptions",
  labelFunc: (key: string) => string
): InventoryTableRow[] {
  switch (input) {
    case "areas":
      return buildings.areaKeys.map((key) => ({
        key,
        label: labelFunc(`areas.${key}`),
        unit: buildings.units.areas[key][0],
      }));
    case "consumption":
      return buildings.consumptionKeys.map((key) => ({
        key,
        label: labelFunc(`consumption.${key}`),
        unit: buildings.units.consumption[key][0],
      }));
    case "priceAssumptions":
      return [
        {
          key: "electricity",
          label: labelFunc("priceAssumptions.electricity"),
          unit: "currency/kWh",
        },
        {
          key: "naturalGas",
          label: labelFunc("priceAssumptions.naturalGas"),
          unit: "currency/Nm3",
        },
        {
          key: "diesel",
          label: labelFunc("priceAssumptions.diesel"),
          unit: "currency/L",
        },
      ];
    default:
      return [];
  }
}
