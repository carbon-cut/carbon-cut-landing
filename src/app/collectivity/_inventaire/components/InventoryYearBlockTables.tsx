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
import type { InventoryYear, InventoryYearBlockTableBlock } from "../types";

function BlockTable({
  block,
  year,
  getValue,
}: {
  block: InventoryYearBlockTableBlock;
  year: InventoryYear;
  getValue: (blockKey: string, rowKey: string, columnKey: string, yearValue: string) => string;
}) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Typography asChild variant="sectionTitle" size="sm">
          <h5>{block.title}</h5>
        </Typography>
        <Typography
          variant="caption"
          size="xs"
          className="rounded-full border border-border/18 px-2 py-0.5"
        >
          {year.title}
        </Typography>
      </div>
      {block.note ? (
        <Typography asChild variant="caption" size="sm" className="text-secondary">
          <p>{block.note}</p>
        </Typography>
      ) : null}
      <InventoryDataTable>
        <TableHeader>
          <InventoryDataTableHeaderRow
            stickySrLabel="Ligne"
            cells={block.columns.map((column) => ({
              key: column.key,
              className: "min-w-[124px]",
              label: column.label,
            }))}
          />
        </TableHeader>
        <TableBody>
          {block.rows.map((row) => (
            <InventoryDataTableRow
              key={row.key}
              label={row.label}
              cells={block.columns.map((column) => ({
                key: `${row.key}-${column.key}`,
                content: (
                  <InventoryTableInput
                    defaultValue={getValue(block.key, row.key, column.key, year.value)}
                  />
                ),
              }))}
            />
          ))}
        </TableBody>
      </InventoryDataTable>
    </section>
  );
}

export default function InventoryYearBlockTables({
  title,
  description,
  blocks,
  getValue,
}: {
  title: string;
  description?: string;
  blocks: InventoryYearBlockTableBlock[];
  getValue: (blockKey: string, rowKey: string, columnKey: string, yearValue: string) => string;
}) {
  const { years } = useInventoryContext();

  return (
    <section className="space-y-6">
      <div>
        <Typography asChild variant="sectionTitle" size="sm">
          <h4>{title}</h4>
        </Typography>
        {description ? (
          <Typography asChild variant="body" size="body" className="mt-2">
            <p>{description}</p>
          </Typography>
        ) : null}
      </div>

      <div className="space-y-8">
        {years.map((year) => (
          <section
            key={year.value}
            className="space-y-6 border-t border-border/10 pt-6 first:border-t-0 first:pt-0"
          >
            {blocks.map((block) => (
              <BlockTable
                key={`${year.value}-${block.key}`}
                block={block}
                year={year}
                getValue={getValue}
              />
            ))}
          </section>
        ))}
      </div>
    </section>
  );
}
