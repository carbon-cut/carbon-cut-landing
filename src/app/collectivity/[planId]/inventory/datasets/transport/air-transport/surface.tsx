"use client";

import { useEffect, useMemo, useState } from "react";

import { useInventoryContext } from "@/app/collectivity/[planId]/inventory/context/inventory-context";
import { InventoryYearErrors } from "@/app/collectivity/[planId]/inventory/components/InventoryYearSelector";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import InventoryGroupedYearTable from "@/components/table/grouped-year";
import MatrixTable from "@/components/table/matrix";
import { useScopedI18n } from "@/locales/client";
import { buildAirTransportEnergyRows, buildAirTransportMovementSection } from "./config";
import type { InventoryTableRow } from "../../../types";

type SupportedValue = {
  value: string;
  label: string;
  selector: Record<string, string>;
};

type SupportedValuesResponse = {
  data?: {
    values?: SupportedValue[];
  };
};

function toAircraftRowKey(value: string) {
  return `a-${encodeURIComponent(value).replaceAll(".", "%2E")}`;
}

export default function AirTransportSurface() {
  const { years, mainForm } = useInventoryContext();
  const tAirTransport = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.airTransport"
  );
  const [aircraftRows, setAircraftRows] = useState<InventoryTableRow[]>([]);

  const energyRows = useMemo(() => buildAirTransportEnergyRows(tAirTransport), [tAirTransport]);
  const movementSection = useMemo(
    () => buildAirTransportMovementSection(aircraftRows, tAirTransport),
    [aircraftRows, tAirTransport]
  );

  useEffect(() => {
    let active = true;

    const loadAircraftRows = async () => {
      try {
        const response = await fetch("/api/collectivity/supported-values/ef-lto/aircraft", {
          credentials: "same-origin",
        });
        const payload = (await response.json()) as SupportedValuesResponse;

        if (!response.ok || !payload.data?.values || !active) {
          return;
        }

        setAircraftRows(
          payload.data.values.map((entry) => ({
            key: toAircraftRowKey(entry.value),
            label: entry.label,
            unit: null,
          }))
        );
      } catch {
        if (!active) {
          return;
        }

        setAircraftRows([]);
      }
    };

    void loadAircraftRows();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <InventoryYearErrors datasetKey="air-transport" years={years}>
        {(errorYears) =>
          errorYears.length > 0 ? (
            <Alert variant="destructive">
              <AlertTitle>{tAirTransport("surface.readinessTitle")}</AlertTitle>
              <AlertDescription>
                {tAirTransport("surface.readinessDescription", {
                  years: errorYears.join(", "),
                })}
              </AlertDescription>
            </Alert>
          ) : null
        }
      </InventoryYearErrors>
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
