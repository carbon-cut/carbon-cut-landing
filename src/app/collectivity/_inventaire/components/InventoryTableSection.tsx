"use client";

import { useEffect, useState } from "react";

import { useInventoryContext } from "../context/inventory-context";
import type { InventoryFormValues } from "../context/inventory-context";
import { TName } from "@/components/ui/forms";
import TableGrid from "@/components/table/table-grid";
import type { InventoryTableSectionData } from "../types";

export default function InventoryTableSection({
  section,
  className,
}: {
  section: InventoryTableSectionData;
  className?: string;
}) {
  const { mainForm, years } = useInventoryContext();
  const editableRows = section.editableRows;
  const minRows = editableRows?.minRows ?? 1;

  return (
    <TableGrid
      className={className}
      title={section.title}
      description={section.description}
      rows={/* rows */ []}
      columns={section.columns}
      form={mainForm}
      baseName={section.fieldBaseName}
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
              onAdd: /* handleAddRow */ () => {},
            }
          : undefined
      }
      editableRows={
        editableRows
          ? {
              minRows,
              onRemoveRow: /* handleRemoveRow */ () => {},
            }
          : undefined
      }
    />
  );
}
