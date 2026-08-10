import React from "react";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import { airTransport } from "../../../InventorySchema/transport/config";
import type { InventoryGroupedYearTableData, InventoryTableRow } from "../../../types";

export function buildAirTransportMovementSection(
  rows: InventoryTableRow[],
  labelFunc: (...args: [string, ...any]) => string
): InventoryGroupedYearTableData {
  return {
    title: React.createElement(
      Typography,
      {
        variant: "sectionTitle",
        size: "lg",
        className: "inline-flex items-center gap-1",
      },
      React.createElement("span", null, labelFunc("movements.title")),
      React.createElement(FieldRequired, {
        content: labelFunc("movements.requirementTooltip"),
      })
    ),
    description: labelFunc("movements.description"),
    subcolumns: airTransport.movementColumnKeys.map((key) => ({
      key,
      label: labelFunc(`movements.columns.${key}`),
      unit: airTransport.units.movements.default[0],
    })),
    rows,
  };
}

export function buildAirTransportEnergyRows(
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  return airTransport.energyKeys.map((key) => ({
    key,
    label: labelFunc(`energy.${key}`),
    unit: airTransport.units.energy[key][0],
  }));
}
