"use client";

import InventoryYearBlockTables from "@/components/table/year-block";
import type { InventoryYearBlockTableBlock } from "../../../types";
import { useInventoryContext } from "../../../context/inventory-context";
import { useScopedI18n } from "@/locales/client";
import { buildElectricityColumns, buildElectricityRows } from "./config";
import { useState } from "react";

const blocksKeys = ["lt", "mt", "ht"] as const;

export default function ElectricitySurface() {
  const { mainForm } = useInventoryContext();

  const tElectricity = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.electricity"
  );
  const realBlocks: InventoryYearBlockTableBlock[] = useState(() =>
    blocksKeys.map((key) => {
      return {
        key,
        title: tElectricity(`${key}.title`),
        columns: buildElectricityColumns(key, tElectricity),
        rows: buildElectricityRows(key, tElectricity),
        editableColumns: true,
      };
    })
  )[0];

  return (
    <section className="space-y-4">
      <InventoryYearBlockTables
        title={tElectricity("surface.title")}
        blocks={realBlocks}
        form={mainForm}
        baseName="energy.electricity.dataSet"
      />
    </section>
  );
}
