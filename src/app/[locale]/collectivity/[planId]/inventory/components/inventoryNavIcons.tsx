"use client";

import {
  Building2,
  BusFront,
  CarFront,
  Droplets,
  FlaskConical,
  HousePlug,
  Lightbulb,
  Leaf,
  Trash2,
  Flame,
  Sailboat,
  Bus,
  Plane,
  Car,
  TreePine,
  PlugZap,
  Atom,
  Layers3,
  Waves,
  TrainFront,
  type LucideIcon,
} from "lucide-react";

const familyIconMap: Record<string, LucideIcon> = {
  municipalPatrimoine: Building2,
  territorialEnergy: HousePlug,
  transportMobility: BusFront,
  afat: Leaf,
  waste: Trash2,
  wastewater: Droplets,
};

const datasetIconMap: Record<string, LucideIcon> = {
  fleet: CarFront,
  publicLighting: Lightbulb,
  buildings: Building2,
  treesParksWaste: TreePine,
  electricity: PlugZap,
  naturalGas: Flame,
  port: Sailboat,
  buses: Bus,
  urbanRail: TrainFront,
  airTransport: Plane,
  territoryVehicles: Car,
  trees: TreePine,
  livestock: Leaf,
  fertilizers: FlaskConical,
  wastewaterTreatment: Waves,
  wastewaterNitrogen: Atom,
  wastewaterSludge: Layers3,
};

export function getInventoryFamilyNavIcon(familyKey: string): LucideIcon {
  return familyIconMap[familyKey] ?? Building2;
}

export function getInventoryDatasetNavIcon(datasetKey: string): LucideIcon {
  return datasetIconMap[datasetKey] ?? Building2;
}
