"use client";

import MatrixTable from "@/components/table/matrix";

const sample: Record<string, Record<string, string>> = {
  "2022": {
    ammonitrate: "4200",
    dap: "2800",
    compost: "1600",
    sewageSludge: "210",
    customBiochar: "320",
  },
  "2023": {
    ammonitrate: "4380",
    dap: "2910",
    compost: "1710",
    sewageSludge: "225",
    customBiochar: "350",
  },
  "2024": {
    ammonitrate: "4510",
    dap: "3020",
    compost: "1840",
    sewageSludge: "240",
    customBiochar: "390",
  },
};

export default function FertilizersSurface() {
  return (
    <MatrixTable
      title="Engrais et amendements"
      rows={[
        { key: "ammonitrate", label: "Ammonitrate" },
        { key: "dap", label: "DAP" },
        { key: "compost", label: "Compost" },
        { key: "sewageSludge", label: "Boues d'epuration" },
        { key: "customBiochar", label: "Autre intrant local" },
      ]}
      getValue={(rowKey, yearValue) => sample[yearValue]?.[rowKey] ?? ""}
    />
  );
}
