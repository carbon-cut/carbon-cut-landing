"use client";

import MatrixTable from "../../../components/MatrixTable";
import InventoryTableSection from "../../../components/InventoryTableSection";
import type { InventoryTableSectionData } from "../../../types";

const portsSection: InventoryTableSectionData = {
  title: "Ports concernes",
  description:
    "Le rapport source liste les ports concernes; la structure initiale les garde visibles comme metadonnees de travail.",
  columns: ["Port"],
  rows: [
    { key: "port-1", label: "Port 1", values: ["Port de peche nord"] },
    { key: "port-2", label: "Port 2", values: ["Marina sud"] },
    { key: "port-3", label: "Port 3", values: ["Port industriel"] },
    { key: "port-4", label: "Port 4", values: ["Port artisanal"] },
    { key: "port-5", label: "Port 5", values: ["Darse secondaire"] },
  ],
};

const vesselSample = {
  "2022": { leisure: "84", fishing: "212", other: "18" },
  "2023": { leisure: "89", fishing: "219", other: "20" },
  "2024": { leisure: "92", fishing: "224", other: "23" },
};

const fuelSample = {
  "2022": { leisure: "41000", fishing: "620000", other: "95000" },
  "2023": { leisure: "43800", fishing: "655000", other: "101000" },
  "2024": { leisure: "45200", fishing: "672000", other: "108000" },
};

export default function PortSurface() {
  return (
    <div className="space-y-8">
      <MatrixTable
        title="Nombre de bateaux / barges"
        rows={[
          { key: "leisure", label: "Plaisance" },
          { key: "fishing", label: "Peche" },
          { key: "other", label: "Autre" },
        ]}
        getValue={(rowKey, yearValue) =>
          vesselSample[yearValue as keyof typeof vesselSample]?.[
            rowKey as "leisure" | "fishing" | "other"
          ] ?? ""
        }
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Consommation de carburant dans le perimetre (L)"
          rows={[
            { key: "leisure", label: "Plaisance" },
            { key: "fishing", label: "Peche" },
            { key: "other", label: "Autre" },
          ]}
          getValue={(rowKey, yearValue) =>
            fuelSample[yearValue as keyof typeof fuelSample]?.[
              rowKey as "leisure" | "fishing" | "other"
            ] ?? ""
          }
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <InventoryTableSection section={portsSection} />
      </div>
    </div>
  );
}
