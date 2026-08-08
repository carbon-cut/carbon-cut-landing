import React from "react";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import type { InventoryGroupedYearTableData, InventoryTableRow } from "../../../types";
import type {
  GroupedYearEditableRows,
  GroupedYearRowField,
} from "@/components/table/grouped-year/types";
import { trees } from "../../../InventorySchema/afat/config";

type LabelFunc = (...args: [string, ...any]) => string;

export function buildTrackedTreeCropsSection(labelFunc: LabelFunc): InventoryGroupedYearTableData {
  return {
    title: labelFunc("trackedTreeCrops.title"),
    description: labelFunc("trackedTreeCrops.description"),
    rows: [],
    subcolumns: trees.trackedTreeCropMetricKeys.map((key) => ({
      key,
      label:
        key === "youngTrees" || key === "adultTrees" || key === "senescentTrees"
          ? React.createElement(
              Typography,
              {
                variant: "label",
                size: "sm",
                className: "inline-flex items-center gap-1",
              },
              React.createElement("span", null, labelFunc(`trackedTreeCrops.columns.${key}`)),
              React.createElement(FieldRequired, null)
            )
          : labelFunc(`trackedTreeCrops.columns.${key}`),
      unit: trees.units.metrics[key][0],
    })),
  };
}

export function buildTrackedTreeCropRowFields(labelFunc: LabelFunc): GroupedYearRowField[] {
  return [
    {
      key: "treeType",
      label: labelFunc("trackedTreeCrops.fields.treeType"),
      headerLabel: React.createElement(
        Typography,
        {
          variant: "label",
          size: "sm",
          className: "inline-flex items-center gap-1",
        },
        React.createElement("span", null, labelFunc("trackedTreeCrops.fields.treeType")),
        React.createElement(FieldRequired, null)
      ),
      type: "select",
      placeholder: labelFunc("trackedTreeCrops.fields.treeTypePlaceholder"),
      options: trees.trackedTreeCropOptions.map((option) => ({
        value: option,
        label: labelFunc(`trackedTreeCrops.treeTypes.${option}`),
      })),
    },
  ];
}

export function buildTrackedTreeCropsEditableRows(labelFunc: LabelFunc): GroupedYearEditableRows {
  return {
    addLabel: labelFunc("trackedTreeCrops.addLabel"),
    rowLabelPrefix: labelFunc("trackedTreeCrops.rowLabelPrefix"),
    minRows: 0,
    rowKeyFieldName: "treeType",
  };
}

export function buildFruitTreesRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return [
    {
      key: "count",
      label: labelFunc("fruitTrees.countLabel"),
      unit: "",
    },
  ];
}
