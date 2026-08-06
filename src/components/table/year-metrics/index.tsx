"use client";

import { useMemo } from "react";
import { useEffect, useState } from "react";

import type { FieldValues } from "react-hook-form";

import InventoryTanstackTable from "../tanstack";
import YearSelector from "../year-selector";
import { InventoryTableActionButton, InventoryTableHeader } from "../InventoryTableHeader";
import { createYearMetricsColumns } from "./columns";
import type { YearMetricsTableProps } from "./types";
import { Plus } from "lucide-react";

export default function YearMetricsTable<T extends FieldValues>({
  title,
  description,
  className,
  selectedYear: selectedYearProp,
  rows,
  columns,
  form,
  baseName,
  editableRows,
  renderCell,
  yearSelector,
  addRow,
}: YearMetricsTableProps<T>) {
  const [internalSelectedYear, setSelectedYear] = useState<number | undefined>(
    yearSelector?.initialYear ?? yearSelector?.years[0]
  );
  const selectedYear = selectedYearProp ?? internalSelectedYear;

  useEffect(() => {
    if (!yearSelector?.years.length) return;

    if (selectedYearProp !== undefined) return;

    setSelectedYear((currentYear) =>
      currentYear && yearSelector.years.includes(currentYear)
        ? currentYear
        : (yearSelector.initialYear ?? yearSelector.years[0])
    );
  }, [selectedYearProp, yearSelector?.initialYear, yearSelector?.years]);

  const tableColumns = useMemo(
    () =>
      createYearMetricsColumns({
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
              <YearSelector
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
