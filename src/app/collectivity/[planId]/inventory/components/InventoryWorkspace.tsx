"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormState, useWatch, type FieldPath } from "react-hook-form";
import { Calculator, CloudUpload, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

import InventoryDatasetNav from "./InventoryDatasetNav";
import InventoryDomainNav from "./InventoryDomainNav";
import PlaceholderSurface from "./PlaceholderSurface";
import AgriculturalProductionSurface from "../datasets/afat/agricultural-production/surface";
import FertilizersSurface from "../datasets/afat/fertilizers/surface";
import LivestockSurface from "../datasets/afat/livestock/surface";
import PerennialPlantationStockSurface from "../datasets/afat/perennial-plantation-stock/surface";
import ElectricitySurface from "../datasets/energy/electricity/surface";
import NaturalGasSurface from "../datasets/energy/natural-gas/surface";
import PhotovoltaicSurface from "../datasets/energy/photovoltaic/surface";
import SolarWaterHeatingSurface from "../datasets/energy/solar-water-heating/surface";
import BuildingsSurface from "../datasets/municipal/buildings/surface";
import FleetSurface from "../datasets/municipal/fleet/surface";
import PublicLightingSurface from "../datasets/municipal/public-lighting/surface";
import TreesParksWasteSurface from "../datasets/municipal/trees-parks-waste/surface";
import AirTransportSurface from "../datasets/transport/air-transport/surface";
import PortSurface from "../datasets/transport/port/surface";
import PublicTransportSurface from "../datasets/transport/public-transport/surface";
import TerritoryVehiclesSurface from "../datasets/transport/territory-vehicles/surface";
import { useInventoryContext, type InventoryFormValues } from "../context/inventory-context";
import { getInventoryDatasetErrorCount, getInventoryDatasetFieldName } from "../inventoryErrors";
import { getInventoryDatasetProgress } from "../inventoryProgress";
import type { InventoryDataset, InventoryWorkspaceConfig } from "../types";
import type { InventorySurfaceCopy } from "../registry";

type DebugCalculationPanelState =
  | {
      status: "success";
      datasetKey: string;
      total?: number;
      unit?: string;
      formulaVersion: string;
      parameterCount: number;
    }
  | {
      status: "error";
      datasetKey: string;
      message: string;
      reasons: string[];
    };

type DebugCalculationResponse = {
  data?: {
    datasetKey: string;
    emissionsPayload: Record<string, unknown>;
    parameterSnapshot?: {
      items?: unknown[];
    };
    formulaVersion: string;
  };
  error?: {
    message?: string;
    details?: {
      reasons?: Array<{
        code?: string;
        path?: string;
        parameterKey?: string;
      }>;
    };
  };
};

function getDefaultDataset(datasets: InventoryDataset[]) {
  return datasets.find((dataset) => dataset.surfaceKind !== "placeholder") ?? datasets[0];
}

function renderDatasetSurface(
  dataset: InventoryDataset | undefined,
  surfaces: InventorySurfaceCopy,
  hints: InventoryWorkspaceConfig["hints"]
) {
  if (!dataset) return null;

  switch (dataset.surfaceKind) {
    case "fleet":
      return <FleetSurface copy={surfaces.fleet} />;
    case "publicLighting":
      return <PublicLightingSurface copy={surfaces.publicLighting} />;
    case "buildings":
      return <BuildingsSurface />;
    case "treesParksWaste":
      return <TreesParksWasteSurface />;
    case "electricity":
      return <ElectricitySurface />;
    case "photovoltaic":
      return <PhotovoltaicSurface />;
    case "naturalGas":
      return <NaturalGasSurface />;
    case "solarWaterHeating":
      return <SolarWaterHeatingSurface />;
    case "port":
      return <PortSurface />;
    case "publicTransport":
      return <PublicTransportSurface />;
    case "airTransport":
      return <AirTransportSurface />;
    case "territoryVehicles":
      return <TerritoryVehiclesSurface />;
    case "perennialPlantationStock":
      return <PerennialPlantationStockSurface />;
    case "livestock":
      return <LivestockSurface />;
    case "fertilizers":
      return <FertilizersSurface />;
    case "agriculturalProduction":
      return <AgriculturalProductionSurface />;
    case "placeholder":
      return <PlaceholderSurface hints={hints} dataset={dataset} />;
    default:
      return <PlaceholderSurface hints={hints} dataset={dataset} />;
  }
}

function DebugCalculationPanel({
  result,
  label,
  totalLabel,
  formulaVersionLabel,
  parametersLabel,
}: {
  result: DebugCalculationPanelState;
  label: string;
  totalLabel: string;
  formulaVersionLabel: string;
  parametersLabel: string;
}) {
  return (
    <aside className="rounded-md border border-border/20 bg-muted/30 px-4 py-3">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
          <p>{label}</p>
        </Typography>
        <Typography asChild variant="body" size="body" className="text-secondary">
          <p>{result.datasetKey}</p>
        </Typography>
      </div>

      {result.status === "success" ? (
        <div className="mt-2 grid gap-2 text-sm text-foreground md:grid-cols-3">
          <span>
            {totalLabel}: {result.total ?? "-"} {result.unit ?? ""}
          </span>
          <span>
            {formulaVersionLabel}: {result.formulaVersion}
          </span>
          <span>
            {parametersLabel}: {result.parameterCount}
          </span>
        </div>
      ) : (
        <div className="mt-2 space-y-1 text-sm text-destructive">
          <p>{result.message}</p>
          {result.reasons.length > 0 ? <p>{result.reasons.join(", ")}</p> : null}
        </div>
      )}
    </aside>
  );
}

export default function InventoryWorkspace({
  workspace,
  surfaces,
  isSaving,
  onSaveDraft,
  projectSlug,
}: {
  workspace: InventoryWorkspaceConfig;
  surfaces: InventorySurfaceCopy;
  isSaving: boolean;
  onSaveDraft: () => void;
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
  const { errors } = useFormState({ control: mainForm.control });
  const defaultFamily = useMemo(() => workspace.families[0]?.key ?? "", [workspace.families]);
  const [activeFamilyKey, setActiveFamilyKey] = useState(defaultFamily);
  const [isDebugCalculating, setIsDebugCalculating] = useState(false);
  const [debugCalculationsByDatasetKey, setDebugCalculationsByDatasetKey] = useState<
    Record<string, DebugCalculationPanelState>
  >({});
  const datasetsWithProgress = useMemo(
    () =>
      workspace.datasets.map((dataset) => {
        const progress = getInventoryDatasetProgress(dataset.key, formValues, years);
        const errorCount = getInventoryDatasetErrorCount(dataset.key, errors);
        const isPlaceholderComplete = dataset.surfaceKind === "placeholder";
        const progressPercent = progress?.percent ?? (isPlaceholderComplete ? 100 : undefined);

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
          hasError: errorCount > 0,
          isComplete: progressPercent === 100,
        };
      }),
    [errors, formValues, statusLabels, workspace.datasets, years]
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
    ? debugCalculationsByDatasetKey[activeDataset.surfaceKind]
    : null;

  const handleFamilyChange = (familyKey: string) => {
    setActiveFamilyKey(familyKey);
    const nextDatasets = datasetsWithProgress.filter((dataset) => dataset.familyKey === familyKey);
    const nextDataset = getDefaultDataset(nextDatasets);
    setActiveDatasetKey(nextDataset?.key ?? "");
  };

  const handleDebugCalculate = async () => {
    if (!activeDataset || activeDataset.surfaceKind === "placeholder") {
      return;
    }

    const datasetFieldName = getInventoryDatasetFieldName(activeDataset.key);
    const isDatasetValid = datasetFieldName
      ? await mainForm.trigger(datasetFieldName as FieldPath<InventoryFormValues>, {
          shouldFocus: true,
        })
      : true;

    if (!isDatasetValid) {
      toast.error(t("inventoryWorkspace.debugCalculation.error") as string);
      return;
    }

    const currentValues = mainForm.getValues();
    const { years: _years, ...inventoryInput } = currentValues;

    setIsDebugCalculating(true);

    try {
      const response = await fetch(
        `/api/collectivity/projects/${encodeURIComponent(projectSlug)}/current-inventory/debug-calculate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({
            datasetKey: activeDataset.surfaceKind,
            inventoryInput,
          }),
        }
      );
      const payload = (await response.json()) as DebugCalculationResponse;

      if (!response.ok || !payload.data) {
        const reasons =
          payload.error?.details?.reasons?.map((reason) =>
            [reason.code, reason.path, reason.parameterKey].filter(Boolean).join(" · ")
          ) ?? [];

        setDebugCalculationsByDatasetKey((current) => ({
          ...current,
          [activeDataset.surfaceKind]: {
            status: "error",
            datasetKey: activeDataset.surfaceKind,
            message:
              payload.error?.message ?? (t("inventoryWorkspace.debugCalculation.error") as string),
            reasons,
          },
        }));
        toast.error(t("inventoryWorkspace.debugCalculation.error") as string);
        return;
      }

      const total = payload.data.emissionsPayload.total;
      const totalRecord =
        total && typeof total === "object" && !Array.isArray(total)
          ? (total as Record<string, unknown>)
          : null;

      setDebugCalculationsByDatasetKey((current) => ({
        ...current,
        [payload.data.datasetKey]: {
          status: "success",
          datasetKey: payload.data.datasetKey,
          total: typeof totalRecord?.value === "number" ? totalRecord.value : undefined,
          unit: typeof totalRecord?.unit === "string" ? totalRecord.unit : undefined,
          formulaVersion: payload.data.formulaVersion,
          parameterCount: payload.data.parameterSnapshot?.items?.length ?? 0,
        },
      }));
      toast.success(t("inventoryWorkspace.debugCalculation.success") as string);
    } catch {
      setDebugCalculationsByDatasetKey((current) => ({
        ...current,
        [activeDataset.surfaceKind]: {
          status: "error",
          datasetKey: activeDataset.surfaceKind,
          message: t("inventoryWorkspace.debugCalculation.error") as string,
          reasons: [],
        },
      }));
      toast.error(t("inventoryWorkspace.debugCalculation.error") as string);
    } finally {
      setIsDebugCalculating(false);
    }
  };

  return (
    <section className="space-y-6">
      <header className="h-[var(--sidebar-width-icon)] border-b border-border/10 bg-card px-4 py-3 md:-mx-8 md:-mt-4 md:px-8">
        <div className="my-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Typography asChild variant="subtitle" size="md">
            <h1>
              {activeFamily?.title}
              {activeDataset ? " · " : ""}
              {activeDataset?.title}
            </h1>
          </Typography>

          <div className="flex flex-wrap items-center gap-2.5 md:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-md px-4 shadow-none"
              disabled={isSaving}
              onClick={onSaveDraft}
            >
              <Save aria-hidden="true" />
              {t("actions.save") as string}
            </Button>
            <Button type="button" size="sm" className="h-8 rounded-md px-4" disabled={isSaving}>
              <CloudUpload aria-hidden="true" />
              {t("actions.submitData") as string}
            </Button>
          </div>
        </div>
      </header>
      <section className="relative !mt-8 pt-14">
        <InventoryDomainNav
          label={workspace.controls.domainsLabel}
          families={familiesWithError}
          activeFamilyKey={activeFamily?.key ?? ""}
          onFamilyChange={handleFamilyChange}
        />

        <section className="!mt-0 relative z-1 overflow-hidden rounded-2xl border border-t-0 border-border/10 bg-card shadow-[0_16px_34px_rgba(9,35,31,0.035)]">
          <div className="space-y-4 border-b border-border/10 px-6 py-4 md:px-8 md:py-4">
            <InventoryDatasetNav
              label={workspace.controls.datasetLabel}
              activeFamily={activeFamily}
              datasets={datasetsInFamily}
              activeDatasetKey={activeDataset?.key ?? ""}
              onDatasetChange={setActiveDatasetKey}
            />

            <div className="flex flex-col gap-3 rounded-md border border-border/10 bg-muted/20 p-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                {activeDebugCalculation ? (
                  <DebugCalculationPanel
                    result={activeDebugCalculation}
                    label={t("inventoryWorkspace.debugCalculation.label") as string}
                    totalLabel={t("inventoryWorkspace.debugCalculation.total") as string}
                    formulaVersionLabel={
                      t("inventoryWorkspace.debugCalculation.formulaVersion") as string
                    }
                    parametersLabel={t("inventoryWorkspace.debugCalculation.parameters") as string}
                  />
                ) : (
                  <Typography asChild variant="body" size="sm" className="text-muted-foreground">
                    <p>{activeDataset?.title}</p>
                  </Typography>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 shrink-0 rounded-md px-4 shadow-none"
                disabled={
                  isDebugCalculating ||
                  !activeDataset ||
                  activeDataset.surfaceKind === "placeholder"
                }
                onClick={handleDebugCalculate}
              >
                <Calculator aria-hidden="true" />
                {t("inventoryWorkspace.debugCalculation.action") as string}
              </Button>
            </div>
          </div>

          <div className="space-y-4 px-6 py-3 md:px-8 md:py-4">
            {renderDatasetSurface(activeDataset, surfaces, workspace.hints)}
          </div>
        </section>
      </section>
    </section>
  );
}
