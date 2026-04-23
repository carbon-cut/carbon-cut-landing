"use client";

import MatrixTable from "../../../components/MatrixTable";

const sample: Record<string, Record<string, string>> = {
  "2022": {
    motorcycles: "28 400",
    publicTransportVehicles: "1 120",
    mopeds: "6 800",
    agriculturalEquipment: "2 300",
    privateVehicles: "184 000",
    specialPurposeVehicles: "2 200",
    touristBuses: "210",
    heavyTrucks: "5 400",
    lightTrucks: "19 300",
    tractors: "1 860",
    tricycles: "420",
    quadricycles: "190",
    trailers: "1 220",
    semiTrailers: "740",
    microbuses: "480",
    ambulances: "118",
    taxis: "3 600",
    sharedTaxis: "690",
    touristTaxis: "102",
    total: "259 150",
  },
  "2023": {
    motorcycles: "29 100",
    publicTransportVehicles: "1 150",
    mopeds: "6 950",
    agriculturalEquipment: "2 320",
    privateVehicles: "187 500",
    specialPurposeVehicles: "2 260",
    touristBuses: "222",
    heavyTrucks: "5 540",
    lightTrucks: "19 780",
    tractors: "1 910",
    tricycles: "438",
    quadricycles: "198",
    trailers: "1 260",
    semiTrailers: "760",
    microbuses: "492",
    ambulances: "122",
    taxis: "3 680",
    sharedTaxis: "706",
    touristTaxis: "105",
    total: "263 293",
  },
  "2024": {
    motorcycles: "29 900",
    publicTransportVehicles: "1 180",
    mopeds: "7 120",
    agriculturalEquipment: "2 350",
    privateVehicles: "191 200",
    specialPurposeVehicles: "2 320",
    touristBuses: "230",
    heavyTrucks: "5 690",
    lightTrucks: "20 240",
    tractors: "1 960",
    tricycles: "450",
    quadricycles: "206",
    trailers: "1 290",
    semiTrailers: "785",
    microbuses: "505",
    ambulances: "126",
    taxis: "3 740",
    sharedTaxis: "724",
    touristTaxis: "109",
    total: "268 124",
  },
};

const rows = [
  { key: "motorcycles", label: "Motocycles" },
  { key: "publicTransportVehicles", label: "Vehicules transport public" },
  { key: "mopeds", label: "Cyclomoteurs" },
  { key: "agriculturalEquipment", label: "Materiel agricole" },
  { key: "privateVehicles", label: "Vehicules prives" },
  { key: "specialPurposeVehicles", label: "Vehicules speciaux" },
  { key: "touristBuses", label: "Bus touristiques" },
  { key: "heavyTrucks", label: "Poids lourds" },
  { key: "lightTrucks", label: "Camions legers / utilitaires" },
  { key: "tractors", label: "Tracteurs" },
  { key: "tricycles", label: "Tricycles" },
  { key: "quadricycles", label: "Quadricycles" },
  { key: "trailers", label: "Remorques" },
  { key: "semiTrailers", label: "Semi-remorques" },
  { key: "microbuses", label: "Microbus" },
  { key: "ambulances", label: "Ambulances" },
  { key: "taxis", label: "Taxis" },
  { key: "sharedTaxis", label: "Taxis collectifs" },
  { key: "touristTaxis", label: "Taxis touristiques" },
  { key: "total", label: "Total" },
];

export default function VehicleCountsSurface() {
  return (
    <MatrixTable
      title="Comptage des vehicules"
      rows={rows}
      getValue={(rowKey, yearValue) => sample[yearValue]?.[rowKey] ?? ""}
    />
  );
}
