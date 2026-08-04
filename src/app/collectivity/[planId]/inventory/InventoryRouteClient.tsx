"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";
import type { CollectivitySetupSnapshot } from "@/app/collectivity/setup/_lib/types";

import InventoryWorkspace from "./components/InventoryWorkspace";
import { InventoryProvider, type InventoryFormValues } from "./context/inventory-context";
import { buildInventoryDefaultValues } from "./inventoryDefaultValues";
import { inventorySchema } from "./InventorySchema";
import {
  getInventoryCalculationReadinessPaths,
  validateInventoryCalculationReadiness,
} from "./InventorySchema/calculation-readiness";
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
  const router = useRouter();
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
    mode: "onChange",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    mainForm.reset(defaultValues);
  }, [defaultValues, mainForm]);

  async function getResponseErrorMessage(response: Response) {
    try {
      const payload = (await response.json()) as {
        error?: {
          message?: string;
        };
      };

      return payload.error?.message;
    } catch {
      return undefined;
    }
  }

  function getCalculationReadinessKeys() {
    return workspace.datasets.flatMap((dataset) => {
      if (dataset.surfaceKind === "placeholder") {
        return [];
      }

      return Array.from(new Set([dataset.surfaceKind, dataset.key]));
    });
  }

  function validateSubmitCalculationReadiness(currentValues: InventoryFormValues) {
    const readinessKeys = getCalculationReadinessKeys();

    for (const datasetKey of readinessKeys) {
      for (const path of getInventoryCalculationReadinessPaths(datasetKey, currentValues)) {
        mainForm.clearErrors(path.join(".") as FieldPath<InventoryFormValues>);
      }
    }

    const issues = readinessKeys.flatMap((datasetKey) => {
      const result = validateInventoryCalculationReadiness(datasetKey, currentValues);

      return result.success ? [] : result.error.issues;
    });

    for (const issue of issues) {
      mainForm.setError(issue.path.join(".") as FieldPath<InventoryFormValues>, {
        type: "custom",
        message: issue.message,
      });
    }

    return issues.length === 0 ? { success: true } : { success: false, error: { issues } };
  }

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
  const handleSubmitInventory = mainForm.handleSubmit(
    async (currentValues) => {
      const readinessResult = validateSubmitCalculationReadiness(currentValues);

      if (!readinessResult.success) {
        const { years: _years, ...inventoryInput } = currentValues;
        console.log("submitData", inventoryInput);
        console.log("submitError", readinessResult.error);
        toast.error(t("inventoryWorkspace.submitValidationError") as string);
        return;
      }

      const { years: _years, ...inventoryInput } = currentValues;

      setIsSubmitting(true);

      try {
        const response = await fetch(
          `/api/collectivity/projects/${encodeURIComponent(snapshot.project.slug)}/current-inventory/calculate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({
              inventoryInput,
            }),
          }
        );

        if (!response.ok) {
          const message = await getResponseErrorMessage(response);
          toast.error(message ?? (t("inventoryWorkspace.submitError") as string));
          return;
        }

        router.push(`/collectivity/${snapshot.project.slug}/result`);
      } catch {
        toast.error(t("inventoryWorkspace.submitError") as string);
      } finally {
        setIsSubmitting(false);
      }
    },
    (errors) => {
      const currentValues = mainForm.getValues();
      const { years: _years, ...inventoryInput } = currentValues;
      console.log("submitData", inventoryInput);
      console.log("submitError", errors);
      toast.error(t("inventoryWorkspace.validationError") as string);
    }
  );

  return (
    <Form {...mainForm}>
      <form onSubmit={(event) => event.preventDefault()}>
        <InventoryProvider years={years} mainForm={mainForm}>
          <InventoryWorkspace
            workspace={workspace}
            surfaces={surfaces}
            isSaving={isSaving}
            isSubmitting={isSubmitting}
            onSaveDraft={handleSaveDraft}
            onSubmitInventory={handleSubmitInventory}
            projectSlug={snapshot.project.slug}
          />
        </InventoryProvider>
      </form>
    </Form>
  );
}
