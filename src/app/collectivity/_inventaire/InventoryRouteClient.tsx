"use client";

import { useMemo } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";

import InventoryWorkspace from "./components/InventoryWorkspace";
import { InventoryProvider, type InventoryFormValues } from "./context/inventory-context";
import { inventorySchema } from "./InventorySchema";
import { buildInventoryRegistry, type InventoryWorkspaceLocale } from "./registry";
import { createPerennialPlantationRow } from "./datasets/afat/perennial-plantation-stock/constants";

const inventoryYears = [2019, 2023] as const;
const inventoryYearPlan = {
  reference: inventoryYears[0],
  comparisons: [inventoryYears[1]],
};

export default function InventoryRouteClient() {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const inventoryLocale = t("inventoryWorkspace") as InventoryWorkspaceLocale;
  const { workspace, surfaces } = useMemo(
    () => buildInventoryRegistry(inventoryLocale),
    [inventoryLocale]
  );
  const years = useMemo(() => [inventoryYearPlan.reference, ...inventoryYearPlan.comparisons], []);
  const mainForm = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      years: inventoryYearPlan,
      municipal: {
        fleet: {},
        publicLighting: {},
        buildings: {},
        treesParksWaste: {},
      },
      energy: {
        electricity: {},
        photovoltaic: {},
        naturalGas: {},
        solarWaterHeating: {},
      },
      transport: {
        publicTransport: {},
        airTransport: {},
        port: {},
        vehicleCounts: {},
      },
      afat: {
        perennialPlantationStock: {
          rows: [createPerennialPlantationRow(0)],
        },
        livestock: {},
        fertilizers: {},
        agriculturalProduction: {},
      },
      wastewaterSanitation: {},
      waste: {},
    },
  });

  return (
    <Form {...mainForm}>
      <InventoryProvider years={years} mainForm={mainForm}>
        <InventoryWorkspace workspace={workspace} surfaces={surfaces} />
      </InventoryProvider>
    </Form>
  );
}
