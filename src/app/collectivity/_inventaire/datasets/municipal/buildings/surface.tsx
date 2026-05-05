"use client";

import { useState } from "react";

import { useScopedI18n } from "@/locales/client";
import MatrixTable from "@/components/table/matrix";
import { useInventoryContext } from "../../../context/inventory-context";
import { buildBuildingsRows } from "./config";

export default function BuildingsSurface() {
  const { mainForm } = useInventoryContext();
  const tBuildings = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.buildings"
  );
  const [rows] = useState(() => ({
    areas: buildBuildingsRows("areas", tBuildings),
    consumption: buildBuildingsRows("consumption", tBuildings),
  }));

  return (
    <div className="space-y-8">
      <MatrixTable
        title={tBuildings("areasTitle")}
        rows={rows.areas}
        form={mainForm}
        baseName="municipal.buildings.dataSet.areas"
      />
      <MatrixTable
        title={tBuildings("consumptionTitle")}
        rows={rows.consumption}
        form={mainForm}
        baseName="municipal.buildings.dataSet.consumption"
      />
    </div>
  );
}
