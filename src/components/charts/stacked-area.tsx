"use client";

import { useMemo } from "react";
import type { EChartsOption, LineSeriesOption } from "echarts";

import EChartsChart from "@/components/charts/base/echarts-chart";
import { chartColors } from "@/components/charts/palette";
import { createAxisTooltip } from "@/components/charts/shared/axis-tooltip";
import { formatChartPercentage, formatChartValue } from "@/components/charts/shared/formatters";
import { useChartUnitFormatter } from "@/components/charts/shared/use-chart-unit-formatter";

export type StackedAreaDatum = {
  color?: string;
  id: string;
  label: string;
  unit: string;
  values: number[];
};

type StackedAreaChartProps = {
  ariaLabel: string;
  categories: string[];
  data: StackedAreaDatum[];
  showShareLabels?: boolean;
};

type Label = LineSeriesOption["label"];

export default function StackedAreaChart({
  ariaLabel,
  categories,
  data,
  showShareLabels = false,
}: StackedAreaChartProps) {
  const formatUnit = useChartUnitFormatter();
  const option = useMemo<EChartsOption>(() => {
    const totals = categories.map((_, index) =>
      data.reduce((sum, series) => sum + series.values[index], 0)
    );
    const occupied: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }> = [];
    const LabelConstructor = function (values: number[]): Label {
      return {
        color: "hsl(var(--foreground))",
        formatter: (params: unknown) => {
          if (!params || typeof params !== "object" || !("dataIndex" in params)) {
            return "";
          }

          const index = Number(params.dataIndex);
          const value = values[index];
          const total = totals[index];

          return total > 0 ? `${formatChartPercentage((value / total) * 100)}%` : "";
        },
        fontWeight: 600,
        position: "insideTopLeft",
        show: true,
        padding: [1, 3],
      };
    };

    return {
      grid: {
        bottom: 64,
        containLabel: true,
        left: 8,
        right: 24,
        top: 24,
      },
      legend: {
        bottom: 8,
        type: "scroll",
      },
      series: data.map(({ color, id, label, values }, index) => {
        const seriesColor = color ?? chartColors[index % chartColors.length];

        return {
          areaStyle: { color: seriesColor },
          data: values,
          id,
          itemStyle: { color: seriesColor },
          label: showShareLabels ? LabelConstructor(values) : undefined,
          labelLayout: ({ labelRect, dataIndex, seriesIndex }) => {
            if (seriesIndex === 0 && dataIndex === 0) {
              occupied.length = 0;
            }
            const GAP = 10;
            const shiftX = 50;

            let y = labelRect.y;
            let x = labelRect.x;

            for (const previous of occupied) {
              const overlapsX =
                labelRect.x < previous.x + previous.width &&
                labelRect.x + labelRect.width > previous.x;

              const tooCloseY =
                y < previous.y + previous.height + GAP && y + labelRect.height + GAP > previous.y;

              if (overlapsX && tooCloseY) {
                const currentCenter = labelRect.y + labelRect.height / 2;
                const previousCenter = previous.y + previous.height / 2;

                if (currentCenter < previousCenter) {
                  // current label was ABOVE → push it upward
                  y = previous.y - labelRect.height - GAP;
                } else {
                  // current label was BELOW → push it downward
                  y = previous.y + previous.height + GAP;
                }
              }
            }

            occupied.push({
              x: labelRect.x,
              y,
              width: labelRect.width,
              height: labelRect.height,
            });

            if (dataIndex === values.length - 1) {
              x = x - shiftX;
            }
            return {
              x,
              y,
              hideOverlap: true,
            };
          },
          lineStyle: { color: seriesColor },
          name: label,
          stack: "stack",
          type: "line" as const,
        };
      }),
      tooltip: createAxisTooltip(data, formatChartValue, formatUnit),
      xAxis: {
        boundaryGap: false,
        data: categories,
        type: "category",
      },
      yAxis: {
        axisLabel: { formatter: (value: number) => formatChartValue(value, 0) },
        type: "value",
      },
    };
  }, [categories, data, formatUnit, showShareLabels]);

  return <EChartsChart ariaLabel={ariaLabel} option={option} style={{ height: 360 }} />;
}
