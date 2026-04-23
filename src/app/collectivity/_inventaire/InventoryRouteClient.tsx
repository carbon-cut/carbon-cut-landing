"use client";

import InventoryWorkspace from "./components/InventoryWorkspace";
import { buildInventoryRegistry, type InventoryWorkspaceLocale } from "./registry";
import { InventoryProvider } from "./context/inventory-context";

import { useScopedI18n } from "@/locales/client";

export default function InventoryRouteClient() {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const inventoryLocale = t("inventoryWorkspace") as InventoryWorkspaceLocale;
  const { workspace, surfaces, years } = buildInventoryRegistry(inventoryLocale);

  return (
    <InventoryProvider years={years}>
      <InventoryWorkspace workspace={workspace} surfaces={surfaces} />
    </InventoryProvider>
  );
}
