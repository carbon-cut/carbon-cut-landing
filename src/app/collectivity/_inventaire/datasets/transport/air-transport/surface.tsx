"use client";

import InventoryGroupedYearTable from "../../../components/InventoryGroupedYearTable";
import MatrixTable from "../../../components/MatrixTable";
import type { InventoryGroupedYearTableData } from "../../../types";

const movementSection: InventoryGroupedYearTableData = {
  title: "Mouvements d'aeronefs",
  description:
    "Une ligne par modele d'aeronef, avec la distinction international / national dans chaque annee.",
  subcolumns: [
    { key: "international", label: "International" },
    { key: "national", label: "National" },
  ],
  rows: [
    { key: "a320", label: "Airbus A320" },
    { key: "b737", label: "Boeing 737" },
    { key: "atr72", label: "ATR 72" },
    { key: "businessJet", label: "Jet d'affaires" },
  ],
};

const movementSample: Record<string, Record<string, Record<string, string>>> = {
  a320: {
    "2022": { international: "620", national: "180" },
    "2023": { international: "710", national: "190" },
    "2024": { international: "760", national: "205" },
  },
  b737: {
    "2022": { international: "540", national: "120" },
    "2023": { international: "580", national: "124" },
    "2024": { international: "612", national: "131" },
  },
  atr72: {
    "2022": { international: "0", national: "240" },
    "2023": { international: "0", national: "266" },
    "2024": { international: "0", national: "284" },
  },
  businessJet: {
    "2022": { international: "94", national: "22" },
    "2023": { international: "101", national: "25" },
    "2024": { international: "108", national: "29" },
  },
};

const energySample = {
  "2022": {
    electricity: "3 200 000 kWh",
    diesel: "126 000 L",
    petrol: "18 000 L",
    kerosene: "41 000 000 L",
  },
  "2023": {
    electricity: "3 380 000 kWh",
    diesel: "133 000 L",
    petrol: "19 200 L",
    kerosene: "45 800 000 L",
  },
  "2024": {
    electricity: "3 520 000 kWh",
    diesel: "136 000 L",
    petrol: "20 100 L",
    kerosene: "47 200 000 L",
  },
};

export default function AirTransportSurface() {
  return (
    <div className="space-y-8">
      <InventoryGroupedYearTable
        section={movementSection}
        getValue={(rowKey, yearValue, subcolumnKey) =>
          movementSample[rowKey]?.[yearValue]?.[subcolumnKey] ?? ""
        }
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Energie / carburants aeroport"
          rows={[
            { key: "electricity", label: "Consommation electrique" },
            { key: "diesel", label: "Consommation flotte diesel" },
            { key: "petrol", label: "Consommation flotte essence" },
            { key: "kerosene", label: "Kerosene servi aux avions" },
          ]}
          getValue={(rowKey, yearValue) =>
            energySample[yearValue as keyof typeof energySample]?.[
              rowKey as keyof (typeof energySample)["2022"]
            ] ?? ""
          }
        />
      </div>
    </div>
  );
}
