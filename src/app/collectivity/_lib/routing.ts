export const DEFAULT_COLLECTIVITY_PLAN_ID = "grand-sfax";

export type CollectivityModuleSlug = "cadrage" | "inventaire" | "scenarios" | "actions";

export function getCollectivityPlanRoute(planId: string) {
  return `/collectivity/${planId}`;
}

export function getCollectivityModuleRoute(planId: string, moduleSlug: CollectivityModuleSlug) {
  return `${getCollectivityPlanRoute(planId)}/${moduleSlug}`;
}
