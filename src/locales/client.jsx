"use client";

import { createI18nClient } from "next-international/client";

const { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale, useChangeLocale } =
  createI18nClient({
    fr: () => import("./translations/fr"),
    en: () => import("./translations/en"),
  });

export { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale, useChangeLocale };
