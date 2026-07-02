"use client";

import { useState } from "react";

import MatrixTable from "@/components/table/matrix";
import { useScopedI18n } from "@/locales/client";
import { useInventoryContext } from "../../../context/inventory-context";
import { buildLivestockRows } from "./config";

export default function LivestockSurface() {
  const { mainForm } = useInventoryContext();
  const tLivestock = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.livestock"
  );

  const rows = useState(() => buildLivestockRows(tLivestock))[0];

  return (
    <div className="space-y-6">
      <MatrixTable
        title={tLivestock("title") as string}
        rows={rows}
        form={mainForm}
        baseName={"afat.livestock.dataSet.headcount"}
      />

      {/* TODO: develop the species-dependent confined-time-share (%) block. */}
    </div>
  );
}
