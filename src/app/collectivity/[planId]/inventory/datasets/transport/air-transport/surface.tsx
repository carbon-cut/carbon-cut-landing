"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useInventoryContext } from "@/app/collectivity/[planId]/inventory/context/inventory-context";
import { InventoryYearErrors } from "@/app/collectivity/[planId]/inventory/components/InventoryYearSelector";
import {
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchCollectivitySupportedValues,
} from "@/app/collectivity/_lib/queries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import InventoryGroupedYearTable from "@/components/table/grouped-year";
import MatrixTable from "@/components/table/matrix";
import { useScopedI18n } from "@/locales/client";
import { buildAirTransportEnergyRows, buildAirTransportMovementSection } from "./config";
import type { InventoryTableRow } from "../../../types";

function toAircraftRowKey(value: string) {
  return `a-${encodeURIComponent(value).replaceAll(".", "%2E")}`;
}

export default function AirTransportSurface() {
  const { years, mainForm } = useInventoryContext();
  const tAirTransport = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.airTransport"
  );
  const aircraftValuesQuery = useQuery({
    ...collectivityQueryOptions,
    queryKey: collectivityQueryKeys.supportedValues("ef-lto", "aircraft"),
    queryFn: () => fetchCollectivitySupportedValues("ef-lto", "aircraft"),
  });

  const energyRows = useMemo(() => buildAirTransportEnergyRows(tAirTransport), [tAirTransport]);
  const aircraftRows = useMemo<InventoryTableRow[]>(
    () =>
      aircraftValuesQuery.data?.values.map((entry) => ({
        key: toAircraftRowKey(entry.value),
        label: entry.label,
        unit: null,
      })) ?? [],
    [aircraftValuesQuery.data]
  );
  const movementSection = useMemo(
    () => buildAirTransportMovementSection(aircraftRows, tAirTransport),
    [aircraftRows, tAirTransport]
  );

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
        loadingRows={{
          isLoading: aircraftValuesQuery.isLoading,
          count: 8,
        }}
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
