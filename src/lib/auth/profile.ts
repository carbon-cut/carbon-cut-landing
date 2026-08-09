import type { AuthUser, ProductType } from "@/lib/auth/types";

export function getUserAllowedProducts(
  user: Pick<AuthUser, "allowedProducts" | "productType">
): ProductType[] {
  if (Array.isArray(user.allowedProducts) && user.allowedProducts.length > 0) {
    return user.allowedProducts.filter(
      (product): product is ProductType => product === "household" || product === "collectivity"
    );
  }

  if (user.productType === "collectivity") {
    return ["collectivity"];
  }

  return [];
}

export function hasUserProductAccess(
  user: Pick<AuthUser, "allowedProducts" | "productType">,
  product: ProductType
) {
  return getUserAllowedProducts(user).includes(product);
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
