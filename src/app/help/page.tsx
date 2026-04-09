import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import {
  BarChart3,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Leaf,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";

const helpSeo = useScopedServerI18n("seo.pages.help");

export const metadata: Metadata = {
  title: helpSeo("title"),
  description: helpSeo("description"),
  keywords: toKeywordArray(helpSeo("keywords") as unknown),
};

const categoryIcons = [Leaf, BarChart3, ClipboardList, Truck, CircleHelp, ShieldCheck, Leaf];

export default function HelpPage() {
  const t = useScopedServerI18n("(pages).help");
  const categories = t("categories") as { title: string; meta: string }[];
  const questions = t("questions") as string[];
  const articleSteps = t("featuredArticle.steps") as string[];

  return (
    <main id="content" className="bg-background px-4 pb-16 pt-32 md:px-8 md:pt-36">
      <section aria-labelledby="help-heading" className="mx-auto w-full max-w-6xl">
        <div className="w-full rounded-3xl border border-border/10 bg-card p-5 md:p-8">
          <div className="rounded-2xl border border-border/10 bg-surface-warm p-5 md:p-7">
            <Badge variant="default">{t("badge")}</Badge>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Typography asChild variant="title" size="md" className="max-w-3xl">
                  <h1 id="help-heading">{t("title")}</h1>
                </Typography>
                <Typography asChild variant="description" size="sm" className="mt-2 max-w-2xl">
                  <p>{t("description")}</p>
                </Typography>
              </div>

              <label
                htmlFor="help-search"
                className="flex h-11 w-full items-center gap-2 rounded-xl border border-border/15 bg-background px-3 text-sm text-secondary lg:max-w-sm"
              >
                <Search className="h-4 w-4 text-secondary" aria-hidden="true" />
                <Input
                  id="help-search"
                  type="search"
                  aria-label={t("searchLabel")}
                  placeholder={t("searchPlaceholder")}
                  className="h-full border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                />
              </label>
            </div>
          </div>

          <div className="mt-8">
            <Typography asChild variant="subtitle" size="sm">
              <h2>{t("categoriesTitle")}</h2>
            </Typography>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => {
                const Icon = categoryIcons[index % categoryIcons.length];

                return (
                  <Link
                    key={category.title}
                    href="/support"
                    className="group rounded-2xl border border-border/15 bg-card/70 p-4 transition-colors hover:bg-surface-warm"
                    aria-label={`${category.title} - ${category.meta}`}
                  >
                    <Icon className="h-4 w-4 text-secondary" aria-hidden="true" />
                    <Typography asChild variant="subtitle" size="sm" className="mt-3 block">
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                    </Typography>
                    <div className="mt-1 flex items-center justify-between">
                      <Typography asChild variant="description" size="sm">
                        <p>{category.meta}</p>
                      </Typography>
                      <ChevronRight
                        className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <aside className="space-y-5">
              <div className="rounded-2xl border border-border/10 bg-card/70 p-5">
                <Typography asChild variant="subtitle" size="sm">
                  <h2>{t("questionsTitle")}</h2>
                </Typography>
                <ul className="mt-4 space-y-2">
                  {questions.map((question) => (
                    <li key={question}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl border border-border/10 bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-surface-warm"
                        aria-label={question}
                      >
                        <span>{question}</span>
                        <ChevronRight className="h-4 w-4 text-secondary" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="cta" size="lg">
                  <Link href="/form">{t("actions.start")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/support">{t("actions.support")}</Link>
                </Button>
              </div>
            </aside>

            <article className="rounded-2xl border border-border/10 bg-card/80 p-5 md:p-6">
              <Typography asChild variant="subtitle" size="md" className="max-w-2xl">
                <h2>{t("featuredArticle.title")}</h2>
              </Typography>
              <Typography asChild variant="description" size="sm" className="mt-3">
                <p>{t("featuredArticle.intro")}</p>
              </Typography>

              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-secondary">
                {articleSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <Typography asChild variant="subtitle" size="sm" className="mt-5 block">
                <h3>{t("featuredArticle.noteTitle")}</h3>
              </Typography>
              <Typography asChild variant="description" size="sm" className="mt-1">
                <p>{t("featuredArticle.note")}</p>
              </Typography>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/10 pt-4">
                <Typography asChild variant="description" size="sm">
                  <p>{t("featuredArticle.helpful")}</p>
                </Typography>
                <Button type="button" size="sm" variant="outline" className="px-4">
                  {t("featuredArticle.answers.yes")}
                </Button>
                <Button type="button" size="sm" variant="outline" className="px-4">
                  {t("featuredArticle.answers.no")}
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
