"use client";

import { useMemo } from "react";
import { useEffect, useState } from "react";

import type { FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import InventoryTanstackTable from "../tanstack";
import YearSelector from "../year-selector";
import { createTableGridColumns } from "./columns";
import type { TableGridProps } from "./types";
import { Plus } from "lucide-react";

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
        columns: columns.map((column) =>
          typeof column === "string" ? { key: column, label: column } : column
        ),
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
    <section className={className ?? "space-y-4"}>
      {title || description || yearSelector || addRow ? (
        <div className="flex flex-wrap items-start justify-between gap-3 lg:flex-nowrap">
          <div>
            {title ? (
              <Typography asChild variant="sectionTitle" size="sm">
                <h4>{title}</h4>
              </Typography>
            ) : null}
            {description ? (
              <Typography asChild variant="body" size="body" className={title ? "mt-2" : undefined}>
                <p>{description}</p>
              </Typography>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
              <Button type="button" variant="outline" size="sm" onClick={addRow.onAdd}>
                <Plus aria-hidden="true" />
                {addRow.label}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
      <InventoryTanstackTable
        rows={rows}
        columns={tableColumns}
        getRowId={(row) => row.key}
        stickyColumnIds={["label"]}
      />
    </section>
  );
}
