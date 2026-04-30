"use client";

import MatrixTable from "@/components/table/matrix";
import InventoryTableSection from "../../../components/InventoryTableSection";
import type { FleetSurfaceCopy, InventoryTableSectionData } from "../../../types";
import { useInventoryContext } from "../../../context/inventory-context";

export default function FleetSurface({ copy }: { copy: FleetSurfaceCopy }) {
  const fleetCompositionSample: Record<string, string[]> = {
    fonction: ["8", "12", "2", "3", "0", "25"],
    service: ["4", "17", "1", "2", "0", "24"],
    engins: ["1", "9", "0", "1", "2", "13"],
    autres: ["2", "6", "0", "0", "0", "8"],
  };

  const compositionSection: InventoryTableSectionData = {
    title: copy.compositionTitle,
    description: copy.compositionDescription,
    columns: copy.compositionColumns,
    rows: copy.categories.map((category) => ({
      key: category.key,
      label: category.label,
      values: fleetCompositionSample[category.key] ?? [],
    })),
  };

  const { mainForm } = useInventoryContext();

  return (
    <div className="space-y-8">
      <InventoryTableSection section={compositionSection} />
      <div className="border-t border-border/10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <MatrixTable
          title={copy.yearlyVehiclesTitle}
          rows={copy.yearlyVehiclesRows}
          form={mainForm}
          baseName={"municipal.fleet.vehicles"}
        />
        <MatrixTable
          title={copy.yearlyEnergyTitle}
          rows={copy.yearlyEnergyRows}
          form={mainForm}
          baseName={"municipal.fleet.consumption"}
        />
        <MatrixTable
          title={copy.yearlySpendTitle}
          rows={copy.yearlySpendRows}
          form={mainForm}
          baseName={"municipal.fleet.spend"}
        />
      </div>
    </div>
  );
}
