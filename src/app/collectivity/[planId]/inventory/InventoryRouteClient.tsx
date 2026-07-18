"use client";

import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    mainForm.reset(defaultValues);
  }, [defaultValues, mainForm]);
  const handleSaveDraft = async () => {
    const currentValues = mainForm.getValues();
    const { years: _years, ...inventoryInput } = currentValues;

    setIsSaving(true);

    try {
      const response = await fetch(
        `/api/collectivity/projects/${encodeURIComponent(snapshot.project.slug)}/current-inventory/input`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({
            inventoryInput,
          }),
        }
      );

      const payload = (await response.json()) as {
        data?: CollectivitySetupSnapshot;
        error?: {
          message?: string;
        };
      };

      if (!response.ok || !payload.data) {
        toast.error(payload.error?.message ?? (t("inventoryWorkspace.saveError") as string));
        return;
      }

      mainForm.reset(currentValues);
      toast.success(t("inventoryWorkspace.saveSuccess") as string);
    } catch {
      toast.error(t("inventoryWorkspace.saveError") as string);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...mainForm}>
      <form onSubmit={(event) => event.preventDefault()}>
        <InventoryProvider years={years} mainForm={mainForm}>
          <InventoryWorkspace
            workspace={workspace}
            surfaces={surfaces}
            isSaving={isSaving}
            onSaveDraft={handleSaveDraft}
            projectSlug={snapshot.project.slug}
          />
        </InventoryProvider>
      </form>
    </Form>
  );
}
