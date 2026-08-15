"use client";

import { useMemo } from "react";
import type { EChartsOption } from "echarts";

import EChartsChart from "@/components/charts/base/echarts-chart";
import { createAxisTooltip } from "@/components/charts/shared/axis-tooltip";
import { formatChartValue } from "@/components/charts/shared/formatters";
import { useChartUnitFormatter } from "@/components/charts/shared/use-chart-unit-formatter";

export type StackedBarDatum = {
  color?: string;
  id: string;
  label: string;
  unit: string;
  values: number[];
};

export type StackedBarLineDatum = StackedBarDatum;

type StackedBarChartProps = {
  ariaLabel: string;
  categories: string[];
  data: StackedBarDatum[];
  line?: StackedBarLineDatum;
};

function getChartValue(params: unknown) {
  if (params && typeof params === "object" && "value" in params) {
    return Number(params.value);
  }

  return 0;
}

export default function StackedBarChart({
  ariaLabel,
  categories,
  data,
  line,
}: StackedBarChartProps) {
  const formatUnit = useChartUnitFormatter();
  const option = useMemo<EChartsOption>(() => {
    return {
      grid: {
        bottom: 64,
        containLabel: true,
        left: 8,
        right: 8,
        top: 32,
      },
      legend: {
        bottom: 8,
        type: "scroll",
      },
      series: [
        ...data.map(({ color, id, label, values }) => ({
          barMaxWidth: 56,
          id,
          itemStyle: color ? { color } : undefined,
          name: label,
          stack: "emissions",
          type: "bar" as const,
          data: values,
        })),
        ...(line
          ? [
              {
                data: line.values,
                id: line.id,
                label: {
                  formatter: (params: unknown) => formatChartValue(getChartValue(params)),
                  position: "top" as const,
                  show: true,
                },
                lineStyle: {
                  color: "#000000",
                  type: "dashed" as const,
                  width: 3,
                },
                name: line.label,
                symbol: "circle",
                symbolSize: 7,
                type: "line" as const,
              },
            ]
          : []),
      ],
      tooltip: createAxisTooltip([...data, ...(line ? [line] : [])], formatChartValue, formatUnit),
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
  }, [categories, data, formatUnit, line]);

  return <EChartsChart ariaLabel={ariaLabel} option={option} style={{ height: 360 }} />;
}
