"use client";

import MatrixTable from "@/components/table/matrix";
import InventoryTableSection from "../../../components/InventoryTableSection";
import type { InventoryTableSectionData, PublicLightingSurfaceCopy } from "../../../types";

const lightingInfrastructureSample: Record<string, string> = {
  cabinets: "184",
  meters: "196",
  dimmers: "38",
  power: "1 420 kW",
};

const lightingLampsSample: Record<string, string[]> = {
  shp: ["250", "1 180"],
  hpl: ["125", "640"],
  led: ["70", "2 460"],
};

const lightingYearlySample: Record<string, Record<string, string>> = {
  "2022": {
    consumption: "2 690 000 kWh",
    bill: "1 180 000 TND",
  },
  "2023": {
    consumption: "2 480 000 kWh",
    bill: "1 210 000 TND",
  },
  "2024": {
    consumption: "2 210 000 kWh",
    bill: "1 090 000 TND",
  },
};

export default function PublicLightingSurface({ copy }: { copy: PublicLightingSurfaceCopy }) {
  const infrastructureSection: InventoryTableSectionData = {
    title: copy.infrastructureTitle,
    description: copy.infrastructureDescription,
    columns: [copy.valueColumn],
    rows: copy.infrastructureRows.map((row) => ({
      key: row.key,
      label: row.label,
      values: [lightingInfrastructureSample[row.key] ?? ""],
    })),
  };

  const lampSection: InventoryTableSectionData = {
    title: copy.lampsTitle,
    description: copy.lampsDescription,
    columns: copy.lampsColumns,
    rows: copy.lampRows.map((row) => ({
      key: row.key,
      label: row.label,
      values: lightingLampsSample[row.key] ?? [],
    })),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InventoryTableSection section={infrastructureSection} />

      <InventoryTableSection section={lampSection} />

      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title={copy.yearlyTitle}
          rows={copy.yearlyRows}
          getValue={(rowKey, yearValue) => lightingYearlySample[yearValue]?.[rowKey] ?? ""}
        />
      </div>
    </div>
  );
}
