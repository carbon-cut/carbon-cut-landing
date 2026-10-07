import { createI18nMiddleware } from "next-international/middleware";
import { NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

const supportedLocales = ["fr", "en"] as const;

const I18nMiddleware = createI18nMiddleware({
  locales: [...supportedLocales],
  defaultLocale: "fr",
  urlMappingStrategy: "rewrite",
});

const localePrefixPattern = /^[a-z]{2}(?:-[a-z]{2})?$/i;

function getLocalePrefix(pathname: string) {
  const prefix = pathname.split("/")[1];

  return localePrefixPattern.test(prefix) ? prefix.toLowerCase() : null;
}

export function withI18nMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (request, event, response) => {
    const pathname = request.nextUrl.pathname;
    const localePrefix = getLocalePrefix(pathname);

    if (localePrefix) {
      const url = request.nextUrl.clone();
      const localizedPath = pathname.slice(localePrefix.length + 1) || "/";
      url.pathname = localizedPath === "/" ? "/collectivity" : localizedPath;
      const redirectResponse = NextResponse.redirect(url);

      if (supportedLocales.some((locale) => locale === localePrefix)) {
        redirectResponse.cookies.set("Next-Locale", localePrefix, { sameSite: "strict" });
      }

      return redirectResponse;
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/collectivity", request.url));
    }

    const i18nResponse = (I18nMiddleware(request) as NextResponse | undefined) ?? response;

    return middleware(request, event, i18nResponse);
  };
}
