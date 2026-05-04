"use client";

import { useMemo } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";

import InventoryWorkspace from "./components/InventoryWorkspace";
import { InventoryProvider, type InventoryFormValues } from "./context/inventory-context";
import { inventorySchema } from "./InventorySchema";
import { buildInventoryRegistry, type InventoryWorkspaceLocale } from "./registry";
import { z } from "zod";

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
    },
  });
  const handleSubmit: SubmitHandler<z.infer<typeof inventorySchema>> = (data) => {
    console.log("Inventory submitted data:", data);
  };
  const handleError = (...args: unknown[]) => {
    console.log(mainForm.getValues(`municipal.fleet.dataSet`));
  };

  return (
    <Form {...mainForm}>
      <form onSubmit={mainForm.handleSubmit(handleSubmit, handleError)}>
        <InventoryProvider years={years} mainForm={mainForm}>
          <InventoryWorkspace workspace={workspace} surfaces={surfaces} />
        </InventoryProvider>
      </form>
    </Form>
  );
}
