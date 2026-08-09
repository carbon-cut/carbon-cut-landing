import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { localizeInternalHref, getContactRoute } from "@/lib/routing/routes";
import { getScopedI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import { setStaticParamsLocale } from "next-international/server";
import { BarChart3, ChevronRight, ClipboardList, Dot, Search, ShieldCheck } from "lucide-react";
import FAQs from "./(nested)/_components/Faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const helpSeo = await getScopedI18n("seo.pages.help");

  return {
    title: helpSeo("title"),
    description: helpSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) => helpSeo(`keywords.${i}` as Parameters<typeof helpSeo>[0]))
    ),
  };
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("(pages).helpCurrent");
  const topicHints = Array.from({ length: 5 }).map((_, i) =>
    t(`topicHints.${i}` as Parameters<typeof t>[0])
  );
  const categories = Array.from({ length: 3 }).map((_, i) => ({
    title: t(`categories.items.${i}.title` as Parameters<typeof t>[0]),
    description: t(`categories.items.${i}.description` as Parameters<typeof t>[0]),
    href: t(`categories.items.${i}.href` as Parameters<typeof t>[0]),
  }));
  const scopeAvailable = Array.from({ length: 3 }).map((_, i) =>
    t(`scope.available.items.${i}` as Parameters<typeof t>[0])
  );
  const scopeUnavailable = Array.from({ length: 5 }).map((_, i) =>
    t(`scope.unavailable.items.${i}` as Parameters<typeof t>[0])
  );
  const faqItems = Array.from({ length: 8 }).map((_, i) => ({
    question: t(`faq.items.${i}.question` as Parameters<typeof t>[0]),
    answer: t(`faq.items.${i}.answer` as Parameters<typeof t>[0]),
  }));
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
                  href={localizeInternalHref(category.href)}
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
                href={getContactRoute()}
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
