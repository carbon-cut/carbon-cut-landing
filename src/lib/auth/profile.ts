import type { AuthUser, ProductType } from "@/lib/auth/types";

export function getUserProductType(user: Pick<AuthUser, "productType">): ProductType {
  return user.productType === "collectivity" ? "collectivity" : "household";
}

export function getUserPlanIds(user: Pick<AuthUser, "planId">): string[] {
  return Array.isArray(user.planId)
    ? user.planId.filter(
        (planId): planId is string => typeof planId === "string" && planId.length > 0
      )
    : [];
}

export function getPrimaryPlanId(user: Pick<AuthUser, "planId">): string | null {
  return getUserPlanIds(user)[0] ?? null;
}
