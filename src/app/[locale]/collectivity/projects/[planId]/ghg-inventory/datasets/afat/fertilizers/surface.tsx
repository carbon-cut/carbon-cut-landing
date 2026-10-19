"use client";

import { useMemo } from "react";
import MatrixTable from "@/components/table/matrix";
import ScalarTable from "@/components/table/scalar";
import { useScopedI18n } from "@/locales/client";
import { useInventoryContext } from "../../../context/inventory-context";
import { buildFertilizerRows, buildFertilizerTenureFields } from "./config";

export default function FertilizersSurface() {
  const { years, mainForm } = useInventoryContext();
  const tFertilizers = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.fertilizers"
  );

  const rows = useMemo(() => buildFertilizerRows(tFertilizers), [tFertilizers]);
  const tenureFields = useMemo(() => buildFertilizerTenureFields(tFertilizers), [tFertilizers]);

  return (
    <div className="space-y-6">
      <MatrixTable
        title={tFertilizers("title")}
        rows={rows}
        form={mainForm}
        baseName="afat.fertilizers.dataSet.quantity"
        years={years}
      />
      <div className="w-1/3">
        <ScalarTable title={tFertilizers("columns.tenure")} form={mainForm} fields={tenureFields} />
      </div>
    </div>
  );
}
