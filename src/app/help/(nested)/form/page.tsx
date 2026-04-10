import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedServerI18n } from "@/locales/server";
import { ChevronRight } from "lucide-react";

export default function HelpQuestionnairePage() {
  const t = useScopedServerI18n("(pages).helpV1Category.questionnaire");
  const summaryItems = t("summaryItems") as string[];
  const prepItems = t("prep.items") as string[];
  const flowSteps = t("flow.steps") as string[];
  const issues = t("issues.items") as { title: string; description: string }[];
  const scopeLimits = t("scope.limits") as string[];
  const supportChecklist = t("support.checklist") as string[];

  return (
    <article className="w-full">
      <header
        aria-labelledby="help-questionnaire-title"
        className="rounded-2xl border border-border/30 bg-surface-warm px-5 py-6 md:px-8 md:py-7"
      >
        <div className="flex items-center gap-2">
          <Badge variant="default">{t("badge")}</Badge>
          <Typography asChild variant="caption" size="sm" className="text-muted-foreground">
            <p>{t("scope.current")}</p>
          </Typography>
        </div>
        <Typography asChild variant="title" size="md">
          <h1 id="help-questionnaire-title" className="mt-4">
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
            <Link href="/form">{t("actions.startForm")}</Link>
          </Button>
        </div>
      </header>

      <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="rounded-2xl border border-border/30 bg-card">
          <div className="border-b border-border/30 px-5 py-5 md:px-7">
            <Typography asChild variant="subtitle" size="md">
              <h2>{t("summaryTitle")}</h2>
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
          </div>

          <section
            aria-labelledby="questionnaire-flow"
            className="border-b border-border/30 px-5 py-5 md:px-7"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="questionnaire-flow">{t("flow.title")}</h2>
            </Typography>
            <ol className="mt-4 space-y-3">
              {flowSteps.map((step, index) => (
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
            aria-labelledby="questionnaire-corrections"
            className="border-b border-border/30 px-5 py-5 md:px-7"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="questionnaire-corrections">{t("corrections.title")}</h2>
            </Typography>
            <dl className="mt-4 space-y-4">
              <div>
                <Typography asChild variant="subtitle" size="sm">
                  <dt>{t("corrections.resumeQuestion")}</dt>
                </Typography>
                <Typography asChild variant="description" size="sm" className="mt-1">
                  <dd>{t("corrections.resumeAnswer")}</dd>
                </Typography>
              </div>
              <div>
                <Typography asChild variant="subtitle" size="sm">
                  <dt>{t("corrections.afterSubmitQuestion")}</dt>
                </Typography>
                <Typography asChild variant="description" size="sm" className="mt-1">
                  <dd>{t("corrections.afterSubmitAnswer")}</dd>
                </Typography>
              </div>
            </dl>
          </section>

          <section aria-labelledby="questionnaire-issues" className="px-5 py-5 md:px-7">
            <Typography asChild variant="subtitle" size="md">
              <h2 id="questionnaire-issues">{t("issues.title")}</h2>
            </Typography>
            <ul className="mt-4 divide-y divide-border/25">
              {issues.map((issue) => (
                <li key={issue.title} className="py-3 first:pt-0 last:pb-0">
                  <Typography asChild variant="subtitle" size="sm">
                    <h3>{issue.title}</h3>
                  </Typography>
                  <Typography asChild variant="description" size="sm" className="mt-1">
                    <p>{issue.description}</p>
                  </Typography>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28">
          <section
            aria-labelledby="questionnaire-prep"
            className="rounded-2xl border border-border/30 bg-card p-5"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="questionnaire-prep">{t("prep.title")}</h2>
            </Typography>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-secondary">
              {prepItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="questionnaire-scope"
            className="rounded-2xl border border-border/30 bg-card p-5"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="questionnaire-scope">{t("scope.title")}</h2>
            </Typography>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-secondary">
              {scopeLimits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="questionnaire-support"
            className="rounded-2xl border border-border/30 bg-card p-5"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="questionnaire-support">{t("support.title")}</h2>
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
