"use client";

import GroupedStackedBarChart, {
  type GroupedStackedBarGroup,
} from "@/components/charts/grouped-stacked-bar";
import type { CollectivityInventoryCalculationResult } from "@/app/[locale]/collectivity/_lib/queries";
import ErrorChart from "@/components/charts/error-chart";
import StackedBarChart from "@/components/charts/stacked-bar";
import { energyColors, sectorColors } from "@/components/charts/palette";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import {
  Tabs,
  TabsContent as TabsPrimitiveContent,
  TabsList,
  TabsTrigger as TabsPrimitiveTrigger,
} from "@/components/ui/tabs";
import { getInventoryFamilyNavIcon } from "@/app/[locale]/collectivity/[planId]/inventory/components/inventoryNavIcons";
import { Skeleton } from "@/components/ui/skeleton";
import { useScopedI18n } from "@/locales/client";

import { buildAfatChartData } from "../_lib/afat";
import { buildMunicipalEnergyChartData } from "../_lib/municipal-energy";
import { buildTerritorialEnergyChartData } from "../_lib/territorial-energy";
import { buildTransportChartData } from "../_lib/transport";
import React from "react";

const energyColorBySourceId = {
  electricity: energyColors.electricity,
  "natural-gas": energyColors.naturalGas,
  gpl: energyColors.gpl,
} as const;

const TabsTrigger: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitiveTrigger>> = ({
  className,
  ...props
}) => (
  <TabsPrimitiveTrigger
    className={
      "gap-2 rounded-none border-transparent data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 h-9"
    }
    {...props}
  />
);
TabsTrigger.displayName = TabsPrimitiveTrigger.displayName;

const TabsContent: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitiveContent>> = ({
  className,
  ...props
}) => <TabsPrimitiveContent className="" {...props} />;
TabsContent.displayName = TabsPrimitiveContent.displayName;

export default function TerritorialEnergyChart({
  result,
  isLoading,
  error,
}: {
  result?: CollectivityInventoryCalculationResult;
  isLoading: boolean;
  error: Error | null;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "territorial-energy-poc-title";
  const territorialEnergy = result
    ? buildTerritorialEnergyChartData(result, {
        electricity: t("territorialEnergyChart.energySources.electricity"),
        naturalGas: t("territorialEnergyChart.energySources.naturalGas"),
        gpl: t("territorialEnergyChart.energySources.gpl"),
        industry: t("territorialEnergyChart.sectors.industry"),
        residential: t("territorialEnergyChart.sectors.residential"),
        tertiary: t("territorialEnergyChart.sectors.tertiary"),
        agriculture: t("territorialEnergyChart.sectors.agriculture"),
      })
    : null;
  const energyGroups: GroupedStackedBarGroup[] =
    territorialEnergy?.groups.map((source) => ({
      ...source,
      summary: source.summary
        ? {
            ...source.summary,
            color: energyColorBySourceId[source.id as keyof typeof energyColorBySourceId],
          }
        : undefined,
      segments: source.segments.map((segment) => {
        const sectorId = segment.id.slice(segment.id.lastIndexOf("-") + 1);

        return {
          ...segment,
          color: sectorColors[sectorId as keyof typeof sectorColors],
        };
      }),
    })) ?? [];
  const transport = result
    ? buildTransportChartData(result, (owner) => t(owner as Parameters<typeof t>[0]) as string)
    : null;
  const tAfatTrees = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.trees"
  );
  const afat = result
    ? buildAfatChartData(result, {
        livestock: t("territorialEnergyChart.afatSeries.livestock"),
        crops: t("territorialEnergyChart.afatSeries.crops"),
        waste: t("ghgDevelopmentChart.series.waste"),
        treeSource: (source) => {
          if (source === "urbanTrees") {
            return t("territorialEnergyChart.afatSeries.urbanTrees");
          }

          if (source === "fruitTrees") {
            return tAfatTrees("fruitTrees.title");
          }

          return tAfatTrees(
            `trackedTreeCrops.treeTypes.${source}` as Parameters<typeof tAfatTrees>[0]
          ) as string;
        },
      })
    : null;
  const municipalEnergy = result
    ? buildMunicipalEnergyChartData(
        result,
        (energy) =>
          t(`territorialEnergyChart.energySources.${energy}` as Parameters<typeof t>[0]) as string
      )
    : null;
  const EnergyIcon = getInventoryFamilyNavIcon("territorialEnergy");
  const TransportIcon = getInventoryFamilyNavIcon("transportMobility");
  const AfatIcon = getInventoryFamilyNavIcon("afat");
  const MunicipalIcon = getInventoryFamilyNavIcon("municipalPatrimoine");

  return (
    <ChartContainer aria-labelledby={chartTitleId}>
      <div className="mb-3 gap-1">
        <ChartTitle id={chartTitleId}>{t("territorialEnergyChart.title")}</ChartTitle>
        <ChartDescription>{t("territorialEnergyChart.description")}</ChartDescription>
      </div>
      <Tabs defaultValue="energy">
        <TabsList
          className="bg-transparent p-0 border-b rounded-none w-full justify-start"
          aria-label={t("territorialEnergyChart.tabListAriaLabel")}
        >
          <TabsTrigger value="energy">
            <EnergyIcon aria-hidden="true" className="size-4" />
            {t("territorialEnergyChart.energyTab")}
          </TabsTrigger>
          <TabsTrigger value="transport">
            <TransportIcon aria-hidden="true" className="size-4" />
            {t("territorialEnergyChart.transportTab")}
          </TabsTrigger>
          <TabsTrigger value="afat">
            <AfatIcon aria-hidden="true" className="size-4" />
            {t("territorialEnergyChart.afatTab")}
          </TabsTrigger>
          <TabsTrigger value="municipal">
            <MunicipalIcon aria-hidden="true" className="size-4" />
            {t("territorialEnergyChart.municipalTab")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="energy">
          {isLoading ? <Skeleton className="w-full" style={{ height: 360 }} /> : null}
          {error ? (
            <ErrorChart error={error} title={t("territorialEnergyChart.errorTitle")} />
          ) : null}
          {territorialEnergy ? (
            <GroupedStackedBarChart
              ariaLabel={t("territorialEnergyChart.ariaLabel")}
              categories={territorialEnergy.categories}
              groups={energyGroups}
            />
          ) : null}
        </TabsContent>
        <TabsContent value="transport">
          {isLoading ? <Skeleton className="w-full" style={{ height: 360 }} /> : null}
          {error ? (
            <ErrorChart error={error} title={t("territorialEnergyChart.transportErrorTitle")} />
          ) : null}
          {transport ? (
            <GroupedStackedBarChart
              ariaLabel={t("territorialEnergyChart.transportAriaLabel")}
              categories={transport.categories}
              groups={transport.groups}
            />
          ) : null}
        </TabsContent>
        <TabsContent value="afat">
          {isLoading ? <Skeleton className="w-full" style={{ height: 360 }} /> : null}
          {error ? (
            <ErrorChart error={error} title={t("territorialEnergyChart.afatErrorTitle")} />
          ) : null}
          {afat ? (
            <StackedBarChart
              ariaLabel={t("territorialEnergyChart.afatAriaLabel")}
              categories={afat.categories}
              data={afat.data}
            />
          ) : null}
        </TabsContent>
        <TabsContent value="municipal">
          {isLoading ? <Skeleton className="w-full" style={{ height: 360 }} /> : null}
          {error ? (
            <ErrorChart error={error} title={t("territorialEnergyChart.municipalErrorTitle")} />
          ) : null}
          {municipalEnergy ? (
            <StackedBarChart
              ariaLabel={t("territorialEnergyChart.municipalAriaLabel")}
              categories={municipalEnergy.categories}
              data={municipalEnergy.data}
            />
          ) : null}
        </TabsContent>
      </Tabs>
    </ChartContainer>
  );
}
