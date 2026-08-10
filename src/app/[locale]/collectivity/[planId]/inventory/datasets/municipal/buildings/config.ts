import React from "react";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import { buildings } from "../../../InventorySchema/municipal/config";
import type { InventoryTableRow } from "../../../types";

export function buildBuildingsRows(
  input: "areas" | "consumption",
  labelFunc: (...args: [string, ...any]) => string
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
        label:
          key === "electricityConsumption"
            ? React.createElement(
                Typography,
                {
                  variant: "label",
                  size: "sm",
                  className: "inline-flex items-center gap-1",
                },
                React.createElement("span", null, labelFunc(`consumption.${key}`)),
                React.createElement(FieldRequired, {
                  content: labelFunc("consumptionRequirementTooltip"),
                })
              )
            : labelFunc(`consumption.${key}`),
        unit: buildings.units.consumption[key][0],
      }));
    default:
      return [];
  }
}
