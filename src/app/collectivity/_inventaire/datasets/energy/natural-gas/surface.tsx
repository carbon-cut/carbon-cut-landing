"use client";

import InventoryYearBlockTables from "@/components/table/year-block";
import type { InventoryYearBlockTableBlock } from "../../../types";
import { useInventoryContext } from "../../../context/inventory-context";
import { useScopedI18n } from "@/locales/client";
import { buildNaturalGasColumns, buildNaturalGasRows } from "./config";
import { useState } from "react";

const blocksKeys = ["bp", "mp", "hp"] as const;

export default function NaturalGasSurface() {
  const { mainForm } = useInventoryContext();

  const tNaturalGas = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.naturalGas"
  );
  const realBlocks: InventoryYearBlockTableBlock[] = useState(() =>
    blocksKeys.map((key) => {
      return {
        key,
        title: tNaturalGas(`${key}.title`),
        columns: buildNaturalGasColumns(key, tNaturalGas),
        rows: buildNaturalGasRows(key, tNaturalGas),
        editableColumns: true,
      };
    })
  )[0];

  return (
    <section className="space-y-4">
      <InventoryYearBlockTables
        title={tNaturalGas("surface.title")}
        blocks={realBlocks}
        form={mainForm}
        baseName="energy.naturalGas.dataSet"
      />
    </section>
  );
}
