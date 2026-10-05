"use client";

import MatrixTable from "@/components/table/matrix";
import { useScopedI18n } from "@/locales/client";

import { useInventoryContext } from "../../../context/inventory-context";
import { buildPhotovoltaicRows } from "./config";

export default function PhotovoltaicSurface() {
  const { mainForm } = useInventoryContext();
  const tPhotovoltaic = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.photovoltaic"
  );

  const btRows = buildPhotovoltaicRows("bt", tPhotovoltaic);
  const mtRows = buildPhotovoltaicRows("mt", tPhotovoltaic);

  return (
    <div className="space-y-8">
      <MatrixTable
        title={tPhotovoltaic("bt.title")}
        rows={btRows}
        form={mainForm}
        baseName="energy.photovoltaic.dataSet.bt"
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={tPhotovoltaic("mt.title")}
          rows={mtRows}
          form={mainForm}
          baseName="energy.photovoltaic.dataSet.mt"
        />
      </div>
    </div>
  );
}
