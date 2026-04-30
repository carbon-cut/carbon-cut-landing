"use client";

import { useMemo } from "react";

import type { FieldValues } from "react-hook-form";

import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import InventoryTanstackTable from "../tanstack";
import { createMatrixTableColumns } from "./columns";
import type { MatrixTableProps } from "./types";

export default function MatrixTable<T extends FieldValues>({
  title,
  rows,
  form,
  baseName,
}: MatrixTableProps<T>) {
  const { years } = useInventoryContext();

  const columns = useMemo(
    () => createMatrixTableColumns({ years, baseName, form }),
    [baseName, form, years]
  );

  return (
    <InventoryTanstackTable
      title={title}
      rows={rows}
      columns={columns}
      getRowId={(row) => row.key}
      stickyColumnIds={["label"]}
    />
  );
}
