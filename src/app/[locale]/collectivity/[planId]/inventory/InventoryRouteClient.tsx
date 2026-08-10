"use client";

import { useEffect, useMemo } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  calculateCollectivityInventoryRequest,
  CollectivityApiError,
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchCollectivityCurrentInventory,
  saveCollectivityInventoryDraftRequest,
} from "@/app/[locale]/collectivity/_lib/queries";
import { getCollectivityProjectsRoute } from "@/app/[locale]/collectivity/_lib/routing";
import { Form } from "@/components/ui/forms";
import { useScopedI18n } from "@/locales/client";
import type { CollectivitySetupSnapshot } from "@/app/[locale]/collectivity/setup/_lib/types";

import InventoryWorkspace from "./components/InventoryWorkspace";
import { InventoryProvider, type InventoryFormValues } from "./context/inventory-context";
import { buildInventoryDefaultValues } from "./inventoryDefaultValues";
import { inventorySchema } from "./InventorySchema";
import {
  getInventoryCalculationReadinessPaths,
  validateInventoryCalculationReadiness,
} from "./InventorySchema/calculation-readiness";
import { buildInventoryRegistry, type InventoryWorkspaceLocale } from "./registry";

const inventorySnapshotQueryOptions = {
  ...collectivityQueryOptions,
  staleTime: Infinity,
  refetchOnMount: false,
};

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
  snapshot: initialSnapshot,
}: {
  snapshot: CollectivitySetupSnapshot;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useScopedI18n("(pages).collectivityDashboard");
  //const inventoryLocale = t("inventoryWorkspace") as InventoryWorkspaceLocale;
  const projectSlug = initialSnapshot.project.slug;
  const { data: snapshot = initialSnapshot, error: snapshotError } = useQuery({
    ...inventorySnapshotQueryOptions,
    queryKey: collectivityQueryKeys.currentInventory(projectSlug),
    queryFn: () => fetchCollectivityCurrentInventory(projectSlug),
    initialData: initialSnapshot,
  });
  const snapshotVersion = `${snapshot.currentInventory.id}:${snapshot.currentInventory.updatedAt}`;
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
  const { workspace } = useMemo(
    () => buildInventoryRegistry(snapshot.currentInventory.setupPayload.applicability),
    [snapshot.currentInventory.setupPayload.applicability]
  );
  const mainForm = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues,
    mode: "onChange",
  });
  const saveDraftMutation = useMutation({
    mutationFn: saveCollectivityInventoryDraftRequest,
    onSuccess: (saved) => {
      queryClient.setQueryData(collectivityQueryKeys.currentInventory(saved.project.slug), saved);
      queryClient.setQueryData(collectivityQueryKeys.setupSnapshot(saved.project.slug), saved);
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
      router.push(`/collectivity/${variables.projectSlug}/result`);
    },
  });
  useEffect(() => {
    mainForm.reset(defaultValues);
    // Only rebuild the editable form when the current inventory snapshot itself changes.
    // Query cache object changes must not overwrite in-progress edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainForm, snapshotVersion]);
  useEffect(() => {
    if (!(snapshotError instanceof CollectivityApiError)) {
      return;
    }

    if (
      snapshotError.payload.error?.status === 403 ||
      snapshotError.payload.error?.status === 404
    ) {
      router.replace(getCollectivityProjectsRoute("inventory"));
    }
  }, [router, snapshotError]);

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
    const { years: _years, ...inventoryInput } = currentValues;

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
