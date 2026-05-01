"use client";

import { useEffect, useState } from "react";

import { useInventoryContext } from "../context/inventory-context";
import type { InventoryFormValues } from "../context/inventory-context";
import { TName } from "@/components/ui/forms";
import TableGrid from "@/components/table/table-grid";
import type { InventoryTableRow, InventoryTableSectionData } from "../types";

export default function InventoryTableSection({
  section,
  className,
}: {
  section: InventoryTableSectionData;
  className?: string;
}) {
  const { mainForm, years } = useInventoryContext();
  const [rows, setRows] = useState(section.rows);
  const editableRows = section.editableRows;
  const minRows = editableRows?.minRows ?? 1;

  useEffect(() => {
    setRows(section.rows);
  }, [section.rows]);

  const handleAddRow = () => {
    if (!editableRows) return;

    setRows((currentRows) => {
      const nextNumber = currentRows.length + 1;
      const newRow: InventoryTableRow = {
        key: `${editableRows.rowLabelPrefix.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
        label: `${editableRows.rowLabelPrefix} ${nextNumber}`,
      };

      return [...currentRows, newRow];
    });
  };

  const handleRemoveRow = (rowKey: string) => {
    if (!editableRows) return;

    setRows((currentRows) =>
      currentRows.length <= minRows ? currentRows : currentRows.filter((row) => row.key !== rowKey)
    );
  };

  const fieldBaseName = (section.fieldBaseName ?? section.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <TableGrid
      className={className}
      title={section.title}
      description={section.description}
      rows={rows}
      columns={section.columns}
      form={mainForm}
      baseName={fieldBaseName as TName<InventoryFormValues>}
      yearSelector={
        section.yearSelector
          ? {
              years,
              initialYear: section.yearSelector.initialYear,
              ariaLabel: section.yearSelector.ariaLabel,
            }
          : undefined
      }
      addRow={
        editableRows
          ? {
              label: editableRows.addLabel,
              onAdd: handleAddRow,
            }
          : undefined
      }
      editableRows={
        editableRows
          ? {
              minRows,
              onRemoveRow: handleRemoveRow,
            }
          : undefined
      }
    />
  );
}
