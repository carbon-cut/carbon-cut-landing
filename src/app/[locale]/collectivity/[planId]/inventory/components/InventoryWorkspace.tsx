"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormState, useWatch, type FieldPath } from "react-hook-form";
import { Calculator, CloudUpload, Save } from "lucide-react";
import { toast } from "sonner";

import {
  CollectivityApiError,
  debugCalculateCollectivityDatasetRequest,
} from "@/app/[locale]/collectivity/_lib/queries";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

import InventoryDatasetNav from "./InventoryDatasetNav";
import InventoryDomainNav from "./InventoryDomainNav";
import FertilizersSurface from "../datasets/afat/fertilizers/surface";
import LivestockSurface from "../datasets/afat/livestock/surface";
import TreesSurface from "../datasets/afat/trees/surface";
import ElectricitySurface from "../datasets/energy/electricity/surface";
import NaturalGasSurface from "../datasets/energy/natural-gas/surface";
import BuildingsSurface from "../datasets/municipal/buildings/surface";
import FleetSurface from "../datasets/municipal/fleet/surface";
import PublicLightingSurface from "../datasets/municipal/public-lighting/surface";
import TreesParksWasteSurface from "../datasets/municipal/trees-parks-waste/surface";
import AirTransportSurface from "../datasets/transport/air-transport/surface";
import PortSurface from "../datasets/transport/port/surface";
import PublicTransportSurface from "../datasets/transport/public-transport/surface";
import TerritoryVehiclesSurface from "../datasets/transport/territory-vehicles/surface";
import { useInventoryContext, type InventoryFormValues } from "../context/inventory-context";
import {
  getInventoryCalculationReadinessPaths,
  validateInventoryCalculationReadiness,
} from "../InventorySchema/calculation-readiness";
import {
  getInventoryDatasetErrorSignature,
  getInventoryDatasetFieldName,
  getInventoryDatasetHasError,
} from "../inventoryErrors";
import { getInventoryDatasetProgress } from "../inventoryProgress";
import type { InventoryDataset, InventoryWorkspaceConfig } from "../types";
import type { InventoryFamilyKey } from "../registry";

type DebugCalculationPanelState =
  | {
      status: "success";
      datasetKey: string;
      emissionLeaves: DebugEmissionLeaf[];
      warnings: DebugCalculationWarning[];
      formulaVersion: string;
      parameterCount: number;
    }
  | {
      status: "error";
      datasetKey: string;
      message: string;
      reasons: string[];
    };

type DebugEmissionLeaf = {
  path: string;
  value: number;
  unit: string;
};

type DebugCalculationWarning = {
  code?: string;
  itemId?: string;
  path?: string;
  message?: string;
  details?: Record<string, unknown>;
};

const summedDebugDatasetKeys = new Set(["electricity"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function collectEmissionLeaves(value: unknown, path: string[] = []): DebugEmissionLeaf[] {
  if (Array.isArray(value)) {
    return value.flatMap((nestedValue, index) =>
      collectEmissionLeaves(nestedValue, [...path, String(index)])
    );
  }

  if (!isRecord(value)) {
    return [];
  }

  if (typeof value.value === "number" && typeof value.unit === "string") {
    return [
      {
        path: path.join("."),
        value: value.value,
        unit: value.unit,
      },
    ];
  }

  return Object.entries(value).flatMap(([key, nestedValue]) =>
    collectEmissionLeaves(nestedValue, [...path, key])
  );
}

function getDisplayEmissionLeaves(
  datasetKey: string,
  emissionsPayload: unknown
): DebugEmissionLeaf[] {
  if (datasetKey === "naturalGas") {
    const payload = isRecord(emissionsPayload) ? emissionsPayload : {};

    return [
      ...sumEmissionLeavesByYear("dataSet.total", payload.dataSet),
      ...sumEmissionLeavesByYear("approximations.gpl", payload.approximations),
    ];
  }

  const emissionLeaves = collectEmissionLeaves(emissionsPayload);

  if (!summedDebugDatasetKeys.has(datasetKey)) {
    return emissionLeaves;
  }

  return sumEmissionLeavesByYear("total", emissionsPayload);
}

function sumEmissionLeavesByYear(prefix: string, value: unknown): DebugEmissionLeaf[] {
  const emissionLeaves = collectEmissionLeaves(value);
  const totalsByYear = emissionLeaves.reduce<Record<string, { value: number; unit: string }>>(
    (acc, leaf) => {
      const yearSegment = leaf.path.split(".").find((segment) => /^y-\d{4}$/.test(segment));

      if (!yearSegment) {
        return acc;
      }

      const current = acc[yearSegment];
      acc[yearSegment] = {
        value: (current?.value ?? 0) + leaf.value,
        unit: current?.unit ?? leaf.unit,
      };
      return acc;
    },
    {}
  );

  return Object.entries(totalsByYear)
    .sort(([leftYear], [rightYear]) => leftYear.localeCompare(rightYear))
    .map(([year, total]) => ({
      path: `${prefix}.${year}`,
      value: total.value,
      unit: total.unit,
    }));
}

function getDefaultDataset(datasets: InventoryDataset[]) {
  return datasets[0];
}

function renderDatasetSurface(dataset: InventoryDataset | undefined) {
  if (!dataset) return null;

  switch (dataset.key) {
    case "fleet":
      return <FleetSurface />;
    case "publicLighting":
      return <PublicLightingSurface />;
    case "buildings":
      return <BuildingsSurface />;
    case "treesParksWaste":
      return <TreesParksWasteSurface />;
    case "electricity":
      return <ElectricitySurface />;
    case "naturalGas":
      return <NaturalGasSurface />;
    case "port":
      return <PortSurface />;
    case "publicTransport":
      return <PublicTransportSurface />;
    case "airTransport":
      return <AirTransportSurface />;
    case "territoryVehicles":
      return <TerritoryVehiclesSurface />;
    case "trees":
      return <TreesSurface />;
    case "livestock":
      return <LivestockSurface />;
    case "fertilizers":
      return <FertilizersSurface />;
    default:
      return <></>; //<PlaceholderSurface dataset={dataset} />;
  }
}

function DebugCalculationPanel({
  result,
  label,
  formulaVersionLabel,
  parametersLabel,
  warningsLabel,
}: {
  result: DebugCalculationPanelState;
  label: string;
  formulaVersionLabel: string;
  parametersLabel: string;
  warningsLabel: string;
}) {
  return (
    <aside className="space-y-1.5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
          <p>{label}</p>
        </Typography>
        <Typography asChild variant="caption" size="sm">
          <p>{result.datasetKey}</p>
        </Typography>
      </div>

      {result.status === "success" ? (
        <div className="space-y-1.5">
          {result.emissionLeaves.map((leaf) => (
            <div key={leaf.path} className="flex flex-wrap gap-x-3 gap-y-1">
              <Typography asChild variant="caption" size="sm" className="text-secondary">
                <span>{leaf.path}</span>
              </Typography>
              <Typography asChild variant="label" size="sm">
                <span>
                  {leaf.value} {leaf.unit}
                </span>
              </Typography>
            </div>
          ))}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Typography asChild variant="caption" size="sm">
              <span>
                {formulaVersionLabel}: {result.formulaVersion}
              </span>
            </Typography>
            <Typography asChild variant="caption" size="sm">
              <span>
                {parametersLabel}: {result.parameterCount}
              </span>
            </Typography>
          </div>
          {result.warnings.length > 0 ? (
            <div className="space-y-1 pt-1">
              <Typography asChild variant="caption" size="sm" className="text-amber-700">
                <p>{warningsLabel}</p>
              </Typography>
              {result.warnings.map((warning, index) => (
                <Typography
                  key={`${warning.code ?? "warning"}-${warning.itemId ?? index}`}
                  asChild
                  variant="caption"
                  size="sm"
                  className="text-amber-700"
                >
                  <p>{warning.message ?? warning.code ?? "Warning"}</p>
                </Typography>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-1">
          <Typography asChild variant="caption" size="sm" className="text-destructive">
            <p>{result.message}</p>
          </Typography>
          {result.reasons.length > 0 ? (
            <Typography asChild variant="caption" size="sm" className="text-destructive">
              <p>{result.reasons.join(", ")}</p>
            </Typography>
          ) : null}
        </div>
      )}
    </aside>
  );
}

export default function InventoryWorkspace({
  workspace,
  isSaving,
  isSubmitting,
  onSaveDraft,
  onSubmitInventory,
  projectSlug,
}: {
  workspace: InventoryWorkspaceConfig;
  isSaving: boolean;
  isSubmitting: boolean;
  onSaveDraft: () => void;
  onSubmitInventory: () => void;
  projectSlug: string;
}) {
  const { mainForm, years } = useInventoryContext();
  const t = useScopedI18n("(pages).collectivityDashboard");
  const statusLabels = useMemo(
    () => ({
      todo: t("status.todo") as string,
      complete: t("status.complete") as string,
      inProgress: t("status.inProgress") as string,
    }),
    [t]
  );
  const formValues = useWatch({ control: mainForm.control }) as
    | Partial<InventoryFormValues>
    | undefined;
  const { errors, isValidating } = useFormState({ control: mainForm.control });
  const datasetErrorSignature = getInventoryDatasetErrorSignature(
    workspace.datasets.map((dataset) => dataset.key),
    errors
  );
  const defaultFamily = useMemo(() => workspace.families[0]?.key ?? "", [workspace.families]);
  const [activeFamilyKey, setActiveFamilyKey] = useState(defaultFamily);
  const [debugCalculationsByDatasetKey, setDebugCalculationsByDatasetKey] = useState<
    Record<string, DebugCalculationPanelState>
  >({});
  const debugCalculationMutation = useMutation({
    mutationFn: debugCalculateCollectivityDatasetRequest,
  });
  const datasetsWithProgress = useMemo(
    () =>
      workspace.datasets.map((dataset) => {
        const progress = getInventoryDatasetProgress(dataset.key, formValues, years);
        const hasError = getInventoryDatasetHasError(dataset.key, errors);
        const progressPercent = progress?.percent;

        return {
          ...dataset,
          navStatusLabel:
            progressPercent === undefined
              ? dataset.navStatusLabel
              : progressPercent === 0
                ? statusLabels.todo
                : progressPercent === 100
                  ? statusLabels.complete
                  : statusLabels.inProgress,
          progressLabel:
            progressPercent === undefined ? dataset.progressLabel : `${progressPercent}%`,
          progressPercent,
          hasError,
          isComplete: progressPercent === 100,
        };
      }),
    // RHF keeps the errors object reference stable; use primitive validation signals instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [datasetErrorSignature, formValues, isValidating, statusLabels, workspace.datasets, years]
  );

  const datasetsInFamily = useMemo(
    () => datasetsWithProgress.filter((dataset) => dataset.familyKey === activeFamilyKey),
    [activeFamilyKey, datasetsWithProgress]
  );
  const familiesWithError = useMemo(
    () =>
      workspace.families.map((family) => ({
        ...family,
        hasError: datasetsWithProgress.some(
          (dataset) => dataset.familyKey === family.key && dataset.hasError
        ),
      })),
    [datasetsWithProgress, workspace.families]
  );

  const defaultDataset = useMemo(() => getDefaultDataset(datasetsInFamily), [datasetsInFamily]);
  const [activeDatasetKey, setActiveDatasetKey] = useState(defaultDataset?.key ?? "");

  useEffect(() => {
    if (!workspace.families.some((family) => family.key === activeFamilyKey)) {
      setActiveFamilyKey(defaultFamily);
    }
  }, [activeFamilyKey, defaultFamily, workspace.families]);

  useEffect(() => {
    if (!datasetsInFamily.some((dataset) => dataset.key === activeDatasetKey)) {
      setActiveDatasetKey(defaultDataset?.key ?? "");
    }
  }, [activeDatasetKey, datasetsInFamily, defaultDataset]);

  const activeDataset =
    datasetsInFamily.find((dataset) => dataset.key === activeDatasetKey) ?? defaultDataset;
  const activeFamily =
    familiesWithError.find((family) => family.key === activeFamilyKey) ?? familiesWithError[0];
  const activeDebugCalculation = activeDataset
    ? debugCalculationsByDatasetKey[activeDataset.key]
    : null;

  const handleFamilyChange = (familyKey: InventoryFamilyKey) => {
    setActiveFamilyKey(familyKey);
    const nextDatasets = datasetsWithProgress.filter((dataset) => dataset.familyKey === familyKey);
    const nextDataset = getDefaultDataset(nextDatasets);
    setActiveDatasetKey(nextDataset?.key ?? "");
  };

  const handleDebugCalculate = async () => {
    if (!activeDataset) {
      return;
    }

    const datasetFieldName = getInventoryDatasetFieldName(activeDataset.key);
    const debugFieldNames =
      activeDataset.key === "naturalGas"
        ? ([datasetFieldName, "sharedData.population", "sharedData.householdEnergy"].filter(
            Boolean
          ) as FieldPath<InventoryFormValues>[])
        : datasetFieldName
          ? [datasetFieldName as FieldPath<InventoryFormValues>]
          : [];
    const isDatasetValid =
      debugFieldNames.length > 0
        ? await mainForm.trigger(debugFieldNames, {
            shouldFocus: true,
          })
        : true;
    const currentValues = mainForm.getValues();
    const debugData = datasetFieldName
      ? mainForm.getValues(datasetFieldName as FieldPath<InventoryFormValues>)
      : undefined;

    if (!isDatasetValid) {
      console.log("debugData", debugData);
      console.log("debugError", mainForm.formState.errors);
      toast.error(t("inventoryWorkspace.debugCalculation.validationError") as string);
      return;
    }

    for (const path of getInventoryCalculationReadinessPaths(activeDataset.key, currentValues)) {
      mainForm.clearErrors(path.join(".") as FieldPath<InventoryFormValues>);
    }

    const readinessResult = validateInventoryCalculationReadiness(activeDataset.key, currentValues);

    if (!readinessResult.success) {
      for (const issue of readinessResult.error.issues) {
        mainForm.setError(issue.path.join(".") as FieldPath<InventoryFormValues>, {
          type: "custom",
          message: issue.message,
        });
      }

      console.log("debugData", debugData);
      console.log("debugError", readinessResult.error);
      toast.error(t("inventoryWorkspace.debugCalculation.validationError") as string);
      return;
    }

    const { years: _years, ...inventoryInput } = currentValues;
    const debugRequest = {
      datasetKey: activeDataset.key,
      inventoryInput,
    };

    try {
      const debugData = await debugCalculationMutation.mutateAsync({
        projectSlug,
        ...debugRequest,
      });
      const emissionLeaves = getDisplayEmissionLeaves(
        debugData.datasetKey,
        debugData.emissionsPayload
      );

      setDebugCalculationsByDatasetKey((current) => ({
        ...current,
        [debugData.datasetKey]: {
          status: "success",
          datasetKey: debugData.datasetKey,
          emissionLeaves,
          warnings: debugData.warnings ?? [],
          formulaVersion: debugData.formulaVersion,
          parameterCount: debugData.parameterSnapshot?.items?.length ?? 0,
        },
      }));
      console.log("debugData", debugData);
      toast.success(t("inventoryWorkspace.debugCalculation.success") as string);
    } catch (error) {
      if (error instanceof CollectivityApiError) {
        console.log("debugData", debugRequest);
        console.log("debugError", error.payload.error);
        const reasons =
          error.payload.error?.details?.reasons?.map((reason) =>
            [reason.code, reason.path, reason.parameterKey].filter(Boolean).join(" · ")
          ) ?? [];

        setDebugCalculationsByDatasetKey((current) => ({
          ...current,
          [activeDataset.key]: {
            status: "error",
            datasetKey: activeDataset.key,
            message:
              error.payload.error?.message ??
              (t("inventoryWorkspace.debugCalculation.calculationError") as string),
            reasons,
          },
        }));
        toast.error(t("inventoryWorkspace.debugCalculation.calculationError") as string);
        return;
      }

      console.log("debugData", debugRequest);
      console.log("debugError", error);
      setDebugCalculationsByDatasetKey((current) => ({
        ...current,
        [activeDataset.key]: {
          status: "error",
          datasetKey: activeDataset.key,
          message: t("inventoryWorkspace.debugCalculation.requestError") as string,
          reasons: [],
        },
      }));
      toast.error(t("inventoryWorkspace.debugCalculation.requestError") as string);
    }
  };
  const tDataSet = useScopedI18n("(pages).collectivityDashboard.inventoryWorkspace.datasets");
  const tFamily = useScopedI18n("(pages).collectivityDashboard.inventoryWorkspace.families");

  return (
    <section className="space-y-6">
      <header className="h-[var(--sidebar-width-icon)] border-b border-border/10 bg-card px-4 py-3 md:-mx-8 md:-mt-4 md:px-8">
        <div className="my-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Typography asChild variant="subtitle" size="md">
            <h1>
              {tFamily(`municipalPatrimoine.title`)}
              {activeDataset ? " · " : ""}
              {tDataSet(`${activeDataset.key}.title`)}
            </h1>
          </Typography>

          <div className="flex flex-wrap items-center gap-2.5 md:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-md px-4 shadow-none"
              disabled={isSaving || isSubmitting}
              onClick={onSaveDraft}
            >
              <Save aria-hidden="true" />
              {t("actions.save") as string}
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-8 rounded-md px-4"
              disabled={isSaving || isSubmitting}
              onClick={onSubmitInventory}
            >
              <CloudUpload aria-hidden="true" />
              {t("actions.submitData") as string}
            </Button>
          </div>
        </div>
      </header>
      <section className="relative !mt-8 pt-14">
        <InventoryDomainNav
          label={""} //workspace.controls.domainsLabel}
          families={familiesWithError}
          activeFamilyKey={activeFamily?.key ?? ""}
          onFamilyChange={handleFamilyChange}
        />

        <section className="!mt-0 relative z-1 overflow-hidden rounded-2xl border border-t-0 border-border/10 bg-card shadow-[0_16px_34px_rgba(9,35,31,0.035)]">
          <div className="space-y-4 border-b border-border/10 px-6 py-4 md:px-8 md:py-4">
            <InventoryDatasetNav
              label={""} //workspace.controls.datasetLabel}
              activeFamily={activeFamily}
              datasets={datasetsInFamily}
              activeDatasetKey={activeDataset?.key ?? ""}
              onDatasetChange={setActiveDatasetKey}
            />

            <div className="flex flex-col gap-3 border-t border-border/10 pt-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                {activeDebugCalculation ? (
                  <DebugCalculationPanel
                    result={activeDebugCalculation}
                    label={t("inventoryWorkspace.debugCalculation.label") as string}
                    formulaVersionLabel={
                      t("inventoryWorkspace.debugCalculation.formulaVersion") as string
                    }
                    parametersLabel={t("inventoryWorkspace.debugCalculation.parameters") as string}
                    warningsLabel={t("inventoryWorkspace.debugCalculation.warnings") as string}
                  />
                ) : (
                  <Typography asChild variant="body" size="sm" className="text-muted-foreground">
                    <p>{tDataSet(`${activeDataset.key}.title`)}</p>
                  </Typography>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 shrink-0 rounded-md px-4 shadow-none"
                disabled={
                  debugCalculationMutation.isPending ||
                  !activeDataset ||
                  !getInventoryDatasetFieldName(activeDataset.key)
                }
                onClick={handleDebugCalculate}
              >
                <Calculator aria-hidden="true" />
                {t("inventoryWorkspace.debugCalculation.action") as string}
              </Button>
            </div>
          </div>

          <div className="space-y-4 px-6 py-3 md:px-8 md:py-4">
            {renderDatasetSurface(activeDataset)}
          </div>
        </section>
      </section>
    </section>
  );
}
