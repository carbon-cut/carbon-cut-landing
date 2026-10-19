"use client";

import { useState } from "react";

import { useScopedI18n } from "@/locales/client";
import MatrixTable from "@/components/table/matrix";
import { useInventoryContext } from "../../../context/inventory-context";
import { buildTreesParksWasteRows } from "./config";

export default function TreesParksWasteSurface() {
  const { mainForm } = useInventoryContext();
  const tTrees = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.treesParksWaste"
  );

  const [rows] = useState(() => buildTreesParksWasteRows(tTrees));

  return (
    <MatrixTable
      title={tTrees("yearlyTitle")}
      rows={rows}
      form={mainForm}
      baseName="municipal.treesParksWaste.dataSet"
    />
  );
}
