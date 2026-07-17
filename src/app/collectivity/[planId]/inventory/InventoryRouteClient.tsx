"use client";

import { useEffect, useMemo } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";
import type { CollectivitySetupSnapshot } from "@/app/collectivity/setup/_lib/types";

import InventoryWorkspace from "./components/InventoryWorkspace";
import { InventoryProvider, type InventoryFormValues } from "./context/inventory-context";
import { buildInventoryDefaultValues } from "./inventoryDefaultValues";
import { inventorySchema } from "./InventorySchema";
import { buildInventoryRegistry, type InventoryWorkspaceLocale } from "./registry";

function buildInventoryYearPlan(snapshot: CollectivitySetupSnapshot) {
  const reference = snapshot.currentInventory.setupPayload.referenceYear;
  const comparisons = snapshot.currentInventory.setupPayload.inventoryYears.filter(
    (year) => year !== reference
  );

  return {
    reference,
    comparisons,
  };
}

export default function InventoryRouteClient({
  snapshot,
}: {
  snapshot: CollectivitySetupSnapshot;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const inventoryLocale = t("inventoryWorkspace") as InventoryWorkspaceLocale;
  const inventoryYearPlan = useMemo(() => buildInventoryYearPlan(snapshot), [snapshot]);
  const years = useMemo(
    () => [inventoryYearPlan.reference, ...inventoryYearPlan.comparisons],
    [inventoryYearPlan]
  );
  const defaultValues = useMemo(
    () => ({
      ...buildInventoryDefaultValues(snapshot.currentInventory.inventoryInput),
      years: inventoryYearPlan,
    }),
    [inventoryYearPlan, snapshot.currentInventory.inventoryInput]
  );
  const { workspace, surfaces } = useMemo(
    () =>
      buildInventoryRegistry(inventoryLocale, snapshot.currentInventory.setupPayload.applicability),
    [inventoryLocale, snapshot.currentInventory.setupPayload.applicability]
  );
  const mainForm = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues,
  });
  useEffect(() => {
    mainForm.reset(defaultValues);
  }, [defaultValues, mainForm]);
  const handleSubmit: SubmitHandler<z.infer<typeof inventorySchema>> = (data) => {
    console.log("Inventory submitted data:", data);
  };
  const handleError = () => {
    console.log(mainForm.getValues(`energy.electricity.dataSet`));
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
