"use client";

import { useCallback, useMemo } from "react";

import InventoryTableInput from "@/components/table/InventoryTableInput";
import MatrixTable from "@/components/table/matrix";
import TableGrid from "@/components/table/table-grid";
import type { TableGridCellRendererArgs } from "@/components/table/table-grid/types";
import type { TName } from "@/components/ui/forms";
import { FieldAlert } from "@/components/forms";
import { useScopedI18n } from "@/locales/client";
import { type InventoryFormValues, useInventoryContext } from "../../../context/inventory-context";
import { livestock } from "../../../InventorySchema/afat/config";
import {
  buildLivestockManureManagementColumns,
  buildLivestockManureManagementRows,
  buildLivestockRows,
  buildPoultryManureManagementColumns,
  buildPoultryManureManagementRows,
} from "./config";

export default function LivestockSurface() {
  const { years, mainForm } = useInventoryContext();
  const tLivestock = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.livestock"
  );

  const rows = useMemo(() => buildLivestockRows(tLivestock), [tLivestock]);
  const manureManagementRows = useMemo(
    () => buildLivestockManureManagementRows(tLivestock),
    [tLivestock]
  );
  const manureManagementColumns = useMemo(
    () => buildLivestockManureManagementColumns(tLivestock),
    [tLivestock]
  );
  const poultryManureManagementRows = useMemo(
    () => buildPoultryManureManagementRows(tLivestock),
    [tLivestock]
  );
  const poultryManureManagementColumns = useMemo(
    () => buildPoultryManureManagementColumns(tLivestock),
    [tLivestock]
  );
  const renderManureManagementCell = useCallback(
    ({ row, column, selectedYear }: TableGridCellRendererArgs<InventoryFormValues>) => {
      if (selectedYear === undefined) return null;

      const inputName =
        `afat.livestock.dataSet.manureManagementShares.${row.original.key}.${column.key}.value.y-${selectedYear}` as TName<InventoryFormValues>;
      const rowFieldNames = livestock.manureManagementSystemKeys.map(
        (system) =>
          `afat.livestock.dataSet.manureManagementShares.${row.original.key}.${system}.value.y-${selectedYear}` as TName<InventoryFormValues>
      );

      return (
        <InventoryTableInput
          form={mainForm}
          name={inputName}
          type="number"
          unitAdornment="%"
          onChange={() => {
            void mainForm.trigger(rowFieldNames);
          }}
        />
      );
    },
    [mainForm]
  );
  const renderPoultryManureManagementCell = useCallback(
    ({ row, column, selectedYear }: TableGridCellRendererArgs<InventoryFormValues>) => {
      if (selectedYear === undefined) return null;

      const inputName =
        `afat.livestock.dataSet.poultryManureManagementShares.${row.original.key}.${column.key}.value.y-${selectedYear}` as TName<InventoryFormValues>;
      const rowFieldNames = livestock.poultryManureManagementSystemKeys.map(
        (system) =>
          `afat.livestock.dataSet.poultryManureManagementShares.${row.original.key}.${system}.value.y-${selectedYear}` as TName<InventoryFormValues>
      );

      return (
        <InventoryTableInput
          form={mainForm}
          name={inputName}
          type="number"
          unitAdornment="%"
          onChange={() => {
            void mainForm.trigger(rowFieldNames);
          }}
        />
      );
    },
    [mainForm]
  );

  return (
    <div className="space-y-6">
      <MatrixTable
        title={tLivestock("title")}
        rows={rows}
        form={mainForm}
        baseName="afat.livestock.dataSet.count"
        years={years}
      />
      <FieldAlert
        variant="note"
        title={tLivestock("manureManagement.tier2Notice.title")}
        description={tLivestock("manureManagement.tier2Notice.description")}
      />
      <TableGrid
        title={tLivestock("manureManagement.title")}
        description={tLivestock("manureManagement.description")}
        rows={manureManagementRows}
        columns={manureManagementColumns}
        form={mainForm}
        baseName="afat.livestock.dataSet.manureManagementShares"
        yearSelector={{
          datasetKey: "livestock",
          years,
          ariaLabel: tLivestock("yearSelector"),
        }}
        renderCell={renderManureManagementCell}
      />
      <TableGrid
        title={tLivestock("poultryManureManagement.title")}
        description={tLivestock("poultryManureManagement.description")}
        rows={poultryManureManagementRows}
        columns={poultryManureManagementColumns}
        form={mainForm}
        baseName="afat.livestock.dataSet.poultryManureManagementShares"
        yearSelector={{
          datasetKey: "livestock",
          years,
          ariaLabel: tLivestock("yearSelector"),
        }}
        renderCell={renderPoultryManureManagementCell}
      />
    </div>
  );
}
