"use client";

import { useState } from "react";

import GroupedYear from "@/components/table/grouped-year";
import { useScopedI18n } from "@/locales/client";
import { useInventoryContext } from "../../../context/inventory-context";
import {
  buildTerritoryVehiclesEditableRows,
  buildTerritoryVehiclesRowFields,
  buildTerritoryVehiclesSection,
} from "./config";

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
  );
}
