"use client";

import { useState } from "react";

import MatrixTable from "@/components/table/matrix";
import { useScopedI18n } from "@/locales/client";
import { useInventoryContext } from "../../../context/inventory-context";
import { buildFertilizerEditableRows, buildFertilizerRows } from "./config";

export default function FertilizersSurface() {
  const { mainForm } = useInventoryContext();
  const tFertilizers = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.fertilizers"
  );

  const { rows, editableRows } = useState(() => ({
    rows: buildFertilizerRows(tFertilizers),
    editableRows: buildFertilizerEditableRows(tFertilizers),
  }))[0];

  return (
    <MatrixTable
      title={tFertilizers("title") as string}
      rows={rows}
      form={mainForm}
      baseName={"afat.fertilizers.dataSet"}
      editableRows={editableRows}
    />
  );
}
