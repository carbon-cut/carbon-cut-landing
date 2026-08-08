/* "use client";
import { createI18nClient } from "next-international/client";
export type LocaleKey = string; //LocaleKeys<FlattenLocale<typeof fr>, undefined>;

const {
  useI18n: originalUseI18n,
  useScopedI18n: originalUseScopedI18n,
  I18nProviderClient,
  useCurrentLocale,
} = createI18nClient({
  fr: () => import("./fr"),
});

const modifiedUseI18n: () => ((key: string, ...args: any[]) => string) = () => originalUseI18n();
const modifiedUseScopedI18n: (scope: string) => ((key: string, ...args: any[]) => string) =
  (scope) => originalUseScopedI18n(scope);

export {
  modifiedUseI18n as useI18n,
  modifiedUseScopedI18n as useScopedI18n,
  I18nProviderClient,
  useCurrentLocale,
};
 */
