"use client";

import MatrixTable from "../../../components/MatrixTable";
import InventoryTableSection from "../../../components/InventoryTableSection";
import type { InventoryTableSectionData } from "../../../types";

const operatorSection: InventoryTableSectionData = {
  title: "Operateurs",
  description: "La structure initiale garde les operateurs visibles comme metadonnees de travail.",
  columns: ["Operateur"],
  rows: [{ key: "operator-1", label: "Operateur 1", values: ["Regie bus metropolitaine"] }],
  editableRows: {
    addLabel: "Ajouter un operateur",
    rowLabelPrefix: "Operateur",
    minRows: 1,
    newRowValues: [""],
  },
};

const operations: Record<number, Record<string, string>> = {
  "2022": {
    buses: "324",
    fuelConsumption: "5 820 000 L",
    fuelSpend: "14 600 000 TND",
    kmTravelled: "24 800 000 km",
    staff: "1410",
    passengerKm: "452 000 000",
    passengers: "47 500 000",
  },
  "2023": {
    buses: "336",
    fuelConsumption: "5 910 000 L",
    fuelSpend: "15 880 000 TND",
    kmTravelled: "25 100 000 km",
    staff: "1440",
    passengerKm: "463 000 000",
    passengers: "48 900 000",
  },
  "2024": {
    buses: "344",
    fuelConsumption: "5 760 000 L",
    fuelSpend: "15 400 000 TND",
    kmTravelled: "25 700 000 km",
    staff: "1465",
    passengerKm: "475 000 000",
    passengers: "50 400 000",
  },
};

const renewal: Record<number, Record<string, string>> = {
  "2022": { scrapped: "14", purchased: "20", purchaseCost: "6 200 000 TND" },
  "2023": { scrapped: "18", purchased: "24", purchaseCost: "7 900 000 TND" },
  "2024": { scrapped: "10", purchased: "16", purchaseCost: "5 600 000 TND" },
};

const age: Record<number, Record<string, string>> = {
  "2022": { age0to5: "98", age6to10: "115", age10plus: "111" },
  "2023": { age0to5: "116", age6to10: "109", age10plus: "111" },
  "2024": { age0to5: "124", age6to10: "112", age10plus: "108" },
};

const futureSection: InventoryTableSectionData = {
  title: "Acquisitions / renouvellements prevus",
  columns: ["Bus prevus"],
  rows: [
    { key: "2025", label: "2025", values: ["18"] },
    { key: "2026", label: "2026", values: ["24"] },
    { key: "2027", label: "2027", values: ["20"] },
  ],
};

export default function PublicTransportSurface() {
  return (
    <div className="space-y-8">
      <InventoryTableSection section={operatorSection} />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Exploitation"
          rows={[
            { key: "buses", label: "Nombre de bus exploites" },
            { key: "fuelConsumption", label: "Consommation carburant" },
            { key: "fuelSpend", label: "Depense carburant" },
            { key: "kmTravelled", label: "Km parcourus" },
            { key: "staff", label: "Nombre d'agents" },
            { key: "passengerKm", label: "Passagers-km" },
            { key: "passengers", label: "Nombre de passagers" },
          ]}
          getValue={(rowKey, yearValue) => operations[yearValue]?.[rowKey] ?? ""}
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Renouvellement de flotte"
          rows={[
            { key: "scrapped", label: "Bus reformes / vendus" },
            { key: "purchased", label: "Bus achetes" },
            { key: "purchaseCost", label: "Cout d'achat" },
          ]}
          getValue={(rowKey, yearValue) => renewal[yearValue]?.[rowKey] ?? ""}
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Age de flotte"
          rows={[
            { key: "age0to5", label: "0-5 ans" },
            { key: "age6to10", label: "6-10 ans" },
            { key: "age10plus", label: "Plus de 10 ans" },
          ]}
          getValue={(rowKey, yearValue) => age[yearValue]?.[rowKey] ?? ""}
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <InventoryTableSection section={futureSection} />
      </div>
    </div>
  );
}
