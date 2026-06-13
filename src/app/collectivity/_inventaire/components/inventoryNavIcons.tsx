"use client";

import {
  Bolt,
  Building2,
  BusFront,
  CarFront,
  Droplets,
  Lamp,
  Leaf,
  Trash2,
  Trees,
  type LucideIcon,
} from "lucide-react";

import type { InventoryNavIconKey } from "../types";

const iconMap: Record<InventoryNavIconKey, LucideIcon> = {
  municipal: Building2,
  energy: Bolt,
  transport: BusFront,
  afat: Leaf,
  waste: Trash2,
  water: Droplets,
  fleet: CarFront,
  lighting: Lamp,
  buildings: Building2,
  trees: Trees,
};

export function getInventoryNavIcon(iconKey: InventoryNavIconKey): LucideIcon {
  return iconMap[iconKey];
}
