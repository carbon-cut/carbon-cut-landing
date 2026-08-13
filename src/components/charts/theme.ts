import * as echarts from "echarts";

export const COLLECTIVITY_CHART_THEME = "carbon-cut-collectivity";

// Intentionally minimal for the proof of concept. Chart visual tokens will be
// defined here before result charts become product UI.
const collectivityChartTheme = {};

let isThemeRegistered = false;

export function registerCollectivityChartTheme() {
  if (isThemeRegistered) {
    return;
  }

  echarts.registerTheme(COLLECTIVITY_CHART_THEME, collectivityChartTheme);
  isThemeRegistered = true;
}
