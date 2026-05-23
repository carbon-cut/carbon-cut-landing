"use client";

import { useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";

import MatrixTable from "@/components/table/matrix";
import TableGrid from "@/components/table/table-grid";
import { useInventoryContext } from "../../../context/inventory-context";
import { useScopedI18n } from "@/locales/client";
import {
  buildPortEditableRows,
  buildPortFuelRowFields,
  buildPortRows,
  buildPortSection,
} from "./config";

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
    fuelConsumptionRowFields,
    portsSection,
  } = useState(() => ({
    vesselCountRows: buildPortRows("vesselCount", tPort),
    fuelConsumptionRows: buildPortRows("fuelConsumption", tPort),
    vesselCountEditableRows: buildPortEditableRows("vesselCount", tPort),
    fuelConsumptionEditableRows: buildPortEditableRows("fuelConsumption", tPort),
    fuelConsumptionRowFields: buildPortFuelRowFields(tPort),
    portsSection: buildPortSection(tPort),
  }))[0];

  const { fields, append, remove } = useFieldArray({
    control: mainForm.control,
    name: "transport.port.dataSet.concernedPorts",
  });

  const portRows = useMemo(
    () =>
      fields.map((field, index) => ({
        id: field.id,
        key: field.key || `port-${index}`,
        label: `${portsSection.editableRows?.rowLabelPrefix ?? ""} ${index + 1}`.trim(),
        unit: "",
      })),
    [fields, portsSection.editableRows?.rowLabelPrefix]
  );

  return (
    <div className="space-y-8">
      <div className="border-t border-border/10 pt-8">
        <TableGrid
          title={portsSection.title}
          description={portsSection.description}
          rows={portRows}
          columns={portsSection.columns}
          form={mainForm}
          baseName={portsSection.fieldBaseName}
          addRow={{
            label: portsSection.editableRows?.addLabel ?? "",
            onAdd: () => append({ key: "" }, { shouldFocus: true }),
          }}
          editableRows={{
            minRows: portsSection.editableRows?.minRows ?? 0,
            onRemoveRow: remove,
          }}
        />
      </div>
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
          rowFields={fuelConsumptionRowFields}
        />
      </div>
    </div>
  );
}
