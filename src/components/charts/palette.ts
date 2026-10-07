const palette = {
  // Core categorical colors
  green: "#18A875",
  teal: "#20A6A3",
  blue: "#3F88D4",
  violet: "#8873D8",
  rose: "#CE68A8",
  gold: "#C5A64D",
  coral: "#E67A5A",
  slate: "#446F86",

  // Softer energy-source colors
  electricity: "#D98A68",
  naturalGas: "#C79286",
  gpl: "#A7829D",
} as const;

/**
 * Generic ECharts palette.
 *
 * Ordered for contrast rather than as a hue gradient:
 * green → violet → teal → coral → blue → gold → rose → slate
 *
 * This prevents the first 3–4 series from all becoming
 * green/teal/blue shades.
 */
export const chartColors = [
  palette.green,
  palette.violet,

  palette.coral,
  palette.teal,

  palette.gold,
  palette.blue,
  palette.rose,
  palette.slate,
] as const;

/**
 * Main emissions overview.
 *
 * Deliberately not taken sequentially from chartColors,
 * because these colors frequently appear as large adjacent areas.
 */
export const emissionColors = {
  energy: palette.green,
  afat: palette.gold,
  waste: palette.rose,
  absorption: palette.violet,
} as const;

/**
 * Territorial sectors.
 *
 * Much stronger hue separation than:
 * green → teal → cyan → blue → violet...
 */
export const sectorColors = {
  transport: palette.green,
  residential: palette.violet,
  industry: palette.slate,
  tertiary: palette.blue,
  agriculture: palette.teal,
  municipal: palette.gold,
} as const;

/**
 * Energy sources.
 *
 * Keep these softer: they frequently occupy very large bars,
 * and the version in your latest energy chart already works well.
 */
export const energyColors = {
  electricity: palette.electricity,
  naturalGas: palette.naturalGas,
  gpl: palette.gpl,
} as const;
