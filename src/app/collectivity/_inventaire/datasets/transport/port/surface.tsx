"use client";

import { useState } from "react";

import MatrixTable from "@/components/table/matrix";
import { useInventoryContext } from "../../../context/inventory-context";
import { useScopedI18n } from "@/locales/client";
import InventoryTableSection from "../../../components/InventoryTableSection";
import { buildPortEditableRows, buildPortRows, buildPortSection } from "./config";

export default function PortSurface() {
  const { mainForm } = useInventoryContext();
  const tPort = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.port"
  );

  const {
    vesselCountRows,
    fuelConsumptionRows,
    vesselCountEditableRows,
    fuelConsumptionEditableRows,
    portsSection,
  } = useState(() => ({
    vesselCountRows: buildPortRows("vesselCount", tPort),
    fuelConsumptionRows: buildPortRows("fuelConsumption", tPort),
    vesselCountEditableRows: buildPortEditableRows("vesselCount", tPort),
    fuelConsumptionEditableRows: buildPortEditableRows("fuelConsumption", tPort),
    portsSection: buildPortSection(tPort),
  }))[0];

  return (
    <div className="space-y-8">
      <MatrixTable
        title={tPort("vesselCount.title")}
        rows={vesselCountRows}
        form={mainForm}
        baseName="transport.port.dataSet.vesselCount"
        editableRows={vesselCountEditableRows}
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={tPort("fuelConsumption.title")}
          rows={fuelConsumptionRows}
          form={mainForm}
          baseName="transport.port.dataSet.fuelConsumption"
          editableRows={fuelConsumptionEditableRows}
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <InventoryTableSection section={portsSection} />
      </div>
    </div>
  );
}
