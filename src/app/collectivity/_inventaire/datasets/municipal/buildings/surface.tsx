"use client";

import MatrixTable from "../../../components/MatrixTable";
import InventoryTableSection from "../../../components/InventoryTableSection";
import type { InventoryTableSectionData } from "../../../types";

const scopeSection: InventoryTableSectionData = {
  title: "Patrimoine couvert",
  description: "Le jeu batiments commence par la portee totale du patrimoine municipal couvert.",
  columns: ["Valeur"],
  rows: [{ key: "total-buildings", label: "Total des batiments patrimoine", values: ["148"] }],
};

const buildingYearlySample: Record<string, Record<string, string>> = {
  "2022": {
    electricityConsumption: "4 200 000 kWh",
    electricityBill: "1 780 000 TND",
    gasConsumption: "280 000 Nm3",
    gasBill: "164 000 TND",
    dieselConsumption: "96 000 L",
    dieselBill: "308 000 TND",
    otherConsumption: "18 000 unit",
    otherBill: "42 000 TND",
  },
  "2023": {
    electricityConsumption: "4 050 000 kWh",
    electricityBill: "1 910 000 TND",
    gasConsumption: "301 000 Nm3",
    gasBill: "183 000 TND",
    dieselConsumption: "91 000 L",
    dieselBill: "301 000 TND",
    otherConsumption: "15 000 unit",
    otherBill: "37 500 TND",
  },
  "2024": {
    electricityConsumption: "3 890 000 kWh",
    electricityBill: "1 860 000 TND",
    gasConsumption: "275 000 Nm3",
    gasBill: "176 000 TND",
    dieselConsumption: "84 000 L",
    dieselBill: "294 000 TND",
    otherConsumption: "12 400 unit",
    otherBill: "32 800 TND",
  },
};

const buildingRows = [
  { key: "electricityConsumption", label: "Consommation electrique" },
  { key: "electricityBill", label: "Facture electrique" },
  { key: "gasConsumption", label: "Consommation gaz naturel" },
  { key: "gasBill", label: "Facture gaz naturel" },
  { key: "dieselConsumption", label: "Consommation diesel" },
  { key: "dieselBill", label: "Facture diesel" },
  { key: "otherConsumption", label: "Autre consommation" },
  { key: "otherBill", label: "Autre facture" },
] as const;

export default function BuildingsSurface() {
  return (
    <div className="space-y-8">
      <InventoryTableSection section={scopeSection} />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Flux energetiques des batiments"
          rows={[...buildingRows]}
          getValue={(rowKey, yearValue) => buildingYearlySample[yearValue]?.[rowKey] ?? ""}
        />
      </div>
    </div>
  );
}
