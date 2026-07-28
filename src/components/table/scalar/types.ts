import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";

import type { TName } from "@/components/ui/forms";

export type ScalarTableField<T extends FieldValues> = {
  key: string;
  label: string;
  helper?: ReactNode;
  valueName: TName<T>;
  unitName: TName<T>;
  unit: string;
  type?: "number" | "text";
};

export type ScalarTableProps<T extends FieldValues> = {
  title: string;
  form: UseFormReturn<T, undefined>;
  fields: ScalarTableField<T>[];
};
