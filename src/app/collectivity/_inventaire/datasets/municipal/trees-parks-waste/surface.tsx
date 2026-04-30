"use client";

import MatrixTable from "@/components/table/matrix";

const sample: Record<string, Record<string, string>> = {
  "2022": {
    urbanTrees: "18 400",
    greenWaste: "1 320 t",
    composting: "780 t",
    controlledLandfill: "540 t",
  },
  "2023": {
    urbanTrees: "18 950",
    greenWaste: "1 410 t",
    composting: "860 t",
    controlledLandfill: "550 t",
  },
  "2024": {
    urbanTrees: "19 200",
    greenWaste: "1 370 t",
    composting: "900 t",
    controlledLandfill: "470 t",
  },
};

const rows = [
  { key: "urbanTrees", label: "Nombre d'arbres urbains" },
  { key: "greenWaste", label: "Dechets verts urbains" },
  { key: "composting", label: "Destination compostage" },
  { key: "controlledLandfill", label: "Destination decharge controlee" },
];

export default function TreesParksWasteSurface() {
  return (
    <MatrixTable
      title="Arbres, parcs et dechets verts urbains"
      rows={rows}
      getValue={(rowKey, yearValue) => sample[yearValue]?.[rowKey] ?? ""}
    />
  );
}
