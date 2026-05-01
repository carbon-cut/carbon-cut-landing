"use client";

import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import InventoryGroupedYearTable from "@/components/table/grouped-year";
import MatrixTable from "@/components/table/matrix";
import type { InventoryGroupedYearTableData } from "../../../types";

const aircraftModels = [
  "A300",
  "A310",
  "A319",
  "A320",
  "A321",
  "A330-200/300",
  "A340-200",
  "A340-300",
  "A340-500/600",
  "707",
  "717",
  "727",
  "727-100",
  "727-200",
  "737-100/200",
  "737-300/400/500",
  "737-600",
  "737-700",
  "737-800/900",
  "747-100",
  "747-200",
  "747-300",
  "747-400",
  "757-200",
  "757-300",
  "767-200",
  "767-300",
  "767-400",
  "777-200/300",
  "DC-10",
  "DC-8-50/60/70",
  "DC-9",
  "L-1011",
  "MD-11",
  "MD-80",
  "MD-90",
  "TU-134",
  "TU-154M",
  "TU-154 B",
  "RJ-RJ85",
  "BAE 146",
  "CRJ-100ER",
  "RJ-145",
  "Fokker 100/70/28",
  "BAC111",
  "Dornier 328Jet",
  "Gulfstream IV",
  "Gulfstream V",
  "Yak-42M",
  "Cessna 525/560",
  "Beech King Air",
  "DHCS100",
  "ATR72-500",
  "ATR42",
  "B700",
];

const movementSection: InventoryGroupedYearTableData = {
  title: "Mouvements d'aeronefs",
  description:
    "Une ligne par modele d'aeronef, avec la distinction international / national dans chaque annee.",
  subcolumns: [
    { key: "international", label: "International" },
    { key: "national", label: "National" },
  ],
  rows: aircraftModels.map((model) => ({
    key: model
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    label: model,
  })),
};

const energySample: Record<number, Record<string, string>> = {
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
  const { mainForm } = useInventoryContext();

  return (
    <div className="space-y-8">
      <InventoryGroupedYearTable
        section={movementSection}
        form={mainForm}
        baseName={"transport.airTransport.movement" as const}
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
          getValue={(rowKey, yearValue) => energySample[yearValue]?.[rowKey] ?? ""}
        />
      </div>
    </div>
  );
}
