"use client";

import { useMemo } from "react";
import type { EChartsOption } from "echarts";

import EChartsChart from "@/components/charts/base/echarts-chart";
import { chartColors } from "@/components/charts/palette";
import { createAxisTooltip } from "@/components/charts/shared/axis-tooltip";
import { formatChartValue } from "@/components/charts/shared/formatters";
import { useChartUnitFormatter } from "@/components/charts/shared/use-chart-unit-formatter";

export type GroupedStackedBarSegment = {
  color?: string;
  id: string;
  label: string;
  unit: string;
  values: number[];
};

export type GroupedStackedBarGroup = {
  id: string;
  label: string;
  segments: GroupedStackedBarSegment[];
  summary?: GroupedStackedBarSegment;
};

type GroupedStackedBarChartProps = {
  ariaLabel: string;
  categories: string[];
  groups: GroupedStackedBarGroup[];
};

export default function GroupedStackedBarChart({
  ariaLabel,
  categories,
  groups,
}: GroupedStackedBarChartProps) {
  const formatUnit = useChartUnitFormatter();
  const option = useMemo<EChartsOption>(() => {
    const segments = groups.flatMap(({ segments }) => segments);
    const summaries = groups.flatMap(({ summary }) => (summary ? [summary] : []));
    let visibleSeriesIndex = 0;
    const getVisibleSeriesStyle = (color?: string) => {
      const paletteColor = chartColors[visibleSeriesIndex % chartColors.length];
      visibleSeriesIndex += 1;

      return { color: color ?? paletteColor };
    };

    return {
      grid: {
        bottom: 64,
        containLabel: true,
        left: 8,
        right: 8,
        top: 24,
      },
      legend: {
        bottom: 8,
        data: Array.from(new Set([...summaries, ...segments].map(({ label }) => label))),
        type: "scroll",
      },
      series: groups.flatMap(({ id: groupId, segments, summary }, groupIndex) => [
        ...(summary
          ? [
              {
                barCategoryGap: "48%",
                barGap: "8%",
                barMaxWidth: 28,
                data: summary.values,
                id: summary.id,
                itemStyle: getVisibleSeriesStyle(summary.color),
                name: summary.label,
                stack: `${groupId}-summary`,
                type: "bar" as const,
              },
            ]
          : []),
        ...segments.map(({ color, id, label, values }) => ({
          barCategoryGap: "48%",
          barGap: "8%",
          barMaxWidth: summary ? 10 : 32,
          data: values,
          id,
          itemStyle: getVisibleSeriesStyle(color),
          name: label,
          stack: groupId,
          type: "bar" as const,
        })),
        ...(summary && groups[groupIndex + 1]?.summary
          ? [
              {
                barCategoryGap: "48%",
                barGap: "8%",
                barMaxWidth: 14,
                data: categories.map(() => 0),
                id: `${groupId}-spacer`,
                itemStyle: { color: "transparent" },
                name: `${groupId}-spacer`,
                silent: true,
                stack: `${groupId}-spacer`,
                tooltip: { show: false },
                type: "bar" as const,
              },
            ]
          : []),
      ]),
      tooltip: createAxisTooltip([...summaries, ...segments], formatChartValue, formatUnit),
      xAxis: {
        axisTick: { alignWithLabel: true },
        data: categories,
        type: "category",
      },
      yAxis: {
        axisLabel: { formatter: (value: number) => formatChartValue(value, 0) },
        type: "value",
      },
    };
  }, [categories, formatUnit, groups]);

  return <EChartsChart ariaLabel={ariaLabel} option={option} style={{ height: 360 }} />;
}
