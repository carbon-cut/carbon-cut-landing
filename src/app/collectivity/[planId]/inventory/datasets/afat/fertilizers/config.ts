import type { ScalarTableField } from "@/components/table/scalar/types";
import type { InventoryFormValues } from "../../../context/inventory-context";
import type { InventoryTableRow } from "../../../types";
import { fertilizers } from "../../../InventorySchema/afat/config";

type LabelFunc = (key: string) => string;

export function buildFertilizerRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return fertilizers.keys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: "t",
  }));
}

export function buildFertilizerTenureFields(
  labelFunc: LabelFunc
): ScalarTableField<InventoryFormValues>[] {
  return fertilizers.keys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    valueName: `afat.fertilizers.dataSet.${key}.tenure.value`,
    unitName: `afat.fertilizers.dataSet.${key}.tenure.unit`,
    unit: "%",
  }));
}
