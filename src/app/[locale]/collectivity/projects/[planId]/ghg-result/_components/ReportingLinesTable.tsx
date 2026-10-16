"use client";

import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useScopedI18n } from "@/locales/client";

export default function ReportingLinesTable({
  result,
}: {
  result?: CollectivityInventoryCalculationResult;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc.reportingLines");
  const lines = result?.reportingLines ?? [];
  const years = [...new Set(lines.flatMap((line) => Object.keys(line.values)))].sort();

  function exportCsv() {
    const rows = [
      [t("line"), ...years],
      ...lines.map((line) => [
        t(`labels.${line.key}` as never),
        ...years.map((year) => {
          const value = line.values[year];
          return value === undefined ? "" : value === "NE" ? t("notEstimated") : String(value);
        }),
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
      .join("\r\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reporting-lines.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (lines.length === 0) return null;

  return (
    <section aria-label={t("title")} className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{t("title")}</h2>
        <Button type="button" variant="outline" size="sm" onClick={exportCsv}>
          {t("exportCsv")}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("line")}</TableHead>
              {years.map((year) => (
                <TableHead className="text-right" key={year}>
                  {year}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((line) => (
              <TableRow key={line.key}>
                <TableHead scope="row" className="text-foreground">
                  {t(`labels.${line.key}` as never)}
                </TableHead>
                {years.map((year) => {
                  const value = line.values[year];
                  return (
                    <TableCell className="text-right tabular-nums" key={year}>
                      {value === undefined ? "—" : value === "NE" ? t("notEstimated") : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
