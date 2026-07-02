import type { InventoryGroupedYearTableData } from "../../../types";
import type {
  GroupedYearEditableRows,
  GroupedYearRowField,
} from "@/components/table/grouped-year/types";
import { perennialPlantationStock } from "../../../InventorySchema/afat/config";

export const columns = [
  { key: "youngHectares" },
  { key: "adultHectares" },
  { key: "oldHectares" },
  //TODO  develop showing totals. FIXME
  // {
  //   key: "totalHectares",
  //   calculatedFrom: ["youngHectares", "adultHectares", "oldHectares"],
  // },
  { key: "youngTrees" },
  { key: "adultTrees" },
  { key: "oldTrees" },
  // {
  //   key: "totalTrees",
  //   calculatedFrom: ["youngTrees", "adultTrees", "oldTrees"],
  // },
] as const;

export type PerennialPlantationOptionKey = (typeof perennialPlantationStock.plantOptions)[number];
export type PerennialPlantationColumnKey = (typeof columns)[number]["key"];

type LabelFunc = (key: string) => string;

function getPerennialPlantationColumnUnit(key: PerennialPlantationColumnKey) {
  return perennialPlantationStock.units.metrics[key][0];
}

export function buildPerennialPlantationSection(
  labelFunc: LabelFunc
): InventoryGroupedYearTableData {
  return {
    title: labelFunc("title") as string,
    description: labelFunc("description") as string,
    rows: [],
    subcolumns: columns.map((column) => ({
      key: column.key,
      label: labelFunc(`columns.${column.key}`) as string,
      calculated: "calculatedFrom" in column ? "sum" : undefined,
      unit: getPerennialPlantationColumnUnit(column.key),
      className: "calculatedFrom" in column ? "bg-yellow-100/70" : undefined,
    })),
  };
}

export function buildPerennialPlantationRowFields(labelFunc: LabelFunc): GroupedYearRowField[] {
  return [
    {
      key: "key",
      label: labelFunc("fields.plantType") as string,
      type: "select",
      placeholder: labelFunc("placeholders.plantType") as string,
      options: perennialPlantationStock.plantOptions.map((option) => ({
        value: option,
        label: labelFunc(`plantOptions.${option}`) as string,
      })),
    },
  ];
}

export function buildPerennialPlantationEditableRows(
  labelFunc: LabelFunc
): GroupedYearEditableRows {
  return {
    addLabel: labelFunc("addLabel") as string,
    minRows: 0,
    rowLabelPrefix: labelFunc("rowLabelPrefix") as string,
  };
}
