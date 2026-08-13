"use client";

import GroupedStackedBarChart, {
  type GroupedStackedBarGroup,
} from "@/components/charts/grouped-stacked-bar";
import StackedBarChart, { type StackedBarDatum } from "@/components/charts/stacked-bar";
import ChartContainer from "@/components/charts/shared/chart-container";
import { ChartDescription, ChartTitle } from "@/components/charts/shared/chart-copy";
import {
  Tabs,
  TabsContent as TabsPrimitiveContent,
  TabsList,
  TabsTrigger as TabsPrimitiveTrigger,
} from "@/components/ui/tabs";
import { getInventoryFamilyNavIcon } from "@/app/[locale]/collectivity/[planId]/inventory/components/inventoryNavIcons";
import {
  chartFuelColors,
  chartMunicipalEnergyColors,
  chartMunicipalUseColors,
  chartAfatColors,
  chartSectorColors,
  chartSourceColors,
  chartTransportActivityColors,
} from "@/components/charts/palette";
import { useScopedI18n } from "@/locales/client";

import territorialEnergy from "../_fixtures/territorial-energy.json";
import transportEmissions from "../_fixtures/transport-emissions.json";
import afatEmissions from "../_fixtures/afat-emissions.json";
import municipalEmissions from "../_fixtures/municipal-emissions.json";
import React from "react";

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

export default function TerritorialEnergyChart() {
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const chartTitleId = "territorial-energy-poc-title";
  const energyGroups: GroupedStackedBarGroup[] = territorialEnergy.sources.map((source) => {
    const sourceColor =
      source.id === "electricity"
        ? chartSourceColors.electricity
        : source.id === "natural-gas"
          ? chartSourceColors.naturalGas
          : chartSourceColors.gpl;

    return {
      ...source,
      summary: { ...source.summary, color: sourceColor },
      segments: source.segments.map((segment) => {
        const sectorId = segment.id.slice(segment.id.lastIndexOf("-") + 1);
        const color = chartSectorColors[sectorId as keyof typeof chartSectorColors];

        return { ...segment, color };
      }),
    };
  });
  const transportGroups: GroupedStackedBarGroup[] = transportEmissions.breakdowns.map(
    (breakdown) => ({
      ...breakdown,
      segments: breakdown.segments.map((segment) => {
        const key = segment.id.replace(`${breakdown.id === "by-fuel" ? "fuel" : "activity"}-`, "");
        const color =
          breakdown.id === "by-fuel"
            ? chartFuelColors[key as keyof typeof chartFuelColors]
            : chartTransportActivityColors[key as keyof typeof chartTransportActivityColors];

        return { ...segment, color };
      }),
    })
  );
  const afatData: StackedBarDatum[] = afatEmissions.series.map((series) => ({
    ...series,
    color: chartAfatColors[series.id as keyof typeof chartAfatColors],
  }));
  const municipalGroups: GroupedStackedBarGroup[] = municipalEmissions.breakdowns.map(
    (breakdown) => ({
      ...breakdown,
      segments: breakdown.segments.map((segment) => {
        const key = segment.id.replace(`${breakdown.id === "by-use" ? "use" : "energy"}-`, "");
        const color =
          breakdown.id === "by-use"
            ? chartMunicipalUseColors[key as keyof typeof chartMunicipalUseColors]
            : chartMunicipalEnergyColors[key as keyof typeof chartMunicipalEnergyColors];

        return { ...segment, color };
      }),
    })
  );
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
          <GroupedStackedBarChart
            ariaLabel={t("territorialEnergyChart.ariaLabel")}
            categories={territorialEnergy.years}
            groups={energyGroups}
          />
        </TabsContent>
        <TabsContent value="transport">
          <GroupedStackedBarChart
            ariaLabel={t("territorialEnergyChart.transportAriaLabel")}
            categories={transportEmissions.years}
            groups={transportGroups}
          />
        </TabsContent>
        <TabsContent value="afat">
          <StackedBarChart
            ariaLabel={t("territorialEnergyChart.afatAriaLabel")}
            categories={afatEmissions.years}
            data={afatData}
          />
        </TabsContent>
        <TabsContent value="municipal">
          <GroupedStackedBarChart
            ariaLabel={t("territorialEnergyChart.municipalAriaLabel")}
            categories={municipalEmissions.years}
            groups={municipalGroups}
          />
        </TabsContent>
      </Tabs>
    </ChartContainer>
  );
}
