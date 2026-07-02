import type { MatrixEditableRows } from "@/components/table/matrix/types";
import type { InventoryTableRow } from "../../../types";
import { fertilizers } from "../../../InventorySchema/afat/config";

type LabelFunc = (key: string) => string;

export function buildFertilizerRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return fertilizers.commonRowKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`) as string,
    unit: fertilizers.units.default[0],
  }));
}

export function buildFertilizerEditableRows(labelFunc: LabelFunc): MatrixEditableRows {
  return {
    addLabel: labelFunc("addLabel") as string,
    minRows: fertilizers.commonRowKeys.length,
    unremovableRowKeys: fertilizers.commonRowKeys,
    unit: fertilizers.units.default[0],
  };
}
