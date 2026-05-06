"use client";

import { useEffect, useMemo, useState } from "react";

import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import type { YearBlockTableProps } from "./types";
import { createInitialColumns, getCellKey } from "./helpers";

export function useYearBlockTables({ blocks }: Pick<YearBlockTableProps, "blocks">) {
  const { years } = useInventoryContext();
  const [selectedYearValue, setSelectedYearValue] = useState(years[0] ?? 0);
  const selectedYear = years.find((year) => year === selectedYearValue) ?? years[0];
  const initialColumns = useMemo(() => createInitialColumns(blocks), [blocks]);
  const [columnsByBlock, setColumnsByBlock] = useState(initialColumns);

  useEffect(() => {
    if (!years.length) return;

    setSelectedYearValue((currentYearValue) =>
      years.some((year) => year === currentYearValue) ? currentYearValue : years[0]
    );
  }, [years]);

  useEffect(() => {
    setColumnsByBlock((currentColumnsByBlock) => {
      let hasNewBlock = false;
      const nextColumnsByBlock = { ...currentColumnsByBlock };

      for (const block of blocks) {
        if (nextColumnsByBlock[block.key]) continue;

        nextColumnsByBlock[block.key] = block.columns;
        hasNewBlock = true;
      }

      return hasNewBlock ? nextColumnsByBlock : currentColumnsByBlock;
    });
  }, [blocks]);

  const initialValues = useMemo(() => {
    const nextValues: Record<string, string> = {};

    for (const year of years) {
      for (const block of blocks) {
        for (const row of block.rows) {
          for (const column of block.columns) {
            if (column.calculated) continue;

            /*  nextValues[getCellKey(year, block.key, row.key, column.key)] = getValue(
              block.key,
              row.key,
              column.key,
              year
            ); */
          }
        }
      }
    }

    return nextValues;
  }, [blocks /* getValue */, , years]);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues((currentValues) => {
      let hasNewValue = false;
      const nextValues = { ...currentValues };

      for (const [key, value] of Object.entries(initialValues)) {
        if (key in nextValues) continue;

        nextValues[key] = value;
        hasNewValue = true;
      }

      return hasNewValue ? nextValues : currentValues;
    });
  }, [initialValues]);

  const handleValueChange = (
    yearValue: number,
    blockKey: string,
    rowKey: string,
    columnKey: string,
    value: string
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [getCellKey(yearValue, blockKey, rowKey, columnKey)]: value,
    }));
  };

  const handleAddColumn = (blockKey: string) => {
    setColumnsByBlock((currentColumnsByBlock) => {
      const columns = currentColumnsByBlock[blockKey] ?? [];
      const totalColumnIndex = columns.findIndex((column) => column.calculated);
      const insertionIndex = totalColumnIndex === -1 ? columns.length : totalColumnIndex;
      const customColumnCount = columns.filter((column) => column.key.startsWith("custom-")).length;
      const nextColumn = {
        key: `custom-${Date.now()}`,
        label: `??? ${customColumnCount + 1}`,
      };

      return {
        ...currentColumnsByBlock,
        [blockKey]: [
          ...columns.slice(0, insertionIndex),
          nextColumn,
          ...columns.slice(insertionIndex),
        ],
      };
    });
  };

  const handleRemoveColumn = (blockKey: string, columnKey: string) => {
    setColumnsByBlock((currentColumnsByBlock) => {
      const columns = currentColumnsByBlock[blockKey] ?? [];
      const editableColumnCount = columns.filter((column) => !column.calculated).length;

      if (editableColumnCount <= 1) return currentColumnsByBlock;

      return {
        ...currentColumnsByBlock,
        [blockKey]: columns.filter((column) => column.key !== columnKey),
      };
    });
  };

  const handleColumnLabelChange = (blockKey: string, columnKey: string, label: string) => {
    setColumnsByBlock((currentColumnsByBlock) => ({
      ...currentColumnsByBlock,
      [blockKey]: (currentColumnsByBlock[blockKey] ?? []).map((column) =>
        column.key === columnKey ? { ...column, label } : column
      ),
    }));
  };

  return {
    years,
    selectedYear,
    blocks,
    columnsByBlock,
    values,
    setSelectedYearValue,
    handleAddColumn,
    handleRemoveColumn,
    handleColumnLabelChange,
    handleValueChange,
  };
}
