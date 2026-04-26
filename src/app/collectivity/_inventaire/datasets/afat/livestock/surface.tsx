"use client";

import InventoryTableSection from "../../../components/InventoryTableSection";
import { useInventoryContext } from "../../../context/inventory-context";
import type { InventoryTableSectionData } from "../../../types";

const values: Record<string, string[]> = {
  dairyCattle: ["4200", "4360", "4480", "0.72"],
  otherCattle: ["9800", "10020", "10140", "0.61"],
  sheep: ["38200", "38900", "39500", "0.34"],
  goats: ["9400", "9580", "9720", "0.28"],
  horses: ["320", "334", "341", "0.64"],
  donkeysMules: ["410", "420", "428", "0.58"],
  camels: ["18", "20", "23", "0.46"],
  broilers: ["520000", "544000", "558000", "0.91"],
  layingHens: ["182000", "188000", "194000", "0.88"],
  turkeys: ["76000", "80400", "83000", "0.79"],
};

const rowMap = [
  { key: "dairyCattle", label: "Bovins laitiers" },
  { key: "otherCattle", label: "Autres bovins" },
  { key: "sheep", label: "Ovins" },
  { key: "goats", label: "Caprins" },
  { key: "horses", label: "Equins" },
  { key: "donkeysMules", label: "Anes et mules" },
  { key: "camels", label: "Camelins" },
  { key: "broilers", label: "Poulets de chair" },
  { key: "layingHens", label: "Poules pondeuses" },
  { key: "turkeys", label: "Dindes" },
];

export default function LivestockSurface() {
  const { years } = useInventoryContext();
  const section: InventoryTableSectionData = {
    title: "Cheptel",
    description:
      "Le dernier champ garde le parametre de temps annuel passe en etable ou espace confine.",
    columns: [...years.map((year) => String(year)), "Part du temps annuel en etable"],
    rows: rowMap.map((row) => ({
      key: row.key,
      label: row.label,
      values: values[row.key] ?? Array(years.length + 1).fill(""),
    })),
  };

  return <InventoryTableSection section={section} />;
}
