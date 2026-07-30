"use client";

import { useMemo } from "react";

import GroupedYear from "@/components/table/grouped-year";
import { FormField, FormItem, FormMessage, type TName } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";
import type { InventoryFormValues } from "../../../context/inventory-context";
import { useInventoryContext } from "../../../context/inventory-context";
import {
  buildTerritoryVehiclesEditableRows,
  buildTerritoryVehiclesRowFields,
  buildTerritoryVehiclesSection,
  buildTerritoryVehicleTypeOptions,
  type TerritoryVehicleRow,
} from "./config";
import TerritoryVehiclesAddRow from "./add-row";

const inventoryName = (name: string) => name as TName<InventoryFormValues>;

export default function TerritoryVehiclesSurface() {
  const { mainForm } = useInventoryContext();
  const tTerritoryVehicles = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.territoryVehicles"
  );

  const { section, rowFields } = useMemo(
    () => ({
      section: buildTerritoryVehiclesSection(tTerritoryVehicles),
      rowFields: buildTerritoryVehiclesRowFields(tTerritoryVehicles),
    }),
    [tTerritoryVehicles]
  );
  const vehicleTypeOptions = useMemo(
    () => buildTerritoryVehicleTypeOptions(tTerritoryVehicles),
    [tTerritoryVehicles]
  );
  const editableRows = useMemo(() => {
    const base = buildTerritoryVehiclesEditableRows(tTerritoryVehicles);

    return {
      ...base,
      showAddButton: false,
      renderFooterContent: ({
        insertRow,
        rows,
      }: {
        insertRow: (index: number, row: Record<string, unknown>) => void;
        rows: unknown[];
      }) => (
        <TerritoryVehiclesAddRow
          rows={rows as TerritoryVehicleRow[]}
          vehicleTypePlaceholder={tTerritoryVehicles("fields.vehicleTypePlaceholder")}
          fuelPlaceholder={tTerritoryVehicles("fields.fuelPlaceholder")}
          vehicleTypeOptions={vehicleTypeOptions}
          addLabel={base.addLabel}
          labelFunc={tTerritoryVehicles}
          insertRow={insertRow}
        />
      ),
    };
  }, [tTerritoryVehicles, vehicleTypeOptions]);

  return (
    <FormField
      control={mainForm.control}
      name={inventoryName("transport.territoryVehicles.dataSet.rows")}
      render={() => (
        <FormItem>
          <GroupedYear
            title={section.title}
            description={section.description}
            rows={section.rows}
            subcolumns={section.subcolumns}
            form={mainForm}
            baseName="transport.territoryVehicles.dataSet.rows"
            editableRows={editableRows}
            rowFields={rowFields}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
