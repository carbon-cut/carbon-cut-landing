import type { InventoryYearBlockTableBlock } from "@/app/collectivity/_inventaire/types";
import type { InventoryBlockColumns, InventoryTableValues } from "./types";

export function getCellKey(yearValue: number, blockKey: string, rowKey: string, columnKey: string) {
  return `${yearValue}::${blockKey}::${rowKey}::${columnKey}`;
}

export function parseTableNumber(value: string) {
  const normalizedValue = value.trim().replace(/\s/g, "").replace(",", ".");
  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export function formatTableNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(3)));
}

export function createInitialColumns(blocks: InventoryYearBlockTableBlock[]) {
  return blocks.reduce<InventoryBlockColumns>((columnsByBlock, block) => {
    columnsByBlock[block.key] = block.columns;
    return columnsByBlock;
  }, {});
}
