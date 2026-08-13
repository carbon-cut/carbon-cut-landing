"use client";

import type { EChartsOption } from "echarts";
import type { CSSProperties } from "react";
import ReactECharts from "echarts-for-react";

import { cn } from "@/lib/utils";
import {
  COLLECTIVITY_CHART_THEME,
  registerCollectivityChartTheme,
} from "@/components/charts/theme";

type EChartsChartProps = {
  ariaLabel: string;
  className?: string;
  option: EChartsOption;
  style?: CSSProperties;
};

export default function EChartsChart({ ariaLabel, className, option, style }: EChartsChartProps) {
  registerCollectivityChartTheme();

  return (
    <ReactECharts
      aria-label={ariaLabel}
      autoResize
      className={cn("w-full", className)}
      notMerge
      option={option}
      opts={{ renderer: "svg" }}
      role="img"
      style={{ width: "100%", ...style }}
      theme={COLLECTIVITY_CHART_THEME}
    />
  );
}
