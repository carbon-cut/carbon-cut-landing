"use client";

import { useMemo } from "react";

import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import InventoryTanstackTable from "../tanstack";
import { createGroupedYearColumns } from "./columns";
import type { GroupedYearTableProps } from "./types";

export default function InventoryGroupedYearTable({ section, getValue }: GroupedYearTableProps) {
  const { years } = useInventoryContext();

  const columns = useMemo(
    () => createGroupedYearColumns({ years, subcolumns: section.subcolumns, getValue }),
    [getValue, section.subcolumns, years]
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
