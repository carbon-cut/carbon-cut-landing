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
      { key: "total", label: "Total" },
    ],
    rows: [
      { key: "consumption", label: "Consommation (Nm3)" },
      { key: "subscribers", label: "Nombre d'abonnes" },
      { key: "total", label: "Total" },
    ],
  },
  {
    key: "mp",
    title: "Moyenne pression",
    columns: [
      { key: "industry", label: "Industrie" },
      { key: "tourism", label: "Tourisme" },
      { key: "agriculture", label: "Agriculture" },
      { key: "total", label: "Total" },
    ],
    rows: [
      { key: "consumption", label: "Consommation (Nm3)" },
      { key: "subscribers", label: "Nombre d'abonnes" },
      { key: "total", label: "Total" },
    ],
  },
  {
    key: "hp",
    title: "Haute pression",
    note: "Les colonnes haute pression sont un premier set editable plus tard.",
    columns: [
      { key: "powerPlant", label: "Centrale" },
      { key: "industrialHub", label: "Pole industriel" },
      { key: "total", label: "Total" },
    ],
    rows: [
      { key: "consumption", label: "Consommation (Nm3)" },
      { key: "subscribers", label: "Nombre d'abonnes" },
      { key: "total", label: "Total" },
    ],
  },
];

const sample: Record<string, Record<string, Record<string, string>>> = {
  "2022": {
    bp: {
      consumption_households: "18 200 000",
      subscribers_households: "94 000",
      total_households: "94 018 200 000",
      consumption_commerce: "2 800 000",
      subscribers_commerce: "4 500",
      total_commerce: "4 502 800 000",
      consumption_services: "1 200 000",
      subscribers_services: "520",
      total_services: "521 200 000",
      consumption_total: "22 200 000",
      subscribers_total: "99 020",
      total_total: "22 299 020",
    },
    mp: {
      consumption_industry: "5 200 000",
      subscribers_industry: "66",
      total_industry: "5 200 066",
      consumption_tourism: "640 000",
      subscribers_tourism: "28",
      total_tourism: "640 028",
      consumption_agriculture: "390 000",
      subscribers_agriculture: "15",
      total_agriculture: "390 015",
      consumption_total: "6 230 000",
      subscribers_total: "109",
      total_total: "6 230 109",
    },
    hp: {
      consumption_powerPlant: "12 000 000",
      subscribers_powerPlant: "1",
      total_powerPlant: "12 000 001",
      consumption_industrialHub: "8 200 000",
      subscribers_industrialHub: "2",
      total_industrialHub: "8 200 002",
      consumption_total: "20 200 000",
      subscribers_total: "3",
      total_total: "20 200 003",
    },
  },
  "2023": {
    bp: {
      consumption_households: "18 840 000",
      subscribers_households: "96 500",
      total_households: "96 518 840 000",
      consumption_commerce: "2 960 000",
      subscribers_commerce: "4 660",
      total_commerce: "4 662 960 000",
      consumption_services: "1 250 000",
      subscribers_services: "540",
      total_services: "541 250 000",
      consumption_total: "23 050 000",
      subscribers_total: "101 700",
      total_total: "23 151 700",
    },
    mp: {
      consumption_industry: "5 360 000",
      subscribers_industry: "68",
      total_industry: "5 360 068",
      consumption_tourism: "670 000",
      subscribers_tourism: "29",
      total_tourism: "670 029",
      consumption_agriculture: "410 000",
      subscribers_agriculture: "16",
      total_agriculture: "410 016",
      consumption_total: "6 440 000",
      subscribers_total: "113",
      total_total: "6 440 113",
    },
    hp: {
      consumption_powerPlant: "12 400 000",
      subscribers_powerPlant: "1",
      total_powerPlant: "12 400 001",
      consumption_industrialHub: "8 550 000",
      subscribers_industrialHub: "2",
      total_industrialHub: "8 550 002",
      consumption_total: "20 950 000",
      subscribers_total: "3",
      total_total: "20 950 003",
    },
  },
  "2024": {
    bp: {
      consumption_households: "19 100 000",
      subscribers_households: "97 900",
      total_households: "97 919 100 000",
      consumption_commerce: "3 020 000",
      subscribers_commerce: "4 720",
      total_commerce: "4 723 020 000",
      consumption_services: "1 310 000",
      subscribers_services: "550",
      total_services: "551 310 000",
      consumption_total: "23 430 000",
      subscribers_total: "103 170",
      total_total: "23 533 170",
    },
    mp: {
      consumption_industry: "5 480 000",
      subscribers_industry: "69",
      total_industry: "5 480 069",
      consumption_tourism: "690 000",
      subscribers_tourism: "30",
      total_tourism: "690 030",
      consumption_agriculture: "430 000",
      subscribers_agriculture: "16",
      total_agriculture: "430 016",
      consumption_total: "6 600 000",
      subscribers_total: "115",
      total_total: "6 600 115",
    },
    hp: {
      consumption_powerPlant: "12 650 000",
      subscribers_powerPlant: "1",
      total_powerPlant: "12 650 001",
      consumption_industrialHub: "8 740 000",
      subscribers_industrialHub: "2",
      total_industrialHub: "8 740 002",
      consumption_total: "21 390 000",
      subscribers_total: "3",
      total_total: "21 390 003",
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
