"use client";

import { useScopedI18n } from "@/locales/client";
import CollectivityMetadataScopeControl from "@/app/collectivity/_components/metadata/CollectivityMetadataScopeControl";
import MatrixTable from "@/components/table/matrix";
import InventoryTableSection from "../../../components/InventoryTableSection";
import { useInventoryContext } from "../../../context/inventory-context";
import type { FleetSurfaceCopy, InventoryTableSectionData } from "../../../types";
import { buildFleetRows } from "./config";
import { useState } from "react";

export default function FleetSurface({ copy }: { copy: FleetSurfaceCopy }) {
  const { mainForm } = useInventoryContext();
  const tFleet = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.fleet"
  );

  const [rows] = useState(() => ({
    category: buildFleetRows("category", tFleet),
    fuel: buildFleetRows("fuel", tFleet),
    engine: buildFleetRows("engine", tFleet),
    spend: buildFleetRows("spend", tFleet),
    priceAssumptions: buildFleetRows("priceAssumptions", tFleet),
  }));
  const compositionSection: InventoryTableSectionData = {
    title: copy.compositionTitle,
    description: copy.compositionDescription,
    fieldBaseName: "municipal.fleet.dataSet.composition",
    yearSelector: {},
    columns: rows.engine,
    rows: rows.category,
  };

  return (
    <div className="space-y-6">
      {/*       <CollectivityMetadataScopeControl
        form={mainForm}
        name={"municipal.fleet.metadata"}
        drawerTitle="Métadonnées de flotte"
        drawerDescription="Renseignez la provenance et la qualité pour la flotte municipale."
      /> */}
      <InventoryTableSection section={compositionSection} />
      <div className="grid grid-cols-1 gap-6 border-t border-border/10 pt-6 md:grid-cols-2">
        <MatrixTable
          title={copy.yearlyVehiclesTitle}
          rows={rows.engine}
          form={mainForm}
          baseName={"municipal.fleet.dataSet.vehicles"}
        />
        <MatrixTable
          title={copy.yearlyEnergyTitle}
          rows={rows.fuel}
          form={mainForm}
          baseName={"municipal.fleet.dataSet.consumption"}
        />
        <MatrixTable
          title={copy.yearlySpendTitle}
          rows={rows.spend}
          form={mainForm}
          baseName={"municipal.fleet.dataSet.spend"}
        />
        <MatrixTable
          title={tFleet("priceAssumptionsTitle")}
          rows={rows.priceAssumptions}
          form={mainForm}
          baseName={"priceAssumptions.energy"}
        />
      </div>
    </div>
  );
}
