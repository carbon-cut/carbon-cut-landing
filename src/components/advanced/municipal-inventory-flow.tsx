"use client";
import { useScopedI18n } from "@/locales/client";
import { Building2, Droplets, LampCeiling, MoveRight, Truck, Wheat, Zap } from "lucide-react";
import { CircuitBoard, CircuitNode, CircuitConnection } from "./circuit-board";

const inputKeys = [
  { key: "energy", icon: Zap },
  { key: "buildings", icon: Building2 },
  { key: "lighting", icon: LampCeiling },
  { key: "fleet", icon: Truck },
  { key: "agriculture", icon: Wheat },
  { key: "wastewater", icon: Droplets },
] as const;

const getNodes = (t: ReturnType<typeof useScopedI18n>): CircuitNode[] => {
  return inputKeys.map(({ key, icon: Icon }, index) => ({
    id: key,
    x: 250,
    y: 32 + index * 76,
    label: t(`sources.${key}.title`),
    description: t(`sources.${key}.detail`),
    variant: "card",
    icon: <Icon aria-hidden="true" className="size-4 shrink-0 text-subtext-color" />,
  }));
};

const middleNode: CircuitNode = {
  id: "middle",
  x: 560,
  y: 222,
  label: "middle",
  icon: <MoveRight aria-hidden="true" className="size-4 shrink-0 text-subtext-color" />,
};

const connections: CircuitConnection[] = inputKeys.map(({ key }) => ({
  from: key,
  to: "middle",
}));
export function MunicipalInventoryFlow() {
  const t = useScopedI18n("collectivityLanding.inventoryFlow");

  return (
    <section aria-label={t("connectionsLabel")} className="w-full px-4 py-10 md:px-8 md:py-16">
      <CircuitBoard
        width={900}
        height={444}
        nodes={[...getNodes(t), middleNode]}
        connections={connections}
      />
    </section>
  );
}
