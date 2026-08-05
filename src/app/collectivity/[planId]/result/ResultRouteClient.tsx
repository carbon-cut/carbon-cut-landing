"use client";

import { useEffect, useState } from "react";

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
  const [rows, setRows] = useState<ResultRow[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadResult() {
      const response = await fetch(
        `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/result`,
        {
          credentials: "same-origin",
        }
      );
      const payload = await response.json();

      if (!isMounted) {
        return;
      }

      setRows(findResultRows(payload));
    }

    void loadResult();

    return () => {
      isMounted = false;
    };
  }, [projectSlug]);

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
