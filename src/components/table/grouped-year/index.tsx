"use client";

import { useMemo } from "react";

import type { FieldValues } from "react-hook-form";

import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import InventoryTanstackTable from "../tanstack";
import { createGroupedYearColumns } from "./columns";
import type { GroupedYearTableProps } from "./types";

export default function InventoryGroupedYearTable<T extends FieldValues>({
  section,
  form,
  baseName,
}: GroupedYearTableProps<T>) {
  const { years } = useInventoryContext();

  const columns = useMemo(
    () => createGroupedYearColumns({ years, subcolumns: section.subcolumns, form, baseName }),
    [baseName, form, section.subcolumns, years]
  );

  return (
    <InventoryTanstackTable
      title={section.title}
      rows={section.rows}
      columns={columns}
      getRowId={(row) => row.key}
      stickyColumnIds={["label"]}
    />
  );
}
