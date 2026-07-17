"use client";

import GroupedYear from "@/components/table/grouped-year";
import { useScopedI18n } from "@/locales/client";
import { useInventoryContext } from "../../../context/inventory-context";
import {
  buildPerennialPlantationEditableRows,
  buildPerennialPlantationRowFields,
  buildPerennialPlantationSection,
} from "./config";

export default function PerennialPlantationStockSurface() {
  const { mainForm } = useInventoryContext();
  const tPlantations = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.perennialPlantationStock"
  );

  const section = buildPerennialPlantationSection(tPlantations);
  const editableRows = buildPerennialPlantationEditableRows(tPlantations);
  const rowFields = buildPerennialPlantationRowFields(tPlantations);

  return (
    <GroupedYear
      title={section.title}
      description={section.description}
      rows={section.rows}
      subcolumns={section.subcolumns}
      form={mainForm}
      baseName={"afat.perennialPlantationStock.dataSet"}
      editableRows={editableRows}
      rowFields={rowFields}
    />
  );
}
