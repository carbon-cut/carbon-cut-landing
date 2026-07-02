"use client";

import { useState } from "react";

import GroupedYear from "@/components/table/grouped-year";
import { useScopedI18n } from "@/locales/client";
import { useInventoryContext } from "../../../context/inventory-context";
import {
  buildAgriculturalProductionEditableRows,
  buildAgriculturalProductionRowFields,
  buildAgriculturalProductionSection,
} from "./config";

export default function AgriculturalProductionSurface() {
  const { mainForm } = useInventoryContext();
  const tAgriculturalProduction = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.agriculturalProduction"
  );

  const { section, editableRows, rowFields } = useState(() => ({
    section: buildAgriculturalProductionSection(tAgriculturalProduction),
    editableRows: buildAgriculturalProductionEditableRows(tAgriculturalProduction),
    rowFields: buildAgriculturalProductionRowFields(tAgriculturalProduction),
  }))[0];

  return (
    <GroupedYear
      title={section.title}
      description={section.description}
      rows={section.rows}
      subcolumns={section.subcolumns}
      form={mainForm}
      baseName={"afat.agriculturalProduction.dataSet"}
      editableRows={editableRows}
      rowFields={rowFields}
    />
  );
}
