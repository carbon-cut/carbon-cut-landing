"use client";

import MatrixTable from "@/components/table/matrix";
import { useInventoryContext } from "../../../context/inventory-context";
import { useScopedI18n } from "@/locales/client";
import { buildSolarWaterHeatingRows } from "./config";

export default function SolarWaterHeatingSurface() {
  const { mainForm } = useInventoryContext();
  const tSolarWaterHeating = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.solarWaterHeating"
  );

  const residentialRows = buildSolarWaterHeatingRows("residential", tSolarWaterHeating);
  const tertiaryRows = buildSolarWaterHeatingRows("tertiary", tSolarWaterHeating);
  const industrialRows = buildSolarWaterHeatingRows("industrial", tSolarWaterHeating);

  return (
    <div className="space-y-8">
      <MatrixTable
        title={tSolarWaterHeating("residential.title")}
        rows={residentialRows}
        form={mainForm}
        baseName="energy.solarWaterHeating.dataSet.residential"
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={tSolarWaterHeating("tertiary.title")}
          rows={tertiaryRows}
          form={mainForm}
          baseName="energy.solarWaterHeating.dataSet.tertiary"
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={tSolarWaterHeating("industrial.title")}
          rows={industrialRows}
          form={mainForm}
          baseName="energy.solarWaterHeating.dataSet.industrial"
        />
      </div>
    </div>
  );
}
