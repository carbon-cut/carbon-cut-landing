"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import {
  InventoryDataTable,
  InventoryDataTableHeaderRow,
  InventoryDataTableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/table/InventoryDataTable";
import InventoryTableInput from "@/components/table/InventoryTableInput";
import type { InventoryTableRow, InventoryTableSectionData } from "../types";

export default function InventoryTableSection({
  section,
  className,
}: {
  section: InventoryTableSectionData;
  className?: string;
}) {
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
        values: editableRows.newRowValues ?? section.columns.map(() => ""),
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

  return (
    <section className={className ?? "space-y-4"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Typography asChild variant="sectionTitle" size="sm">
            <h4>{section.title}</h4>
          </Typography>
          {section.description ? (
            <Typography asChild variant="body" size="body" className="mt-2">
              <p>{section.description}</p>
            </Typography>
          ) : null}
        </div>
        {editableRows ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label={editableRows.addLabel}
            onClick={handleAddRow}
          >
            <Plus aria-hidden="true" />
            {editableRows.addLabel}
          </Button>
        ) : null}
      </div>

      <InventoryDataTable>
        <TableHeader>
          <InventoryDataTableHeaderRow
            stickySrLabel="Categorie"
            cells={section.columns.map((column) => ({
              key: column,
              label: column,
            }))}
          >
            {editableRows ? <TableCell className="w-12 px-3 py-3" /> : null}
          </InventoryDataTableHeaderRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <InventoryDataTableRow
              key={row.key}
              label={row.label}
              cells={row.values.map((value, index) => ({
                key: `${row.key}-${index}`,
                content: <InventoryTableInput defaultValue={value} />,
              }))}
            >
              {editableRows ? (
                <TableCell className="px-3 py-2.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    title="Supprimer"
                    aria-label={`Supprimer ${row.label}`}
                    disabled={rows.length <= minRows}
                    onClick={() => handleRemoveRow(row.key)}
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
                </TableCell>
              ) : null}
            </InventoryDataTableRow>
          ))}
        </TableBody>
      </InventoryDataTable>
    </section>
  );
}
