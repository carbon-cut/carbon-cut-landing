import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";

import type { InventoryRowLabel } from "@/app/collectivity/_inventaire/types";

export type MatrixTableRow = InventoryRowLabel;

export type MatrixTableProps<T extends FieldValues> = {
  title: string;
  rows: MatrixTableRow[];
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
};
