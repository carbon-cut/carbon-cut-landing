import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type { InventoryGroupedYearTableData } from "@/app/collectivity/_inventaire/types";

export type GroupedYearTableProps<T extends FieldValues> = InventoryGroupedYearTableData & {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
};
