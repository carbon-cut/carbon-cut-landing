"use client";

import InventoryTableSection from "../../../components/InventoryTableSection";
import { useInventoryContext } from "../../../context/inventory-context";
import type { InventoryTableSectionData, InventoryYear } from "../../../types";

function buildPlantSection(
  label: string,
  valuesByYear: Record<string, string[]>,
  years: InventoryYear[]
): InventoryTableSectionData {
  return {
    title: label,
    columns: [
      "Ha jeunes (ha)",
      "Ha adultes (ha)",
      "Ha anciennes (ha)",
      "Ha total",
      "Arbres jeunes",
      "Arbres adultes",
      "Arbres anciens",
      "Arbres total",
    ],
    rows: years.map((year) => ({
      key: year.value,
      label: year.title,
      values: valuesByYear[year.value] ?? Array(8).fill(""),
    })),
  };
}

const oliveValues: Record<string, string[]> = {
  "2022": ["480", "2 640", "830", "3 950", "118000", "476000", "102000", "696000"],
  "2023": ["500", "2 700", "820", "4 020", "121000", "482000", "100000", "703000"],
  "2024": ["520", "2 760", "810", "4 090", "125000", "489000", "98000", "712000"],
};

const fruitValues: Record<string, string[]> = {
  "2022": ["120", "420", "110", "650", "26000", "72000", "14000", "112000"],
  "2023": ["130", "438", "104", "672", "28100", "74800", "13200", "116100"],
  "2024": ["142", "451", "101", "694", "29600", "77200", "12800", "119600"],
};

export default function PerennialPlantationStockSurface({ mode }: { mode: "olive" | "fruit" }) {
  const { years } = useInventoryContext();
  const section =
    mode === "olive"
      ? buildPlantSection("Oliviers", oliveValues, years)
      : buildPlantSection("Arbres fruitiers", fruitValues, years);

  return <InventoryTableSection section={section} />;
}
