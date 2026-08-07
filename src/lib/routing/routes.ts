export type HelpCategorySlug = "form" | "results" | "account";

function normalizePath(path: string) {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function localizeInternalHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) {
    return href;
  }

  return normalizePath(href);
}

export function getAuthSignInRoute(returnTo?: string | null) {
  const base = "/auth/sign-in";

  if (!returnTo) {
    return base;
  }

  return `${base}?${new URLSearchParams({ returnTo }).toString()}`;
}

export function getAuthSignUpRoute(returnTo?: string | null) {
  const base = "/auth/sign-up";

  if (!returnTo) {
    return base;
  }

  return `${base}?${new URLSearchParams({ returnTo }).toString()}`;
}

export function getAuthForgotPasswordRoute() {
  return "/auth/forgot-password";
}

export function getAuthConfirmationRequiredRoute(
  params?: URLSearchParams | Record<string, string>
) {
  const base = "/auth/confirmation-required";

  if (!params) {
    return base;
  }

  const searchParams = params instanceof URLSearchParams ? params : new URLSearchParams(params);
  const query = searchParams.toString();

  return query ? `${base}?${query}` : base;
}

export function getAuthConfirmEmailRoute(params?: URLSearchParams | Record<string, string>) {
  const base = "/auth/confirm-email";

  if (!params) {
    return base;
  }

  const searchParams = params instanceof URLSearchParams ? params : new URLSearchParams(params);
  const query = searchParams.toString();

  return query ? `${base}?${query}` : base;
}

export function getFormRoute() {
  return "/form";
}

export function getFormResultRoute(id?: string | null) {
  const base = "/form/result";

  if (!id) {
    return base;
  }

  return `${base}?${new URLSearchParams({ id }).toString()}`;
}

export function getContactRoute() {
  return "/contact";
}

export function getHelpRoute() {
  return "/help";
}

export function getHelpCategoryRoute(slug: HelpCategorySlug) {
  return `/help/${slug}`;
}

export function getCollectivityLandingRoute() {
  return "/collectivity";
}

export function getCollectivityStartRoute() {
  return "/collectivity/start";
}

export function getCollectivitySetupEntryRoute() {
  return "/collectivity/setup";
}
