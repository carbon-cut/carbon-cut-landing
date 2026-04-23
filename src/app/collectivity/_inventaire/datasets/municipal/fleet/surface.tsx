"use client";

import MatrixTable from "../../../components/MatrixTable";
import InventoryTableSection from "../../../components/InventoryTableSection";
import type { FleetSurfaceCopy, InventoryTableSectionData } from "../../../types";

const fleetCompositionSample: Record<string, string[]> = {
  fonction: ["8", "12", "2", "3", "0", "25"],
  service: ["4", "17", "1", "2", "0", "24"],
  engins: ["1", "9", "0", "1", "2", "13"],
  autres: ["2", "6", "0", "0", "0", "8"],
};

const fleetYearlySample: Record<
  string,
  {
    vehicles: Record<string, string>;
    energy: Record<string, string>;
    spend: Record<string, string>;
  }
> = {
  "2022": {
    vehicles: {
      petrol: "16",
      diesel: "46",
      electric: "2",
      hybrid: "4",
      gnv: "1",
      total: "69",
    },
    energy: {
      petrol: "13 100 L",
      diesel: "35 700 L",
      electricity: "4 400 kWh",
      gnv: "1 100 Nm3",
    },
    spend: {
      petrol: "29 800 TND",
      diesel: "88 600 TND",
      electricity: "1 700 TND",
      gnv: "2 900 TND",
    },
  },
  "2023": {
    vehicles: {
      petrol: "15",
      diesel: "44",
      electric: "3",
      hybrid: "6",
      gnv: "2",
      total: "70",
    },
    energy: {
      petrol: "12 400 L",
      diesel: "33 900 L",
      electricity: "6 800 kWh",
      gnv: "2 300 Nm3",
    },
    spend: {
      petrol: "31 000 TND",
      diesel: "94 000 TND",
      electricity: "2 900 TND",
      gnv: "5 400 TND",
    },
  },
  "2024": {
    vehicles: {
      petrol: "14",
      diesel: "41",
      electric: "5",
      hybrid: "7",
      gnv: "2",
      total: "69",
    },
    energy: {
      petrol: "11 700 L",
      diesel: "30 800 L",
      electricity: "9 200 kWh",
      gnv: "2 500 Nm3",
    },
    spend: {
      petrol: "30 500 TND",
      diesel: "91 300 TND",
      electricity: "4 200 TND",
      gnv: "5 900 TND",
    },
  },
};

export default function FleetSurface({ copy }: { copy: FleetSurfaceCopy }) {
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

  return (
    <div className="space-y-8">
      <InventoryTableSection section={compositionSection} />

      <div className="space-y-8 border-t border-border/10 pt-8">
        <MatrixTable
          title={copy.yearlyVehiclesTitle}
          rows={copy.yearlyVehiclesRows}
          getValue={(rowKey, yearValue) => fleetYearlySample[yearValue]?.vehicles[rowKey] ?? ""}
        />
        <MatrixTable
          title={copy.yearlyEnergyTitle}
          rows={copy.yearlyEnergyRows}
          getValue={(rowKey, yearValue) => fleetYearlySample[yearValue]?.energy[rowKey] ?? ""}
        />
        <MatrixTable
          title={copy.yearlySpendTitle}
          rows={copy.yearlySpendRows}
          getValue={(rowKey, yearValue) => fleetYearlySample[yearValue]?.spend[rowKey] ?? ""}
        />
      </div>
    </div>
  );
}
