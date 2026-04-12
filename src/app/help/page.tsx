import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import { BarChart3, ChevronRight, ClipboardList, Dot, Search, ShieldCheck } from "lucide-react";
import FAQs from "./(nested)/_components/Faq";

const helpSeo = useScopedServerI18n("seo.pages.help");

export const metadata: Metadata = {
  title: helpSeo("title"),
  description: helpSeo("description"),
  keywords: toKeywordArray(helpSeo("keywords") as unknown),
};

export default function HelpPage() {
  const t = useScopedServerI18n("(pages).helpCurrent");
  const topicHints = t("topicHints") as string[];
  const categories = t("categories.items") as {
    title: string;
    description: string;
    href: string;
  }[];
  const scopeAvailable = t("scope.available.items") as string[];
  const scopeUnavailable = t("scope.unavailable.items") as string[];
  const faqItems = t("faq.items") as { question: string; answer: string }[];
  const categoryIcons = [ClipboardList, BarChart3, ShieldCheck];

  return (
    <main id="content" className="bg-background px-4 pb-10 pt-32 md:px-8 md:pb-12 md:pt-36">
      <section aria-labelledby="help-heading" className="mx-auto w-full max-w-6xl">
        <header
          aria-labelledby="help-heading"
          className="rounded-2xl border border-border/30 bg-card px-5 py-6 md:px-8 md:py-7"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:w-2/3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">{t("badge")}</Badge>
                <Typography asChild variant="caption" size="sm" className="text-muted-foreground">
                  <p>{t("status")}</p>
                </Typography>
              </div>

              <Typography asChild variant="title" size="md" className="mt-4 max-w-3xl">
                <h1 id="help-heading">{t("title")}</h1>
              </Typography>
              <Typography asChild variant="description" size="sm" className="mt-3 max-w-2xl">
                <p>{t("description")}</p>
              </Typography>
            </div>
            {/* <label
              htmlFor="help-search"
              className="mt-5 grid w-full grid-cols-[auto_1fr] items-center gap-2 rounded-full border border-input bg-background px-3 text-sm text-secondary transition-colors focus-within:ring-1 focus-within:ring-ring lg:mt-0 lg:w-1/3 lg:max-w-xl"
            >
              <Search className="h-4 w-4 text-primary" aria-hidden="true" />
              <Input
                id="help-search"
                type="search"
                aria-label={t("searchLabel")}
                placeholder={t("searchPlaceholder")}
                className=" rounded-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              />
            </label> */}
          </div>
          <div className="mt-5 w-full border-t border-border pt-4">
            <Typography asChild variant="caption" size="sm" className="text-muted-foreground">
              <p>{t("topicsLabel")}</p>
            </Typography>
            <ul className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground">
              {topicHints.map((item) => (
                <li key={item} className="inline-flex items-center">
                  <Dot className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section aria-labelledby="help-categories-title" className="mt-8">
          <Typography asChild variant="subtitle" size="md">
            <h2 id="help-categories-title">{t("categories.title")}</h2>
          </Typography>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group rounded-xl border border-border/30 bg-card px-4 py-4 transition-colors hover:bg-surface-warm"
                  aria-label={`${category.title} - ${category.description}`}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Typography asChild variant="subtitle" size="sm" className="mt-3 block">
                    <h3>{category.title}</h3>
                  </Typography>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <Typography asChild variant="description" size="sm">
                      <p>{category.description}</p>
                    </Typography>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="help-scope-title" className="mt-10">
          <Typography asChild variant="subtitle" size="md">
            <h2 id="help-scope-title">{t("scope.title")}</h2>
          </Typography>
          <Typography asChild variant="description" size="sm" className="mt-3 max-w-3xl">
            <p>{t("scope.description")}</p>
          </Typography>

          <div className="mt-6 grid gap-6 border-t border-border/40 pt-5 md:grid-cols-2 md:gap-8">
            <section aria-labelledby="help-scope-available-title">
              <Typography asChild variant="subtitle" size="sm">
                <h3 id="help-scope-available-title">{t("scope.available.title")}</h3>
              </Typography>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-secondary">
                {scopeAvailable.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="help-scope-unavailable-title"
              className="md:border-l md:border-border/40 md:pl-8"
            >
              <Typography asChild variant="subtitle" size="sm">
                <h3 id="help-scope-unavailable-title">{t("scope.unavailable.title")}</h3>
              </Typography>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-secondary">
                {scopeUnavailable.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section aria-labelledby="help-faq-title" className="mt-10 ">
          <Typography asChild variant="subtitle" size="md">
            <h2 id="help-faq-title">{t("faq.title")}</h2>
          </Typography>
          <div className="mt-5 md:w-3/4">
            <FAQs
              faqItems={faqItems.map((item) => ({
                title: item.question,
                description: item.answer,
              }))}
            />
          </div>
        </section>

        <section aria-label="contact bridge" className="mt-10 border-t border-border/40 pt-5">
          <Typography asChild variant="description" size="sm">
            <p>
              {t("contactBridge.text")}{" "}
              <Link
                href="/contact"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                {t("contactBridge.linkText")}
              </Link>
            </p>
          </Typography>
        </section>
      </section>
    </main>
  );
}
