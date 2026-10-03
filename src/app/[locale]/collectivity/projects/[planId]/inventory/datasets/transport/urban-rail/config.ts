import React from "react";

import { FieldHelp } from "@/components/ui/field-help";
import type { InventoryTableRow } from "../../../types";
import type { InventoryGroupedYearTableData } from "../../../types";
import { urbanRail } from "../../../InventorySchema/transport/config";

function createMatrixBranch<TKeys extends readonly string[]>(
  keys: TKeys,
  unitByKey: (key: TKeys[number]) => string
) {
  return Object.fromEntries(
    keys.map((key) => [
      key,
      {
        value: {},
        unit: unitByKey(key),
      },
    ])
  );
}

export function buildUrbanRailEnergyRows(
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  return urbanRail.energyKeys.map((key) => ({
    key,
    label:
      key === "electricity"
        ? React.createElement(
            "span",
            { className: "inline-flex items-center gap-1" },
            labelFunc(`energy.${key}`),
            React.createElement(FieldHelp, {
              content: labelFunc("energy.electricityHelp"),
              srLabel: labelFunc("energy.electricityHelpLabel"),
            })
          )
        : labelFunc(`energy.${key}`),
    unit: urbanRail.units.energy[key][0],
  }));
}

export function buildUrbanRailEnergySection(
  labelFunc: (...args: [string, ...any]) => string
): InventoryGroupedYearTableData {
  return {
    title: labelFunc("energy.title"),
    rows: buildUrbanRailEnergyRows(labelFunc),
    subcolumns: [
      { key: "energy", label: labelFunc("energy.consumption") },
      {
        key: "spend",
        label: labelFunc("energy.spend"),
        unit: urbanRail.units.spend.default[0],
      },
    ],
  };
}

export function buildUrbanRailServiceDefaultValues() {
  return {
    name: "",
    operationsWithinMunicipalBoundary: false,
    energy: createMatrixBranch(urbanRail.energyKeys, (key) => urbanRail.units.energy[key][0]),
    spend: createMatrixBranch(urbanRail.energyKeys, () => urbanRail.units.spend.default[0]),
  };
}
