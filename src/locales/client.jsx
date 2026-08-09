"use client";

import { createI18nClient } from "next-international/client";

const { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale } = createI18nClient({
  fr: () => import("./fr"),
});

export { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale };
