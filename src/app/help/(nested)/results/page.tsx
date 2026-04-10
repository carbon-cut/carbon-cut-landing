import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedServerI18n } from "@/locales/server";
import { ChevronRight } from "lucide-react";
import FAQs from "../_components/Faq";

export default function HelpResultatsPage() {
  const t = useScopedServerI18n("(pages).helpCategory.resultats");
  const summaryItems = t("summaryItems") as string[];
  const readingSteps = t("readingGuide.steps") as string[];
  const indicators = t("indicators.items") as { title: string; description: string }[];
  const recommendationItems = t("recommendations.items") as string[];
  const limits = t("limits.items") as string[];
  const supportChecklist = t("support.checklist") as string[];

  return (
    <article className="w-full">
      <header
        aria-labelledby="help-results-title"
        className="rounded-2xl border border-border/30 bg-surface-warm px-5 py-6 md:px-8 md:py-7"
      >
        <div className="flex items-center gap-2">
          <Badge variant="default">{t("badge")}</Badge>
        </div>
        <Typography asChild variant="title" size="md">
          <h1 id="help-results-title" className="mt-4">
            {t("title")}
          </h1>
        </Typography>
        <Typography asChild variant="subtitle" size="md" className="mt-2">
          <p>{t("subtitle")}</p>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mt-3 max-w-3xl">
          <p>{t("intro")}</p>
        </Typography>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="lg">
            <Link href="/help">{t("actions.backToCategories")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/form">{t("actions.restart")}</Link>
          </Button>
        </div>
      </header>

      <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="rounded-2xl border border-border/30 bg-card">
          <section
            aria-labelledby="help-results-summary"
            className="border-b border-border/30 px-5 py-5 md:px-7"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-results-summary">{t("summaryTitle")}</h2>
            </Typography>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              {summaryItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ChevronRight
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="help-results-reading"
            className="border-b border-border/30 px-5 py-5 md:px-7"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-results-reading">{t("readingGuide.title")}</h2>
            </Typography>
            <ol className="mt-4 space-y-3">
              {readingSteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[28px_1fr] items-start gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/50 text-xs font-semibold text-foreground">
                    {index + 1}
                  </span>
                  <Typography asChild variant="description" size="sm">
                    <p>{step}</p>
                  </Typography>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="help-results-indicators"
            className="border-b border-border/30 px-5 py-5 md:px-7"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-results-indicators">{t("indicators.title")}</h2>
            </Typography>
            <div className="mt-4 md:w-3/4">
              <FAQs faqItems={indicators} />
            </div>
          </section>

          <section aria-labelledby="help-results-reco" className="px-5 py-5 md:px-7">
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-results-reco">{t("recommendations.title")}</h2>
            </Typography>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-secondary">
              {recommendationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28">
          <section
            aria-labelledby="help-results-limits"
            className="rounded-2xl border border-border/30 bg-card p-5"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-results-limits">{t("limits.title")}</h2>
            </Typography>
            <Typography asChild variant="description" size="sm" className="mt-2">
              <p>{t("limits.description")}</p>
            </Typography>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-secondary">
              {limits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="help-results-support"
            className="rounded-2xl border border-border/30 bg-card p-5"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-results-support">{t("support.title")}</h2>
            </Typography>
            <Typography asChild variant="description" size="sm" className="mt-2">
              <p>{t("support.description")}</p>
            </Typography>
            <Typography asChild variant="caption" size="sm" className="mt-3 text-muted-foreground">
              <p>{t("support.checklistTitle")}</p>
            </Typography>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-secondary">
              {supportChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/contact">{t("actions.contact")}</Link>
              </Button>
            </div>
          </section>
        </aside>
      </section>
    </article>
  );
}
