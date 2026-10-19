import { createI18nServer } from "next-international/server";

const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } = createI18nServer({
  fr: () => import("./translations/fr"),
  en: () => import("./translations/en"),
});

export { getI18n, getScopedI18n, getStaticParams, getCurrentLocale };
