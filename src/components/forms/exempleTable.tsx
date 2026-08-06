"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Upload, PaperclipIcon, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Column {
  key: string;
  label: string;
  year?: number;
  isEditable: boolean;
  status?: "draft" | "locked" | "validated";
}

interface Row {
  id: string;
  [key: string]: any;
}

interface DataTableSourceProps {
  source: string;
  title: string;
  description: string;
  status: "draft" | "estimated" | "validated";
  columns: Column[];
  rows: Row[];
  rowLabels: string[]; // Labels for row names
  onAddRow?: () => void;
  onUpdateCell?: (rowId: string, columnKey: string, value: any) => void;
  onImport?: () => void;
  onAttachFiles?: () => void;
  fileCount?: number;
}

export function DataTableSource({
  source,
  title,
  description,
  status,
  columns,
  rows,
  rowLabels,
  onAddRow,
  onUpdateCell,
  onImport,
  onAttachFiles,
  fileCount = 0,
}: DataTableSourceProps) {
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnKey: string;
  } | null>(null);

  const statusColors = {
    draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    estimated: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    validated: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
          </div>
          <Badge className={statusColors[status]}>{status}</Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {onImport && (
            <Button variant="outline" size="sm" onClick={onImport} className="gap-2">
              <Upload className="h-4 w-4" />
              Import CSV
            </Button>
          )}
          {onAttachFiles && (
            <Button variant="outline" size="sm" onClick={onAttachFiles} className="gap-2">
              <PaperclipIcon className="h-4 w-4" />
              {fileCount > 0 ? `Files (${fileCount})` : "Attach"}
            </Button>
          )}
          {onAddRow && (
            <Button variant="outline" size="sm" onClick={onAddRow} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Row
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-600">
              <th className="text-left py-3 px-3 font-medium text-slate-700 dark:text-slate-300 w-32">
                {rowLabels[0] || "Category"}
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-center py-3 px-2 font-medium text-slate-700 dark:text-slate-300 ${
                    col.status === "locked" ? "bg-slate-50 dark:bg-slate-700" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{col.label}</span>
                    {col.year && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">{col.year}</span>
                    )}
                    {col.status === "locked" && <Lock className="h-3 w-3 text-slate-400" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <td className="py-3 px-3 text-slate-900 dark:text-white font-medium">
                  {rowLabels[rowIndex] || row.id}
                </td>
                {columns.map((col) => (
                  <td
                    key={`${row.id}-${col.key}`}
                    className={`py-3 px-2 text-center ${
                      col.status === "locked" ? "bg-slate-50 dark:bg-slate-700" : ""
                    }`}
                    onClick={() => {
                      if (col.isEditable && col.status !== "locked") {
                        setEditingCell({ rowId: row.id, columnKey: col.key });
                      }
                    }}
                  >
                    {editingCell?.rowId === row.id && editingCell?.columnKey === col.key ? (
                      <Input
                        type="number"
                        value={row[col.key] || ""}
                        onChange={(e) => {
                          const newValue =
                            e.target.value === "" ? null : parseFloat(e.target.value);
                          onUpdateCell?.(row.id, col.key, newValue);
                        }}
                        onBlur={() => setEditingCell(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setEditingCell(null);
                          if (e.key === "Escape") setEditingCell(null);
                        }}
                        autoFocus
                        className="h-8 w-20 text-center"
                      />
                    ) : (
                      <span className="text-slate-900 dark:text-white cursor-pointer hover:underline">
                        {row[col.key]?.toLocaleString() || "—"}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
