"use client";

import { useMemo } from "react";

import BlockTable from "./block-table";
import { YearBlockHeader } from "./header";
import { useYearBlockTables } from "./useYearBlockTables";
import type { YearBlockTableProps } from "./types";

export default function InventoryYearBlockTables({
  title,
  description,
  blocks,
  getValue,
  renderBlockHeaderAddon,
}: YearBlockTableProps) {
  const {
    years,
    selectedYear,
    columnsByBlock,
    values,
    handleAddColumn,
    handleRemoveColumn,
    handleColumnLabelChange,
    handleValueChange,
    setSelectedYearValue,
  } = useYearBlockTables({ blocks, getValue });

  const yearTabs = useMemo(
    () =>
      years.map((year) => (
        <button
          key={year}
          type="button"
          role="tab"
          aria-selected={year === selectedYear}
          className={
            "text-sm font-semibold text-secondary underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" +
            (year === selectedYear ? " text-foreground underline" : "")
          }
          onClick={() => setSelectedYearValue(year)}
        >
          {year}
        </button>
      )),
    [selectedYear, setSelectedYearValue, years]
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <YearBlockHeader title={title} description={description} />
        </div>
        <div role="tablist" aria-label="Annees" className="flex flex-wrap justify-end gap-3">
          {yearTabs}
        </div>
      </div>

      {selectedYear ? (
        <section className="space-y-6">
          {blocks.map((block) => (
            <BlockTable
              key={`${selectedYear}-${block.key}`}
              block={block}
              columns={columnsByBlock[block.key] ?? block.columns}
              year={selectedYear}
              yearLabel={String(selectedYear)}
              values={values}
              headerAddon={renderBlockHeaderAddon?.(block)}
              onAddColumn={handleAddColumn}
              onRemoveColumn={handleRemoveColumn}
              onColumnLabelChange={handleColumnLabelChange}
              onValueChange={handleValueChange}
            />
          ))}
        </section>
      ) : null}
    </section>
  );
}
