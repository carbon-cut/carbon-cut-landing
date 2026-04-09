import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import { Mail } from "lucide-react";

const supportSeo = useScopedServerI18n("seo.pages.support");

export const metadata: Metadata = {
  title: supportSeo("title"),
  description: supportSeo("description"),
  keywords: toKeywordArray(supportSeo("keywords") as unknown),
};

export default function SupportPageV1() {
  const t = useScopedServerI18n("(pages).support");
  const checklist = t("checklist") as string[];

  return (
    <main id="content" className="bg-background px-4 pb-16 pt-32 md:px-8 md:pt-36">
      <section aria-labelledby="support-heading" className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-border/10 bg-card p-6 md:p-8">
          <Badge variant="default">{t("badge")}</Badge>
          <Typography asChild variant="title" size="md" className="mt-4 max-w-3xl">
            <h1 id="support-heading">{t("title")}</h1>
          </Typography>
          <Typography asChild variant="description" size="sm" className="mt-3 max-w-3xl">
            <p>{t("description")}</p>
          </Typography>

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <aside className="space-y-5">
              <div className="rounded-2xl border border-border/10 bg-card/70 p-5">
                <Typography asChild variant="subtitle" size="sm">
                  <h2>{t("emailLabel")}</h2>
                </Typography>
                <a
                  href="mailto:support@carboncut.app"
                  className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  <Mail className="h-4 w-4 text-chart-3" />
                  support@carboncut.app
                </a>
                <Typography asChild variant="description" size="sm" className="mt-2">
                  <p>{t("responseTime")}</p>
                </Typography>
              </div>

              <div className="rounded-2xl border border-border/10 bg-card/70 p-5">
                <Typography asChild variant="subtitle" size="sm">
                  <h2>{t("checklistTitle")}</h2>
                </Typography>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-secondary">
                  {checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border/10 bg-card/70 p-5">
                <Typography asChild variant="subtitle" size="sm">
                  <h2>{t("scopeTitle")}</h2>
                </Typography>
                <Typography asChild variant="description" size="sm" className="mt-2">
                  <p>{t("scopeDescription")}</p>
                </Typography>
              </div>
            </aside>

            <div className="rounded-2xl border border-border/10 bg-card/75 p-5 md:p-6">
              <form className="space-y-4" noValidate>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="support-name" className="text-sm font-medium text-foreground">
                      {t("form.name")}
                    </label>
                    <input
                      id="support-name"
                      type="text"
                      className="h-11 w-full rounded-xl border border-border/15 bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-secondary/70 focus:border-chart-2/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="support-email" className="text-sm font-medium text-foreground">
                      {t("form.email")}
                    </label>
                    <input
                      id="support-email"
                      type="email"
                      className="h-11 w-full rounded-xl border border-border/15 bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-secondary/70 focus:border-chart-2/40"
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
                    className="h-11 w-full rounded-xl border border-border/15 bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-secondary/70 focus:border-chart-2/40"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="support-message" className="text-sm font-medium text-foreground">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="support-message"
                    rows={6}
                    className="w-full rounded-xl border border-border/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-secondary/70 focus:border-chart-2/40"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Button type="button" variant="secondary" className="min-w-44">
                    {t("form.submit")}
                  </Button>
                  <Typography asChild variant="description" size="sm" className="text-secondary">
                    <p>{t("form.notLive")}</p>
                  </Typography>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="link" className="h-auto px-0 py-0 font-semibold">
              <Link href="/help">{t("actions.goHelp")}</Link>
            </Button>
            <Button asChild variant="link" className="h-auto px-0 py-0 font-semibold">
              <Link href="/form">{t("actions.startForm")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
