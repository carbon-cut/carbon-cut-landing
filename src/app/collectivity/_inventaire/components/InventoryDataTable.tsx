"use client";

import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type InventoryDataTableHeaderCell = {
  key: string;
  label: string;
  badge?: string;
  className?: string;
  colSpan?: number;
  align?: "left" | "center";
  tone?: "default" | "secondary";
};

export function InventoryDataTable({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ScrollArea className={className}>
      <Table className="w-full overflow-hidden">{children}</Table>
    </ScrollArea>
  );
}

export function InventoryDataTableHeaderRow({
  stickySrLabel,
  cells,
  children,
  className,
}: {
  stickySrLabel?: string;
  cells?: InventoryDataTableHeaderCell[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <TableRow
      className={cn(
        "border-transparent rounded-xl bg-surface-warm/60 hover:bg-surface-warm",
        className
      )}
    >
      {stickySrLabel ? (
        <InventoryDataTableHead sticky>
          <span className="sr-only">{stickySrLabel}</span>
        </InventoryDataTableHead>
      ) : null}
      {cells?.map((cell) => (
        <InventoryDataTableHead
          key={cell.key}
          className={cell.className}
          colSpan={cell.colSpan}
          align={cell.align}
          tone={cell.tone}
          badge={cell.badge}
        >
          {cell.label}
        </InventoryDataTableHead>
      ))}
      {children}
    </TableRow>
  );
}

export function InventoryDataTableHead({
  children,
  className,
  sticky = false,
  align = "left",
  colSpan,
  tone = "default",
  badge,
}: {
  children?: ReactNode;
  className?: string;
  sticky?: boolean;
  align?: "left" | "center";
  colSpan?: number;
  tone?: "default" | "secondary";
  badge?: string;
}) {
  return (
    <TableHead
      colSpan={colSpan}
      className={cn(
        "px-3 py-3 text-foreground",
        sticky
          ? "sticky left-0 z-10 bg-surface-warm/60 pl-4 group-hover/row:bg-surface-warm rounded-tl-xl"
          : "last:rounded-tr-xl",
        align === "center" ? "text-center" : "",
        className
      )}
    >
      <span className={cn("flex items-center gap-2", align === "center" ? "justify-center" : "")}>
        <Typography
          variant={tone === "secondary" ? "caption" : "label"}
          size="sm"
          className={tone === "secondary" ? "text-secondary" : "text-foreground"}
        >
          {children}
        </Typography>
        {badge ? (
          <Badge variant="accent" size="default" className="px-2 py-0.5">
            {badge}
          </Badge>
        ) : null}
      </span>
    </TableHead>
  );
}

export function InventoryDataTableRow({
  label,
  cells,
  children,
  className,
}: {
  label?: ReactNode;
  cells?: Array<{
    key: string;
    content: ReactNode;
    className?: string;
  }>;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <TableRow className={cn("border-border/60", className)}>
      {label !== undefined ? (
        <InventoryDataTableRowLabel>{label}</InventoryDataTableRowLabel>
      ) : null}
      {cells?.map((cell) => (
        <TableCell key={cell.key} className={cn("px-3 py-2.5", cell.className)}>
          {cell.content}
        </TableCell>
      ))}
      {children}
    </TableRow>
  );
}

export function InventoryDataTableRowLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TableCell
      className={cn(
        "sticky left-0 z-[1] bg-card pl-4 pr-3 transition-colors group-hover/row:bg-muted",
        className
      )}
    >
      <Typography variant="label" size="sm" className="leading-snug text-foreground">
        {children}
      </Typography>
    </TableCell>
  );
}

export { TableBody, TableCell, TableHeader };
