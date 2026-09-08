import React from "react";
import { FieldHelp, FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import { treesParksWaste } from "../../../InventorySchema/municipal/config";
import type { InventoryTableRow } from "../../../types";

export function buildTreesParksWasteRows(
  labelFunc: (...args: [string, ...any]) => string
): InventoryTableRow[] {
  const requiredKeys = new Set(["treeCanopyArea", "greenWaste", "composting"]);

  return treesParksWaste.yearlyKeys.map((key) => ({
    key,
    label: key === "treeCanopyArea"
      ? React.createElement(
          Typography,
          {
            variant: "label",
            size: "sm",
            className: "inline-flex items-center gap-1",
          },
          React.createElement("span", null, labelFunc(`yearly.${key}`)),
          React.createElement(FieldRequired, null),
          React.createElement(FieldHelp, {
            content: labelFunc("treeCanopyAreaHelp"),
            srLabel: labelFunc("treeCanopyAreaHelpLabel"),
          })
        )
      : requiredKeys.has(key)
      ? React.createElement(
          Typography,
          {
            variant: "label",
            size: "sm",
            className: "inline-flex items-center gap-1",
          },
          React.createElement("span", null, labelFunc(`yearly.${key}`)),
          React.createElement(FieldRequired, null)
        )
      : labelFunc(`yearly.${key}`),
    unit: treesParksWaste.units.yearly[key][0],
  }));
}
