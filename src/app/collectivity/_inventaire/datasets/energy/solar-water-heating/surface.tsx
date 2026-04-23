"use client";

import MatrixTable from "../../../components/MatrixTable";

const residentialSample = {
  "2022": { households: "1 800", area: "16 200 m2" },
  "2023": { households: "2 060", area: "18 900 m2" },
  "2024": { households: "2 320", area: "21 300 m2" },
};

const tertiarySample = {
  "2022": { entities: "44", area: "3 400 m2" },
  "2023": { entities: "51", area: "3 920 m2" },
  "2024": { entities: "58", area: "4 430 m2" },
};

const industrialSample = {
  "2022": { entities: "11", area: "2 100 m2" },
  "2023": { entities: "13", area: "2 420 m2" },
  "2024": { entities: "15", area: "2 740 m2" },
};

export default function SolarWaterHeatingSurface() {
  return (
    <div className="space-y-8">
      <MatrixTable
        title="Residentiel"
        rows={[
          { key: "households", label: "Nombre de menages" },
          { key: "area", label: "Nombre de m2" },
        ]}
        getValue={(rowKey, yearValue) =>
          residentialSample[yearValue as keyof typeof residentialSample]?.[
            rowKey as "households" | "area"
          ] ?? ""
        }
      />
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Tertiaire"
          rows={[
            { key: "entities", label: "Nombre d'entites tertiaires" },
            { key: "area", label: "Nombre de m2" },
          ]}
          getValue={(rowKey, yearValue) =>
            tertiarySample[yearValue as keyof typeof tertiarySample]?.[
              rowKey as "entities" | "area"
            ] ?? ""
          }
        />
      </div>
      <div className="border-t border-border/10 pt-8">
        <MatrixTable
          title="Industriel"
          rows={[
            { key: "entities", label: "Nombre d'entites industrielles" },
            { key: "area", label: "Nombre de m2" },
          ]}
          getValue={(rowKey, yearValue) =>
            industrialSample[yearValue as keyof typeof industrialSample]?.[
              rowKey as "entities" | "area"
            ] ?? ""
          }
        />
      </div>
    </div>
  );
}
