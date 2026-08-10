import React from "react";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import type { ScalarTableField } from "@/components/table/scalar/types";
import type { InventoryFormValues } from "../../../context/inventory-context";
import type { InventoryTableRow } from "../../../types";
import { livestock } from "../../../InventorySchema/afat/config";

type LabelFunc = (...args: [string, ...any]) => string;

export function buildLivestockRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return livestock.keys.map((key) => ({
    key,
    label: React.createElement(
      Typography,
      {
        variant: "label",
        size: "sm",
        className: "inline-flex items-center gap-1",
      },
      React.createElement("span", null, labelFunc(`rows.${key}`)),
      React.createElement(FieldRequired, null)
    ),
    unit: "",
  }));
}

export function buildLivestockConfinedTimeShareFields(
  labelFunc: LabelFunc
): ScalarTableField<InventoryFormValues>[] {
  return livestock.keys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    valueName: `afat.livestock.dataSet.confinedTimeShare.${key}.value`,
    unitName: `afat.livestock.dataSet.confinedTimeShare.${key}.unit`,
    unit: "%",
  }));
}
