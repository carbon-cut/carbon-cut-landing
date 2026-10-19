export const DEFAULT_COLLECTIVITY_PLAN_ID = "grand-sfax";

export const collectivityModuleSlugs = [
  "setup",
  "ghg-inventory",
  "ghg-result",
  "prospectives&Objectives",
  "investment-plan",
  "significant-indicators",
  "performance-ranking",
  "intercommunal-pooling",
] as const;

export type CollectivityModuleSlug = (typeof collectivityModuleSlugs)[number];

export function isCollectivityModuleSlug(value: string): value is CollectivityModuleSlug {
  return collectivityModuleSlugs.includes(value as CollectivityModuleSlug);
}

export function getCollectivityPlanRoute(planId: string) {
  return `/collectivity/projects/${planId}`;
}

export function getCollectivityModuleRoute(planId: string, moduleSlug: CollectivityModuleSlug) {
  return `${getCollectivityPlanRoute(planId)}/${moduleSlug}`;
}

export function getCollectivitySetupRoute() {
  return "/collectivity/projects/setup";
}

export function getCollectivityProjectsRoute(moduleSlug?: CollectivityModuleSlug | null) {
  if (!moduleSlug) {
    return "/collectivity/projects";
  }

  return `/collectivity/projects?module=${moduleSlug}`;
}
