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
import type { InventoryGroupedYearTableData } from "../types";

export default function InventoryGroupedYearTable({
  section,
  getValue,
}: {
  section: InventoryGroupedYearTableData;
  getValue: (rowKey: string, yearValue: number, subcolumnKey: string) => string;
}) {
  const { years } = useInventoryContext();

  return (
    <section className="space-y-4">
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
            stickySrLabel="Ligne"
            cells={years.map((year) => ({
              key: String(year),
              colSpan: section.subcolumns.length,
              className: "min-w-[220px]",
              align: "center",
              label: String(year),
            }))}
            className="z-20"
          />
          <InventoryDataTableHeaderRow
            stickySrLabel="Ligne"
            cells={years.flatMap((year) =>
              section.subcolumns.map((subcolumn) => ({
                key: `${year}-${subcolumn.key}`,
                className: "min-w-[110px] py-2",
                label: subcolumn.label,
                tone: "secondary" as const,
              }))
            )}
            className="z-20"
          />
        </TableHeader>
        <TableBody>
          {section.rows.map((row) => (
            <InventoryDataTableRow
              key={row.key}
              label={row.label}
              cells={years.flatMap((year) =>
                section.subcolumns.map((subcolumn) => ({
                  key: `${row.key}-${year}-${subcolumn.key}`,
                  content: (
                    <InventoryTableInput defaultValue={getValue(row.key, year, subcolumn.key)} />
                  ),
                }))
              )}
            />
          ))}
        </TableBody>
      </InventoryDataTable>
    </section>
  );
}
