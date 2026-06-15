"use client";

import {
  Bolt,
  Building2,
  BusFront,
  CarFront,
  CirclePower,
  Droplets,
  FlaskConical,
  HousePlug,
  Lightbulb,
  Leaf,
  Trash2,
  UtilityPole,
  SolarPanel,
  Flame,
  Droplet,
  Sailboat,
  Bus,
  Plane,
  Car,
  TreePine,
  Sprout,
  PlugZap,
  Wheat,
  type LucideIcon,
} from "lucide-react";

import type { InventoryNavIconKey } from "../types";

const iconMap: Record<InventoryNavIconKey, LucideIcon> = {
  municipal: Building2,
  energy: HousePlug,
  transport: BusFront,
  afat: Leaf,
  waste: Trash2,
  water: Droplets,
  fleet: CarFront,
  lighting: Lightbulb,
  buildings: Building2,
  trees: TreePine,
  electricity: PlugZap,
  photovoltaic: SolarPanel,
  naturalGas: Flame,
  solarWaterHeating: Droplet,
  port: Sailboat,
  publicTransport: Bus,
  airTransport: Plane,
  territoryVehicles: Car,
  perennialPlantationStock: TreePine,
  livestock: Leaf,
  fertilizers: FlaskConical,
  agriculturalProduction: Wheat,
};

export function getInventoryNavIcon(iconKey: InventoryNavIconKey): LucideIcon {
  return iconMap[iconKey];
}
