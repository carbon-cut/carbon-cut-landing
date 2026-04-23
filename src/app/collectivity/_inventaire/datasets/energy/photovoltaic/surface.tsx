"use client";

import MatrixTable from "../../../components/MatrixTable";

const btSample: Record<string, Record<string, string>> = {
  "2022": {
    subscribers: "62",
    capacity: "910 kWc",
    production: "1 480 MWh",
    balance: "420 000 TND",
  },
  "2023": {
    subscribers: "74",
    capacity: "1 140 kWc",
    production: "1 820 MWh",
    balance: "510 000 TND",
  },
  "2024": {
    subscribers: "86",
    capacity: "1 360 kWc",
    production: "2 120 MWh",
    balance: "590 000 TND",
  },
};

const mtSample: Record<string, Record<string, string>> = {
  "2022": { subscribers: "9", capacity: "2 800 kWc", production: "4 300 MWh" },
  "2023": { subscribers: "12", capacity: "3 460 kWc", production: "5 280 MWh" },
  "2024": { subscribers: "15", capacity: "4 120 kWc", production: "6 040 MWh" },
};

export default function PhotovoltaicSurface() {
  return (
    <div className="space-y-8">
      <MatrixTable
        title="Photovoltaique BT"
        rows={[
          { key: "subscribers", label: "Nombre d'abonnes BT" },
          { key: "capacity", label: "Puissance installee (kWc)" },
          { key: "production", label: "Production (MWh)" },
          { key: "balance", label: "Solde annuel de transaction" },
        ]}
        getValue={(rowKey, yearValue) => btSample[yearValue]?.[rowKey] ?? ""}
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Photovoltaique MT"
          rows={[
            { key: "subscribers", label: "Nombre d'abonnes MT" },
            { key: "capacity", label: "Puissance installee (kWc)" },
            { key: "production", label: "Production (MWh)" },
          ]}
          getValue={(rowKey, yearValue) => mtSample[yearValue]?.[rowKey] ?? ""}
        />
      </div>
    </div>
  );
}
