import type { InventoryGroupedYearTableData } from "@/app/collectivity/_inventaire/types";

export type GroupedYearTableProps = {
  section: InventoryGroupedYearTableData;
  getValue: (rowKey: string, yearValue: number, subcolumnKey: string) => string;
};
