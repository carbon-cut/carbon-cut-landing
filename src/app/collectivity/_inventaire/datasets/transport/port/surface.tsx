"use client";

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

  const vesselCountRows = buildPortRows("vesselCount", tPort);
  const fuelConsumptionRows = buildPortRows("fuelConsumption", tPort);
  const vesselCountEditableRows = buildPortEditableRows("vesselCount", tPort);
  const fuelConsumptionEditableRows = buildPortEditableRows("fuelConsumption", tPort);
  const portsSection = buildPortSection(tPort);

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
