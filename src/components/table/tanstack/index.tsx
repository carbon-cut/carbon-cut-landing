"use client";

import type { ReactNode } from "react";

import {
  flexRender,
  getCoreRowModel,
  type Cell,
  type ColumnDef,
  type Header,
  type Row,
  useReactTable,
} from "@tanstack/react-table";

import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

import { InventoryDataTableHead, InventoryDataTableRowLabel } from "../InventoryDataTable";

type InventoryTanstackColumnMeta = {
  align?: "left" | "center";
  tone?: "default" | "secondary";
  className?: string;
};

type InventoryTanstackTableProps<TData> = {
  title?: string;
  rows: TData[];
  columns: ColumnDef<TData, unknown>[];
  getRowId: (row: TData, index: number, parent?: Row<TData>) => string;
  stickyColumnIds?: string[];
  tableClassName?: string;
  rowClassName?: string;
  headerRowClassName?: string;
  stickyHeaderClassName?: string;
  stickyCellClassName?: string;
  dataCellClassName?: string;
  renderHeaderContent?: (header: Header<TData, unknown>) => ReactNode;
  renderCellContent?: (cell: Cell<TData, unknown>) => ReactNode;
};

export default function InventoryTanstackTable<TData>({
  title,
  rows,
  columns,
  getRowId,
  stickyColumnIds = [],
  tableClassName,
  rowClassName,
  headerRowClassName,
  stickyHeaderClassName,
  stickyCellClassName,
  dataCellClassName,
  renderHeaderContent,
  renderCellContent,
}: InventoryTanstackTableProps<TData>) {
  const table = useReactTable({
    data: rows,
    columns,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderHeader = (header: Header<TData, unknown>) =>
    renderHeaderContent
      ? renderHeaderContent(header)
      : flexRender(header.column.columnDef.header, header.getContext());

  const renderCell = (cell: Cell<TData, unknown>) =>
    renderCellContent
      ? renderCellContent(cell)
      : flexRender(cell.column.columnDef.cell, cell.getContext());

  return (
    <section className="space-y-4">
      {title ? (
        <Typography asChild variant="sectionTitle" size="sm">
          <h4>{title}</h4>
        </Typography>
      ) : null}

      <Table className={cn("w-full overflow-hidden", tableClassName)}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={cn(
                "border-transparent rounded-xl bg-surface-warm/60 hover:bg-surface-warm",
                headerRowClassName
              )}
            >
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as
                  | InventoryTanstackColumnMeta
                  | undefined;
                const isStickyColumn = stickyColumnIds.includes(header.column.id);

                return (
                  <InventoryDataTableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    sticky={isStickyColumn}
                    align={meta?.align}
                    tone={meta?.tone}
                    className={cn(
                      !isStickyColumn && !meta?.className ? "min-w-[142px]" : undefined,
                      meta?.className,
                      isStickyColumn ? stickyHeaderClassName : undefined
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center gap-2",
                        (meta?.align ?? "left") === "center" ? "justify-center" : ""
                      )}
                    >
                      {header.isPlaceholder ? null : renderHeader(header)}
                    </span>
                  </InventoryDataTableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className={cn("border-border/60", rowClassName)}>
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta as InventoryTanstackColumnMeta | undefined;
                const isStickyColumn = stickyColumnIds.includes(cell.column.id);

                if (isStickyColumn) {
                  return (
                    <InventoryDataTableRowLabel
                      key={cell.id}
                      className={cn(meta?.className, stickyCellClassName)}
                    >
                      {renderCell(cell)}
                    </InventoryDataTableRowLabel>
                  );
                }

                return (
                  <TableCell
                    key={cell.id}
                    className={cn("px-3 py-2.5 align-middle", meta?.className, dataCellClassName)}
                  >
                    {renderCell(cell)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
