"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchCollectivityInventoryResult,
} from "@/app/collectivity/_lib/queries";

type ResultRouteClientProps = {
  projectSlug: string;
};

type ResultRow = {
  key: string;
  label: string;
  years: Record<string, { value: number; unit: string }>;
};

function findResultRows(value: unknown): ResultRow[] {
  if (!value || typeof value !== "object") {
    return [];
  }

  if ("resultRows" in value && Array.isArray((value as { resultRows?: unknown }).resultRows)) {
    return (value as { resultRows: ResultRow[] }).resultRows;
  }

  for (const nestedValue of Object.values(value)) {
    const rows = findResultRows(nestedValue);

    if (rows.length > 0) {
      return rows;
    }
  }

  return [];
}

export default function ResultRouteClient({ projectSlug }: ResultRouteClientProps) {
  const { data } = useQuery({
    ...collectivityQueryOptions,
    queryKey: collectivityQueryKeys.result(projectSlug),
    queryFn: () => fetchCollectivityInventoryResult(projectSlug),
  });
  const rows = useMemo(() => findResultRows(data), [data]);

  return (
    <section className="p-6">
      <table className="w-full border-collapse bg-card text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b border-border">
              <td className="p-3 font-mono">{row.key}</td>
              <td className="p-3">{row.label}</td>
              {Object.entries(row.years).map(([year, result]) => (
                <td key={year} className="p-3 text-right">
                  {result.value.toFixed(2)} {result.unit}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
