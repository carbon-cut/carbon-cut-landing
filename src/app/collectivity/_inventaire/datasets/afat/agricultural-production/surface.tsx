"use client";

import MatrixTable from "@/components/table/matrix";

const harvestedArea: Record<number, Record<string, string>> = {
  "2022": {
    wheat: "12 400",
    barley: "5 900",
    peasChickpeas: "2 100",
    beansBroadBeans: "1 620",
    alfalfa: "1 340",
    potatoes: "1 080",
  },
  "2023": {
    wheat: "12 850",
    barley: "6 020",
    peasChickpeas: "2 180",
    beansBroadBeans: "1 670",
    alfalfa: "1 390",
    potatoes: "1 120",
  },
  "2024": {
    wheat: "13 100",
    barley: "6 180",
    peasChickpeas: "2 240",
    beansBroadBeans: "1 710",
    alfalfa: "1 420",
    potatoes: "1 160",
  },
};

const production: Record<number, Record<string, string>> = {
  "2022": {
    wheat: "31 000",
    barley: "12 200",
    peasChickpeas: "2 900",
    beansBroadBeans: "2 200",
    alfalfa: "18 400",
    potatoes: "27 300",
  },
  "2023": {
    wheat: "32 800",
    barley: "12 900",
    peasChickpeas: "3 050",
    beansBroadBeans: "2 290",
    alfalfa: "19 200",
    potatoes: "28 500",
  },
  "2024": {
    wheat: "33 600",
    barley: "13 400",
    peasChickpeas: "3 200",
    beansBroadBeans: "2 380",
    alfalfa: "19 900",
    potatoes: "29 200",
  },
};

const rows = [
  { key: "wheat", label: "Ble" },
  { key: "barley", label: "Orge" },
  { key: "peasChickpeas", label: "Pois + pois chiches" },
  { key: "beansBroadBeans", label: "Feves + feveroles" },
  { key: "alfalfa", label: "Luzerne" },
  { key: "potatoes", label: "Pomme de terre" },
];

export default function AgriculturalProductionSurface() {
  return (
    <div className="space-y-8">
      <MatrixTable
        title="Surface recoltee (ha)"
        rows={rows}
        getValue={(rowKey, yearValue) => harvestedArea[yearValue]?.[rowKey] ?? ""}
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Production (t)"
          rows={rows}
          getValue={(rowKey, yearValue) => production[yearValue]?.[rowKey] ?? ""}
        />
      </div>
    </div>
  );
}
