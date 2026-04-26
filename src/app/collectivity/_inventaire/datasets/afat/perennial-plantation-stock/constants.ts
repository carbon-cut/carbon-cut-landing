export const customPlantValue = "__custom__";

export const plantOptions = [
  "Oliviers",
  "Amandiers",
  "Palmiers",
  "Raisins de table",
  "Agrumes",
  "Pommes/Poires",
  "Abricots",
  "Grenades",
  "Figues",
  "Coings",
  "Nefles",
  "Peches",
  "Prunes",
  "Pistaches",
  "Cerisiers",
  "Noix et autres",
];

export const columns = [
  { key: "youngHectares", label: "Ha jeunes (ha)" },
  { key: "adultHectares", label: "Ha adultes (ha)" },
  { key: "oldHectares", label: "Ha anciennes (ha)" },
  {
    key: "totalHectares",
    label: "Ha total",
    calculatedFrom: ["youngHectares", "adultHectares", "oldHectares"],
  },
  { key: "youngTrees", label: "Arbres jeunes" },
  { key: "adultTrees", label: "Arbres adultes" },
  { key: "oldTrees", label: "Arbres anciens" },
  {
    key: "totalTrees",
    label: "Arbres total",
    calculatedFrom: ["youngTrees", "adultTrees", "oldTrees"],
  },
] as const;

export function createPerennialPlantationRow(index: number) {
  return {
    plantType: plantOptions[index] ?? customPlantValue,
    customName: "",
    values: {},
  };
}
