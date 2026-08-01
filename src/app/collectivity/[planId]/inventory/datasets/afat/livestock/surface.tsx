"use client";

import { useMemo } from "react";

import MatrixTable from "@/components/table/matrix";
import ScalarTable from "@/components/table/scalar";
import { useScopedI18n } from "@/locales/client";
import { useInventoryContext } from "../../../context/inventory-context";
import { buildLivestockConfinedTimeShareFields, buildLivestockRows } from "./config";

export default function LivestockSurface() {
  const { years, mainForm } = useInventoryContext();
  const tLivestock = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.livestock"
  );

  const rows = useMemo(() => buildLivestockRows(tLivestock), [tLivestock]);
  const confinedTimeShareFields = useMemo(
    () => buildLivestockConfinedTimeShareFields(tLivestock),
    [tLivestock]
  );

  return (
    <div className="space-y-6">
      <MatrixTable
        title={tLivestock("title")}
        rows={rows}
        form={mainForm}
        baseName="afat.livestock.dataSet.count"
        years={years}
      />
      <div className="w-1/3">
        <ScalarTable
          title={tLivestock("columns.confinedTimeShare")}
          help={tLivestock("confinedTimeShareHelp")}
          form={mainForm}
          fields={confinedTimeShareFields}
        />
      </div>
    </div>
  );
}
