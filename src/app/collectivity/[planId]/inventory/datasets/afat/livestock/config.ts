import type { ScalarTableField } from "@/components/table/scalar/types";
import type { InventoryFormValues } from "../../../context/inventory-context";
import type { InventoryTableRow } from "../../../types";

const livestockKeys = [
  "dairyCattle",
  "otherCattle",
  "sheep",
  "goats",
  "horses",
  "donkeysMules",
  "camels",
  "broilers",
  "layingHens",
  "turkeys",
] as const;

type LabelFunc = (key: string) => string;

export function buildLivestockRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return livestockKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: "",
  }));
}

export function buildLivestockConfinedTimeShareFields(
  labelFunc: LabelFunc
): ScalarTableField<InventoryFormValues>[] {
  return livestockKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    valueName: `afat.livestock.dataSet.confinedTimeShare.${key}.value`,
    unitName: `afat.livestock.dataSet.confinedTimeShare.${key}.unit`,
    unit: "%",
  }));
}
