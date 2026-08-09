import { createI18nMiddleware } from "next-international/middleware";
import { NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

const I18nMiddleware = createI18nMiddleware({
  locales: ["fr"],
  defaultLocale: "fr",
  urlMappingStrategy: "rewrite",
});

export function withI18nMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (request, event, response) => {
    const i18nResponse = (I18nMiddleware(request) as NextResponse | undefined) ?? response;

    return middleware(request, event, i18nResponse);
  };
}
