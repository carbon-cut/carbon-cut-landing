import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";

import type { TName } from "@/components/ui/forms";
import type { Row } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

export type ScalarTableField<T extends FieldValues> = {
  key: string;
  label: string;
  helper?: ReactNode;
  valueName: TName<T>;
  unitName: TName<T>;
  unit: string;
  type?: "number" | "text";
};

export type ScalarTableRow<T extends FieldValues> = {
  key: string;
  field: ScalarTableField<T>;
};

export type ScalarCellRendererArgs<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  row: Row<ScalarTableRow<T>>;
};

export type ScalarTableProps<T extends FieldValues> = {
  title: string;
  help?: ReactNode;
  form: UseFormReturn<T, undefined>;
  fields: ScalarTableField<T>[];
};
