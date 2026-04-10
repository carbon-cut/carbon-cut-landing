import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedServerI18n } from "@/locales/server";
import { ChevronRight } from "lucide-react";

export default function HelpComptePage() {
  const t = useScopedServerI18n("(pages).helpV1Category.compte");
  const quickLinks = t("quickAccess.items") as {
    title: string;
    description: string;
    href: string;
  }[];
  const faqs = t("faqs.items") as { title: string; description: string }[];
  const flowSteps = t("flow.steps") as string[];
  const errorMap = t("errorMap.items") as { label: string; meaning: string }[];
  const supportChecklist = t("support.checklist") as string[];

  return (
    <article className="w-full">
      <header
        aria-labelledby="help-account-title"
        className="rounded-2xl border border-border/30 bg-surface-warm px-5 py-6 md:px-8 md:py-7"
      >
        <div className="flex items-center gap-2">
          <Badge variant="default">{t("badge")}</Badge>
        </div>
        <Typography asChild variant="title" size="md">
          <h1 id="help-account-title" className="mt-4">
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
        </div>
      </header>

      <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="rounded-2xl border border-border/30 bg-card">
          <section
            aria-labelledby="help-account-quick-links"
            className="border-b border-border/30 px-5 py-5 md:px-7"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-account-quick-links">{t("quickAccess.title")}</h2>
            </Typography>
            <ul className="mt-4 divide-y divide-border/25">
              {quickLinks.map((item) => (
                <li key={item.href} className="py-3 first:pt-0 last:pb-0">
                  <Link href={item.href} className="group block">
                    <div className="flex items-start justify-between gap-2">
                      <Typography asChild variant="subtitle" size="md">
                        <h3>{item.title}</h3>
                      </Typography>
                      <ChevronRight
                        className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <Typography asChild variant="description" size="sm" className="mt-1">
                      <p>{item.description}</p>
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="help-account-faq"
            className="border-b border-border/30 px-5 py-5 md:px-7"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-account-faq">{t("faqs.title")}</h2>
            </Typography>
            <ul className="mt-4 divide-y divide-border/25">
              {faqs.map((item) => (
                <li key={item.title} className="py-3 first:pt-0 last:pb-0">
                  <Typography asChild variant="subtitle" size="md">
                    <h3>{item.title}</h3>
                  </Typography>
                  <Typography asChild variant="description" size="sm" className="mt-1">
                    <p>{item.description}</p>
                  </Typography>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="help-account-errors" className="px-5 py-5 md:px-7">
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-account-errors">{t("errorMap.title")}</h2>
            </Typography>
            <dl className="mt-4 space-y-3">
              {errorMap.map((item) => (
                <div key={item.label}>
                  <Typography asChild variant="subtitle" size="md">
                    <dt>{item.label}</dt>
                  </Typography>
                  <Typography asChild variant="description" size="sm" className="mt-1">
                    <dd>{item.meaning}</dd>
                  </Typography>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28">
          <section
            aria-labelledby="help-account-flow"
            className="rounded-2xl border border-border/30 bg-card p-5"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-account-flow">{t("flow.title")}</h2>
            </Typography>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-secondary">
              {flowSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="help-account-support"
            className="rounded-2xl border border-border/30 bg-card p-5"
          >
            <Typography asChild variant="subtitle" size="md">
              <h2 id="help-account-support">{t("support.title")}</h2>
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
