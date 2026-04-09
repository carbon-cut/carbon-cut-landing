import type { Metadata } from "next";
import Link from "next/link";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";

const supportSeo = useScopedServerI18n("seo.pages.support");

export const metadata: Metadata = {
  title: supportSeo("title"),
  description: supportSeo("description"),
  keywords: toKeywordArray(supportSeo("keywords") as unknown),
};

export default function SupportPage() {
  const t = useScopedServerI18n("(pages).support");
  const checklist = t("checklist") as string[];

  return (
    <main id="content" className="bg-background px-4 pb-16 pt-32 md:px-8 md:pt-36">
      <section aria-labelledby="support-heading" className="mx-auto w-full max-w-6xl">
        <div className="border border-border/10 bg-card p-5 md:p-7">
          <h1
            id="support-heading"
            className="text-3xl font-semibold tracking-tight text-foreground"
          >
            {t("title")}
          </h1>
          <p className="mt-2 max-w-3xl text-base text-secondary">{t("description")}</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
            <aside className="space-y-6 border-b border-border/10 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{t("emailLabel")}</h2>
                <a
                  href="mailto:support@carboncut.app"
                  className="mt-2 block text-base font-semibold text-foreground underline underline-offset-4"
                >
                  support@carboncut.app
                </a>
                <p className="mt-2 text-sm text-secondary">{t("responseTime")}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground">{t("checklistTitle")}</h2>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-secondary">
                  {checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground">{t("scopeTitle")}</h2>
                <p className="mt-2 text-sm text-secondary">{t("scopeDescription")}</p>
              </div>
            </aside>

            <div>
              <form className="space-y-4" noValidate>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="support-name" className="text-sm font-medium text-foreground">
                      {t("form.name")}
                    </label>
                    <input
                      id="support-name"
                      type="text"
                      className="h-10 w-full rounded-md border border-border/20 bg-card px-3 text-sm text-foreground outline-none transition-colors duration-150 focus:border-border/45"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="support-email" className="text-sm font-medium text-foreground">
                      {t("form.email")}
                    </label>
                    <input
                      id="support-email"
                      type="email"
                      className="h-10 w-full rounded-md border border-border/20 bg-card px-3 text-sm text-foreground outline-none transition-colors duration-150 focus:border-border/45"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="support-topic" className="text-sm font-medium text-foreground">
                    {t("form.topic")}
                  </label>
                  <input
                    id="support-topic"
                    type="text"
                    className="h-10 w-full rounded-md border border-border/20 bg-card px-3 text-sm text-foreground outline-none transition-colors duration-150 focus:border-border/45"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="support-message" className="text-sm font-medium text-foreground">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="support-message"
                    rows={7}
                    className="w-full rounded-md border border-border/20 bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors duration-150 focus:border-border/45"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    disabled
                    className="h-10 rounded-md border border-primary bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    {t("form.submit")}
                  </button>
                  <p className="text-sm text-secondary">{t("form.notLive")}</p>
                </div>
              </form>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-border/10 pt-5">
                <Link
                  href="/help"
                  className="text-sm font-semibold text-foreground underline underline-offset-4"
                >
                  {t("actions.goHelp")}
                </Link>
                <Link
                  href="/form"
                  className="text-sm font-semibold text-foreground underline underline-offset-4"
                >
                  {t("actions.startForm")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
