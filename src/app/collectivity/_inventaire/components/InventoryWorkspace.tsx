"use client";

import { useMemo, useState } from "react";

import Typography from "@/components/ui/typography";

import DatasetHeader from "./DatasetHeader";
import InventoryDatasetSwitcher from "./InventoryDatasetSwitcher";
import PlaceholderSurface from "./PlaceholderSurface";
import AgriculturalProductionSurface from "../datasets/afat/agricultural-production/surface";
import FertilizersSurface from "../datasets/afat/fertilizers/surface";
import LivestockSurface from "../datasets/afat/livestock/surface";
import PerennialPlantationStockSurface from "../datasets/afat/perennial-plantation-stock/surface";
import ElectricitySurface from "../datasets/energy/electricity/surface";
import NaturalGasSurface from "../datasets/energy/natural-gas/surface";
import PhotovoltaicSurface from "../datasets/energy/photovoltaic/surface";
import SolarWaterHeatingSurface from "../datasets/energy/solar-water-heating/surface";
import BuildingsSurface from "../datasets/municipal/buildings/surface";
import FleetSurface from "../datasets/municipal/fleet/surface";
import PublicLightingSurface from "../datasets/municipal/public-lighting/surface";
import TreesParksWasteSurface from "../datasets/municipal/trees-parks-waste/surface";
import AirTransportSurface from "../datasets/transport/air-transport/surface";
import PortSurface from "../datasets/transport/port/surface";
import PublicTransportSurface from "../datasets/transport/public-transport/surface";
import VehicleCountsSurface from "../datasets/transport/vehicle-counts/surface";
import type { InventoryDataset, InventoryWorkspaceConfig } from "../types";
import type { InventorySurfaceCopy } from "../registry";

function getDefaultDataset(datasets: InventoryDataset[]) {
  return datasets.find((dataset) => dataset.surfaceKind !== "placeholder") ?? datasets[0];
}

function renderDatasetSurface(
  dataset: InventoryDataset | undefined,
  surfaces: InventorySurfaceCopy,
  hints: InventoryWorkspaceConfig["hints"]
) {
  if (!dataset) return null;

  switch (dataset.surfaceKind) {
    case "fleet":
      return <FleetSurface copy={surfaces.fleet} />;
    case "publicLighting":
      return <PublicLightingSurface copy={surfaces.publicLighting} />;
    case "buildings":
      return <BuildingsSurface />;
    case "treesParksWaste":
      return <TreesParksWasteSurface />;
    case "electricity":
      return <ElectricitySurface />;
    case "photovoltaic":
      return <PhotovoltaicSurface />;
    case "naturalGas":
      return <NaturalGasSurface />;
    case "solarWaterHeating":
      return <SolarWaterHeatingSurface />;
    case "port":
      return <PortSurface />;
    case "publicTransport":
      return <PublicTransportSurface />;
    case "airTransport":
      return <AirTransportSurface />;
    case "vehicleCounts":
      return <VehicleCountsSurface />;
    case "perennialPlantationStock":
      return <PerennialPlantationStockSurface />;
    case "livestock":
      return <LivestockSurface />;
    case "fertilizers":
      return <FertilizersSurface />;
    case "agriculturalProduction":
      return <AgriculturalProductionSurface />;
    case "placeholder":
      return <PlaceholderSurface hints={hints} dataset={dataset} />;
    default:
      return <PlaceholderSurface hints={hints} dataset={dataset} />;
  }
}

export default function InventoryWorkspace({
  workspace,
  surfaces,
}: {
  workspace: InventoryWorkspaceConfig;
  surfaces: InventorySurfaceCopy;
}) {
  const defaultFamily = useMemo(() => workspace.families[0]?.key ?? "", [workspace.families]);
  const [activeFamilyKey, setActiveFamilyKey] = useState(defaultFamily);

  const datasetsInFamily = useMemo(
    () => workspace.datasets.filter((dataset) => dataset.familyKey === activeFamilyKey),
    [activeFamilyKey, workspace.datasets]
  );

  const defaultDataset = useMemo(() => getDefaultDataset(datasetsInFamily), [datasetsInFamily]);
  const [activeDatasetKey, setActiveDatasetKey] = useState(defaultDataset?.key ?? "");

  const activeDataset =
    datasetsInFamily.find((dataset) => dataset.key === activeDatasetKey) ?? defaultDataset;
  const activeFamily =
    workspace.families.find((family) => family.key === activeFamilyKey) ?? workspace.families[0];

  const handleFamilyChange = (familyKey: string) => {
    setActiveFamilyKey(familyKey);
    const nextDatasets = workspace.datasets.filter((dataset) => dataset.familyKey === familyKey);
    const nextDataset = getDefaultDataset(nextDatasets);
    setActiveDatasetKey(nextDataset?.key ?? "");
  };

  return (
    <section className="space-y-6">
      <InventoryDatasetSwitcher
        families={workspace.families}
        activeFamily={activeFamily}
        activeDataset={activeDataset}
        datasetsInFamily={datasetsInFamily}
        controls={workspace.controls}
        onFamilyChange={handleFamilyChange}
        onDatasetChange={setActiveDatasetKey}
        todoLabel={workspace.hints.todoLabel}
      />

      <section className="rounded-[1.6rem] border border-border/10 bg-card px-5 py-5 shadow-[0_14px_30px_rgba(9,35,31,0.03)] md:px-6 md:py-6">
        <div className="space-y-6">
          <DatasetHeader dataset={activeDataset} hints={workspace.hints} />

          {renderDatasetSurface(activeDataset, surfaces, workspace.hints)}

          <div className="grid gap-3 border-t border-border/10 pt-4 md:grid-cols-2">
            <Typography asChild variant="caption" size="sm" className="text-secondary">
              <p>{workspace.hints.provenanceTodo}</p>
            </Typography>
            <Typography asChild variant="caption" size="sm" className="text-secondary">
              <p>{workspace.hints.progressTodo}</p>
            </Typography>
          </div>
        </div>
      </section>
    </section>
  );
}
