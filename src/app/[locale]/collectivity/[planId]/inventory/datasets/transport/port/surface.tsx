"use client";

import MatrixTable from "@/components/table/matrix";
import { FieldHelp } from "@/components/ui/field-help";
import { useInventoryContext } from "../../../context/inventory-context";
import { useScopedI18n } from "@/locales/client";
import PriceAssumptionsTable from "../../../components/PriceAssumptionsTable";
import { buildPortRows } from "./config";
import { useState } from "react";

export default function PortSurface() {
  const { mainForm } = useInventoryContext();
  const tPort = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.port"
  );

  const { fuelRows, electricityConsumptionRows } = useState(() => ({
    fuelRows: buildPortRows("fuel", tPort),
    electricityConsumptionRows: buildPortRows("electricityConsumption", tPort),
  }))[0];

  return (
    <div className="space-y-8">
      <MatrixTable
        title={
          <span className="inline-flex items-center gap-1">
            {tPort("roundTripFuelConsumption.title")}
            <FieldHelp content={tPort("fuel.splitHelp")} />
          </span>
        }
        rows={fuelRows}
        form={mainForm}
        baseName="transport.port.dataSet.roundTripFuelConsumption"
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={tPort("outboundFuelConsumption.title")}
          rows={fuelRows}
          form={mainForm}
          baseName="transport.port.dataSet.outboundFuelConsumption"
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={tPort("electricityConsumption.title")}
          rows={electricityConsumptionRows}
          form={mainForm}
          baseName="transport.port.dataSet.electricityConsumption"
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <PriceAssumptionsTable titleKey="electricity" priceKeys={["electricity"]} />
      </div>
    </div>
  );
}
