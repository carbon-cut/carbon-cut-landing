import * as echarts from "echarts";

import { chartColors } from "@/components/charts/palette";

export const COLLECTIVITY_CHART_THEME = "carbon-cut-collectivity";

const collectivityChartTheme = {
  color: chartColors,
};

let isThemeRegistered = false;

export function registerCollectivityChartTheme() {
  if (isThemeRegistered) {
    return;
  }

  echarts.registerTheme(COLLECTIVITY_CHART_THEME, collectivityChartTheme);
  isThemeRegistered = true;
}
