"use client";

import Typography from "@/components/ui/typography";

import {
  InventoryDataTable,
  InventoryDataTableHeaderRow,
  InventoryDataTableRow,
  TableBody,
  TableHeader,
} from "./InventoryDataTable";
import InventoryTableInput from "./InventoryTableInput";
import { useInventoryContext } from "../context/inventory-context";
import type { InventoryRowLabel } from "../types";

export default function MatrixTable({
  title,
  rows,
  getValue,
}: {
  title: string;
  rows: InventoryRowLabel[];
  getValue: (rowKey: string, yearValue: number) => string;
}) {
  const { years } = useInventoryContext();

  return (
    <section className="space-y-4">
      <Typography asChild variant="sectionTitle" size="sm">
        <h4>{title}</h4>
      </Typography>

      <InventoryDataTable>
        <TableHeader>
          <InventoryDataTableHeaderRow
            stickySrLabel="Ligne"
            cells={years.map((year) => ({
              key: String(year),
              className: "min-w-[142px]",
              label: String(year),
            }))}
          />
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <InventoryDataTableRow
              key={row.key}
              label={row.label}
              cells={years.map((year) => ({
                key: `${row.key}-${year}`,
                content: <InventoryTableInput defaultValue={getValue(row.key, year)} />,
              }))}
            />
          ))}
        </TableBody>
      </InventoryDataTable>
    </section>
  );
}
