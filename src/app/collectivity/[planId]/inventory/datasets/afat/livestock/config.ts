import type { InventoryTableRow } from "../../../types";
import { livestock } from "../../../InventorySchema/afat/config";

type LabelFunc = (key: string) => string;

export function buildLivestockRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return livestock.rowKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`) as string,
    unit: livestock.units.headcount.default[0],
  }));
}
