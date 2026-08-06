"use client";

import { useMemo } from "react";
import { useEffect, useState } from "react";

import type { FieldValues } from "react-hook-form";

import InventoryTanstackTable from "../tanstack";
import { InventoryTableActionButton, InventoryTableHeader } from "../InventoryTableHeader";
import { createTableGridColumns } from "./columns";
import type { TableGridProps } from "./types";
import { Plus } from "lucide-react";
import InventoryYearSelector from "@/app/collectivity/[planId]/inventory/components/InventoryYearSelector";

export default function TableGrid<T extends FieldValues>({
  title,
  description,
  className,
  rows,
  columns,
  form,
  baseName,
  editableRows,
  renderCell,
  yearSelector,
  addRow,
}: TableGridProps<T>) {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    yearSelector?.initialYear ?? yearSelector?.years[0]
  );

  useEffect(() => {
    if (!yearSelector?.years.length) return;

    setSelectedYear((currentYear) =>
      currentYear && yearSelector.years.includes(currentYear)
        ? currentYear
        : (yearSelector.initialYear ?? yearSelector.years[0])
    );
  }, [yearSelector?.initialYear, yearSelector?.years]);

  const tableColumns = useMemo(
    () =>
      createTableGridColumns({
        columns: columns,
        form,
        baseName,
        editableRows: editableRows
          ? {
              ...editableRows,
              rowCount: rows.length,
            }
          : undefined,
        renderCell,
        selectedYear,
      }),
    [baseName, columns, editableRows, form, renderCell, rows.length, selectedYear]
  );

  return (
    <section className={className ?? "space-y-3"}>
      <InventoryTableHeader
        title={title}
        description={description}
        endContent={
          <>
            {yearSelector ? (
              <InventoryYearSelector
                datasetKey={yearSelector.datasetKey}
                years={yearSelector.years}
                selectedYear={selectedYear}
                onSelectYear={setSelectedYear}
                ariaLabel={yearSelector.ariaLabel}
                className={yearSelector.className}
              />
            ) : null}

            {addRow ? (
              <InventoryTableActionButton
                type="button"
                /* onClick={addRow.onAdd} */ onPointerDown={(event) => {
                  event.preventDefault();
                  addRow.onAdd();
                }}
              >
                <Plus aria-hidden="true" />
                {addRow.label}
              </InventoryTableActionButton>
            ) : null}
          </>
        }
      />
      <InventoryTanstackTable
        rows={rows}
        columns={tableColumns}
        getRowId={(row) => row.id ?? row.key}
        stickyColumnIds={["label"]}
      />
    </section>
  );
}
