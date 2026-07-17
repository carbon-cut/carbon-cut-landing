import type { InventoryGroupedYearTableData } from "../../../types";
import type {
  GroupedYearEditableRows,
  GroupedYearRowField,
} from "@/components/table/grouped-year/types";
import { agriculturalProduction } from "../../../InventorySchema/afat/config";

const cropKeys = [
  "wheat",
  "barley",
  "peasChickpeas",
  "beansBroadBeans",
  "alfalfa",
  "potatoes",
] as const;

type LabelFunc = (key: string) => string;

export function buildAgriculturalProductionSection(
  labelFunc: LabelFunc
): InventoryGroupedYearTableData {
  return {
    title: labelFunc("title") as string,
    description: labelFunc("description") as string,
    rows: [],
    subcolumns: agriculturalProduction.measureKeys.map((key) => ({
      key,
      label: labelFunc(`measures.${key}`) as string,
      unit: agriculturalProduction.units.measures[key][0],
    })),
  };
}

export function buildAgriculturalProductionRowFields(labelFunc: LabelFunc): GroupedYearRowField[] {
  return [
    {
      key: "key",
      label: labelFunc("fields.cropType") as string,
      type: "select",
      placeholder: labelFunc("fields.cropTypePlaceholder") as string,
      options: cropKeys.map((cropKey) => ({
        value: cropKey,
        label: labelFunc(`cropOptions.${cropKey}`) as string,
      })),
    },
  ];
}

export function buildAgriculturalProductionEditableRows(
  labelFunc: LabelFunc
): GroupedYearEditableRows {
  return {
    addLabel: labelFunc("addLabel") as string,
    minRows: 0,
    rowLabelPrefix: labelFunc("rowLabelPrefix") as string,
  };
}
