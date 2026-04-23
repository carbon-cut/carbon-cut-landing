"use client";

import Typography from "@/components/ui/typography";

import {
  InventoryDataTable,
  InventoryDataTableHead,
  InventoryDataTableHeaderRow,
  InventoryDataTableRow,
  InventoryDataTableRowLabel,
  TableBody,
  TableCell,
  TableHeader,
} from "./InventoryDataTable";
import InventoryTableInput from "./InventoryTableInput";
import type { InventoryTableSectionData } from "../types";

export default function InventoryTableSection({
  section,
  className,
}: {
  section: InventoryTableSectionData;
  className?: string;
}) {
  return (
    <section className={className ?? "space-y-4"}>
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

      <InventoryDataTable>
        <TableHeader>
          <InventoryDataTableHeaderRow
            stickySrLabel="Categorie"
            cells={section.columns.map((column) => ({
              key: column,
              label: column,
            }))}
          />
        </TableHeader>
        <TableBody>
          {section.rows.map((row) => (
            <InventoryDataTableRow
              key={row.key}
              label={row.label}
              cells={row.values.map((value, index) => ({
                key: `${row.key}-${index}`,
                content: <InventoryTableInput defaultValue={value} />,
              }))}
            />
          ))}
        </TableBody>
      </InventoryDataTable>
    </section>
  );
}
