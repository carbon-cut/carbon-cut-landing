"use client";

import { useEffect, useMemo, useRef } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FieldPath } from "react-hook-form";
import { toast } from "sonner";

import {
  calculateCollectivityInventoryRequest,
  CollectivityApiError,
  collectivityQueryKeys,
  saveCollectivityInventoryDraftRequest,
} from "@/app/[locale]/collectivity/_lib/queries";
import { useCollectivityWorkspaceSnapshot } from "@/app/[locale]/collectivity/_components/collectivityProjectContext";
import type { CollectivitySetupSnapshot } from "@/app/[locale]/collectivity/projects/setup/_lib/types";
import { Form } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";

import InventoryWorkspace from "./InventoryWorkspace";
import { InventoryProvider, type InventoryFormValues } from "./context/inventory-context";
import {
  buildInventoryDefaultValues,
  buildInventoryDefaultValuesAfterPerimeterChange,
} from "./inventoryDefaultValues";
import { buildInventoryDraftInput } from "./inventoryDraft";
import { useInventoryForm } from "./useInventoryForm";
import {
  getInventoryCalculationReadinessPaths,
  validateInventoryCalculationReadiness,
} from "./InventorySchema/calculation-readiness";
import { buildInventoryRegistry, type InventoryWorkspaceLocale } from "./registry";
import Image from "next/image";

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

export default function InventoryRouteClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useScopedI18n("(pages).collectivityDashboard");
  const snapshot = useCollectivityWorkspaceSnapshot();
  //const inventoryLocale = t("inventoryWorkspace") as InventoryWorkspaceLocale;
  const projectSlug = snapshot.project.slug;
  const snapshotVersion = `${snapshot.currentInventory.id}:${snapshot.currentInventory.updatedAt}`;
  const previousPerimeter = useRef(snapshot.project.perimeter);
  const inventoryYearPlan = useMemo(() => buildInventoryYearPlan(snapshot), [snapshot]);
  const years = useMemo(
    () => [inventoryYearPlan.reference, ...inventoryYearPlan.comparisons].sort((a, b) => a - b),
    [inventoryYearPlan]
  );
  const { workspace } = useMemo(
    () =>
      buildInventoryRegistry(
        snapshot.currentInventory.setupPayload.applicability,
        snapshot.project.perimeter
      ),
    [snapshot.currentInventory.setupPayload.applicability, snapshot.project.perimeter]
  );
  const defaultValues = useMemo(
    () => ({
      ...buildInventoryDefaultValues(snapshot.currentInventory.inventoryInput, years, workspace),
      years: inventoryYearPlan,
    }),
    [inventoryYearPlan, snapshot.currentInventory.inventoryInput, workspace, years]
  );
  const mainForm = useInventoryForm(defaultValues, {
    perimeter: snapshot.project.perimeter,
    applicability: snapshot.currentInventory.setupPayload.applicability,
  });
  const saveDraftMutation = useMutation({
    mutationFn: saveCollectivityInventoryDraftRequest,
    onSuccess: (saved) => {
      void queryClient.invalidateQueries({
        queryKey: collectivityQueryKeys.currentInventory(saved.project.slug),
      });
      void queryClient.invalidateQueries({
        queryKey: collectivityQueryKeys.result(saved.project.slug),
      });
    },
  });
  const calculateMutation = useMutation({
    mutationFn: calculateCollectivityInventoryRequest,
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({
        queryKey: collectivityQueryKeys.result(variables.projectSlug),
      });
      void queryClient.invalidateQueries({
        queryKey: collectivityQueryKeys.currentInventory(variables.projectSlug),
      });
      router.push(`/collectivity/projects/${variables.projectSlug}/ghg-result`);
    },
  });
  useEffect(() => {
    if (previousPerimeter.current !== snapshot.project.perimeter) {
      previousPerimeter.current = snapshot.project.perimeter;
      const currentValues = mainForm.getValues();

      mainForm.reset(
        buildInventoryDefaultValuesAfterPerimeterChange(
          currentValues,
          years,
          workspace,
          inventoryYearPlan
        )
      );
      return;
    }

    mainForm.reset(defaultValues);
    // Query cache object changes must not overwrite in-progress edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainForm, snapshotVersion, snapshot.project.perimeter]);
  function getCalculationReadinessKeys() {
    return workspace.datasets.map((dataset) => dataset.key);
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
    const inventoryInput = buildInventoryDraftInput(currentValues);

    try {
      await saveDraftMutation.mutateAsync({
        projectSlug: snapshot.project.slug,
        inventoryInput,
      });
      mainForm.reset(currentValues);
      toast.success(t("inventoryWorkspace.saveSuccess") as string);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : (t("inventoryWorkspace.saveError") as string)
      );
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

      try {
        await calculateMutation.mutateAsync({
          projectSlug: snapshot.project.slug,
          inventoryInput,
        });
      } catch (error) {
        const message =
          error instanceof CollectivityApiError
            ? error.payload.error?.message
            : error instanceof Error
              ? error.message
              : null;
        toast.error(message ?? (t("inventoryWorkspace.submitError") as string));
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
            isSaving={saveDraftMutation.isPending}
            isSubmitting={calculateMutation.isPending}
            onSaveDraft={handleSaveDraft}
            onSubmitInventory={handleSubmitInventory}
            projectSlug={snapshot.project.slug}
          />
        </InventoryProvider>
      </form>
    </Form>
  );
}
