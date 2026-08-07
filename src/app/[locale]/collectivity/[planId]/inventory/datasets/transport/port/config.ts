import React from "react";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
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
      label:
        key === "diesel"
          ? React.createElement(
              Typography,
              {
                variant: "label",
                size: "sm",
                className: "inline-flex items-center gap-1",
              },
              React.createElement("span", null, labelFunc(`fuelConsumption.fuels.${key}`)),
              React.createElement(FieldRequired, null)
            )
          : labelFunc(`fuelConsumption.fuels.${key}`),
      unit: units.fuelConsumption[key][0],
    }));
  }

  return electricityKeys.map((key) => ({
    key,
    label: labelFunc(`electricityConsumption.rows.${key}`),
    unit: units.electricityConsumption[key][0],
  }));
}
