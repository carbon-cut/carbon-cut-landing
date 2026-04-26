"use client";

import InventoryYearBlockTables from "../../../components/InventoryYearBlockTables";
import type { InventoryYearBlockTableBlock } from "../../../types";

const blocks: InventoryYearBlockTableBlock[] = [
  {
    key: "bp",
    title: "Basse pression",
    columns: [
      { key: "households", label: "Menages" },
      { key: "commerce", label: "Commerce" },
      { key: "services", label: "Services" },
      { key: "total", label: "Total", calculated: "sum", className: "bg-yellow-100/70" },
    ],
    rows: [
      { key: "consumption", label: "Consommation (Nm3)" },
      { key: "subscribers", label: "Nombre d'abonnes" },
    ],
  },
  {
    key: "mp",
    title: "Moyenne pression",
    columns: [
      { key: "industry", label: "Industrie" },
      { key: "tourism", label: "Tourisme" },
      { key: "agriculture", label: "Agriculture" },
      { key: "total", label: "Total", calculated: "sum", className: "bg-yellow-100/70" },
    ],
    rows: [
      { key: "consumption", label: "Consommation (Nm3)" },
      { key: "subscribers", label: "Nombre d'abonnes" },
    ],
  },
  {
    key: "hp",
    title: "Haute pression",
    note: "Les colonnes haute pression peuvent etre ajoutees, renommees ou supprimees.",
    editableColumns: true,
    columns: [
      { key: "powerPlant", label: "Centrale" },
      { key: "industrialHub", label: "Pole industriel" },
      { key: "total", label: "Total", calculated: "sum", className: "bg-yellow-100/70" },
    ],
    rows: [
      { key: "consumption", label: "Consommation (Nm3)" },
      { key: "subscribers", label: "Nombre d'abonnes" },
    ],
  },
];

const sample: Record<string, Record<string, Record<string, string>>> = {
  "2022": {
    bp: {
      consumption_households: "18 200 000",
      subscribers_households: "94 000",
      consumption_commerce: "2 800 000",
      subscribers_commerce: "4 500",
      consumption_services: "1 200 000",
      subscribers_services: "520",
    },
    mp: {
      consumption_industry: "5 200 000",
      subscribers_industry: "66",
      consumption_tourism: "640 000",
      subscribers_tourism: "28",
      consumption_agriculture: "390 000",
      subscribers_agriculture: "15",
    },
    hp: {
      consumption_powerPlant: "12 000 000",
      subscribers_powerPlant: "1",
      consumption_industrialHub: "8 200 000",
      subscribers_industrialHub: "2",
    },
  },
  "2023": {
    bp: {
      consumption_households: "18 840 000",
      subscribers_households: "96 500",
      consumption_commerce: "2 960 000",
      subscribers_commerce: "4 660",
      consumption_services: "1 250 000",
      subscribers_services: "540",
    },
    mp: {
      consumption_industry: "5 360 000",
      subscribers_industry: "68",
      consumption_tourism: "670 000",
      subscribers_tourism: "29",
      consumption_agriculture: "410 000",
      subscribers_agriculture: "16",
    },
    hp: {
      consumption_powerPlant: "12 400 000",
      subscribers_powerPlant: "1",
      consumption_industrialHub: "8 550 000",
      subscribers_industrialHub: "2",
    },
  },
  "2024": {
    bp: {
      consumption_households: "19 100 000",
      subscribers_households: "97 900",
      consumption_commerce: "3 020 000",
      subscribers_commerce: "4 720",
      consumption_services: "1 310 000",
      subscribers_services: "550",
    },
    mp: {
      consumption_industry: "5 480 000",
      subscribers_industry: "69",
      consumption_tourism: "690 000",
      subscribers_tourism: "30",
      consumption_agriculture: "430 000",
      subscribers_agriculture: "16",
    },
    hp: {
      consumption_powerPlant: "12 650 000",
      subscribers_powerPlant: "1",
      consumption_industrialHub: "8 740 000",
      subscribers_industrialHub: "2",
    },
  },
};

export default function NaturalGasSurface() {
  return (
    <InventoryYearBlockTables
      title="Gaz naturel"
      description="La lecture reste par annee, avec un bloc par niveau de pression."
      blocks={blocks}
      getValue={(blockKey, rowKey, columnKey, yearValue) =>
        sample[yearValue]?.[blockKey]?.[`${rowKey}_${columnKey}`] ?? ""
      }
    />
  );
}
