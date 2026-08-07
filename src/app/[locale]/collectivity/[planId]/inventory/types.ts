import type { ReactNode } from "react";

import { TName } from "@/components/ui/forms";
import { InventoryFormValues } from "./context/inventory-context";
import type { TableGridProps } from "@/components/table/table-grid/types";
import { InventoryDatasetKey, InventoryFamilyKey } from "./registry";

type InventoryTableLabel = Exclude<ReactNode, boolean | null | undefined>;

export type InventoryYear = number;

export type InventoryFamily = {
  key: InventoryFamilyKey;
  hasError?: boolean;
};

export type InventoryDataset = {
  key: InventoryDatasetKey;
  familyKey: InventoryFamilyKey;
  navStatusLabel?: string;
  progressLabel?: string;
  progressPercent?: number;
  hasError?: boolean;
};

export type InventoryTableColumn = {
  key: string;
  label: InventoryTableLabel;
  calculated?: "sum";
  editable?: boolean;
  className?: string;
  unit?: string | null;
};

export type InventoryTableRow = {
  key: string;
  label: InventoryTableLabel;
  unit: string | null;
};

export type InventoryTableSectionData = Pick<
  TableGridProps<InventoryFormValues>,
  "title" | "description" | "rows" | "columns"
> & {
  fieldBaseName: TName<InventoryFormValues>;
  yearSelector?: Pick<
    NonNullable<TableGridProps<InventoryFormValues>["yearSelector"]>,
    "initialYear" | "ariaLabel" | "datasetKey"
  >;
  editableRows?: {
    addLabel: string;
    rowLabelPrefix: string;
    minRows?: number;
    newRowValues?: string[];
  };
};

export type InventoryYearBlockTableBlock = {
  key: string;
  title: string;
  columns: InventoryTableColumn[];
  rows: InventoryTableRow[];
  note?: string;
  editableColumns?: boolean;
};

export type InventoryGroupedYearTableData = {
  title: InventoryTableLabel;
  description?: string;
  subcolumns: InventoryTableColumn[];
  rows: InventoryTableRow[];
};

export type InventoryWorkspaceConfig = {
  families: InventoryFamily[];
  datasets: InventoryDataset[];
};
