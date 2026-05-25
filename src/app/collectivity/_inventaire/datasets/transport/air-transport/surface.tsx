"use client";

import { useState } from "react";

import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import InventoryGroupedYearTable from "@/components/table/grouped-year";
import MatrixTable from "@/components/table/matrix";
import { useScopedI18n } from "@/locales/client";
import { buildAirTransportEnergyRows, buildAirTransportMovementSection } from "./config";

export default function AirTransportSurface() {
  const { mainForm } = useInventoryContext();
  const tAirTransport = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.airTransport"
  );

  const { movementSection, energyRows } = useState(() => ({
    movementSection: buildAirTransportMovementSection(tAirTransport),
    energyRows: buildAirTransportEnergyRows(tAirTransport),
  }))[0];

  return (
    <div className="space-y-8">
      <InventoryGroupedYearTable
        title={movementSection.title}
        description={movementSection.description}
        rows={movementSection.rows}
        subcolumns={movementSection.subcolumns}
        form={mainForm}
        baseName={"transport.airTransport.dataSet.movements"}
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={tAirTransport("energy.title")}
          rows={energyRows}
          form={mainForm}
          baseName="transport.airTransport.dataSet.energy"
        />
      </div>
    </div>
  );
}
