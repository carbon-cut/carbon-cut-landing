"use client";

import { useMemo } from "react";
import type { EChartsOption } from "echarts";

import EChartsChart from "@/components/charts/base/echarts-chart";
import { createPieTooltip } from "@/components/charts/shared/chart-tooltip";
import { formatChartPercentage, formatChartValue } from "@/components/charts/shared/formatters";
import { useChartUnitFormatter } from "@/components/charts/shared/use-chart-unit-formatter";

export type PieDatum = {
  id: string;
  label: string;
  unit: string;
  value: number;
};

type PieChartProps = {
  ariaLabel: string;
  data: PieDatum[];
};

const insideLabelThreshold = 10;
const chartLabelFontFamily = "var(--font-manrope_sans), sans-serif";

export default function PieChart({ ariaLabel, data }: PieChartProps) {
  const formatUnit = useChartUnitFormatter();
  const option = useMemo<EChartsOption>(() => {
    const total = data.reduce((sum, { value }) => sum + value, 0);

    return {
      legend: {
        show: false,
      },
      series: [
        {
          avoidLabelOverlap: true,
          data: data.map(({ id, label, value }) => {
            const percentage = total === 0 ? 0 : (value / total) * 100;
            const isInside = percentage >= insideLabelThreshold;

            return {
              id,
              label: {
                formatter: `{label|${label}}\n{percentage|${formatChartPercentage(percentage)}%}`,
                position: isInside ? "inside" : "outside",
                rich: {
                  label: {
                    fontFamily: chartLabelFontFamily,
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 20,
                  },
                  percentage: {
                    fontFamily: chartLabelFontFamily,
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 20,
                  },
                },
              },
              labelLine: {
                show: !isInside,
              },
              name: label,
              value,
            };
          }),
          radius: "80%",
          type: "pie",
        },
      ],
      tooltip: createPieTooltip(data, formatChartValue, formatUnit),
    };
  }, [data, formatUnit]);

  return <EChartsChart ariaLabel={ariaLabel} option={option} style={{ height: 250 }} />;
}
