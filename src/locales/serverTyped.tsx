/* import { createI18nServer } from "next-international/server";

const {
  getI18n: originalGetI18n,
  getScopedI18n: originalGetScopedI18n,
  getStaticParams,
  getCurrentLocale,
} = createI18nServer({
  fr: () => import("./fr"),
});

const modifiedGetI18n: () => Promise<(key: string, ...args: any[]) => string> = () =>
  originalGetI18n();
const modifiedGetScopedI18n: (
  scope: string
) => Promise<(key: string, ...args: any[]) => string> = (scope) => originalGetScopedI18n(scope);

export {
  modifiedGetI18n as getI18n,
  modifiedGetScopedI18n as getScopedI18n,
  getStaticParams,
  getCurrentLocale,
};
 */
