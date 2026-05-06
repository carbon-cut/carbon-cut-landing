"use client";

import YearSelector from "../year-selector";
import BlockTable from "./block-table";
import { YearBlockHeader } from "./header";
import { useYearBlockTables } from "./useYearBlockTables";
import type { YearBlockTableFormProps } from "./types";
import { FieldValues } from "react-hook-form";

export default function InventoryYearBlockTables<T extends FieldValues>({
  title,
  description,
  blocks,
  renderBlockHeaderAddon,
  form,
  baseName,
}: YearBlockTableFormProps<T>) {
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
  } = useYearBlockTables({ blocks });

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <YearBlockHeader title={title} description={description} />
        </div>
        <YearSelector
          years={years}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYearValue}
          className="flex flex-wrap justify-end gap-3"
        />
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
              headerAddon={renderBlockHeaderAddon?.(block)}
              onAddColumn={handleAddColumn}
              onRemoveColumn={handleRemoveColumn}
              onColumnLabelChange={handleColumnLabelChange}
              form={form}
              baseName={baseName}
            />
          ))}
        </section>
      ) : null}
    </section>
  );
}
