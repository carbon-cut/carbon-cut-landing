"use client";

import { useState } from "react";

import GroupedYear from "@/components/table/grouped-year";
import { FormField, FormItem, FormMessage, type TName } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";
import type { InventoryFormValues } from "../../../context/inventory-context";
import { useInventoryContext } from "../../../context/inventory-context";
import {
  buildTerritoryVehiclesEditableRows,
  buildTerritoryVehiclesRowFields,
  buildTerritoryVehiclesSection,
} from "./config";

const inventoryName = (name: string) => name as TName<InventoryFormValues>;

export default function TerritoryVehiclesSurface() {
  const { mainForm } = useInventoryContext();
  const tTerritoryVehicles = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.territoryVehicles"
  );

  const { section, editableRows, rowFields } = useState(() => ({
    section: buildTerritoryVehiclesSection(tTerritoryVehicles),
    editableRows: buildTerritoryVehiclesEditableRows(tTerritoryVehicles),
    rowFields: buildTerritoryVehiclesRowFields(tTerritoryVehicles),
  }))[0];

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
