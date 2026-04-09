import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typography from "@/components/ui/typography";
import { toKeywordArray } from "@/lib/seo";
import { useScopedServerI18n } from "@/locales/server";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

const contactSeo = useScopedServerI18n("seo.pages.contact");

export const metadata: Metadata = {
  title: contactSeo("title"),
  description: contactSeo("description"),
  keywords: toKeywordArray(contactSeo("keywords") as unknown),
};

export default function ContactPage() {
  const t = useScopedServerI18n("(pages).contact");
  const checklist = t("checklist") as string[];

  return (
    <main id="content" className="bg-background px-4 pb-20 pt-32 md:px-8 md:pt-40">
      <section aria-labelledby="contact-heading" className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.8fr)] lg:gap-12">
          <aside className="space-y-8">
            <header className="space-y-4">
              <Badge variant={"default"}>{t("badge")}</Badge>
              <Typography asChild variant="title" size="xl">
                <h1 id="contact-heading">{t("title")}</h1>
              </Typography>

              <Typography asChild variant="description" size="md" className="max-w-xl">
                <p>{t("description")}</p>
              </Typography>
            </header>

            <section aria-labelledby="contact-direct-title" className="border-l-2 border-primary/40 pl-4">
              <Typography asChild variant="subtitle" size="sm">
                <h2 id="contact-direct-title">{t("emailLabel")}</h2>
              </Typography>

              <a
                href="mailto:support@carboncut.app"
                aria-label="support@carboncut.app"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4"
              >
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                support@carboncut.app
              </a>

              <Typography asChild variant="caption" size="sm" className="mt-2 block">
                <p>{t("responseTime")}</p>
              </Typography>
            </section>

            <section aria-labelledby="contact-checklist-title" className="space-y-3">
              <Typography asChild variant="subtitle" size="sm">
                <h2 id="contact-checklist-title">{t("checklistTitle")}</h2>
              </Typography>

              <ul className="space-y-2 text-sm text-secondary">
                {checklist.map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border/50 text-xs text-foreground"
                    >
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="contact-scope-title"
              className="rounded-2xl border border-border/30 bg-card/40 p-4"
            >
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                <Typography asChild variant="subtitle" size="sm">
                  <h2 id="contact-scope-title">{t("scopeTitle")}</h2>
                </Typography>
              </div>

              <Typography asChild variant="caption" size="sm" className="mt-2 block">
                <p>{t("scopeDescription")}</p>
              </Typography>
            </section>
          </aside>

          <section
            aria-labelledby="contact-form-title"
            className="rounded-2xl border border-border/35 bg-card p-6 md:p-7"
          >
            <Typography asChild variant="subtitle" size="lg" className="text-foreground">
              <h2 id="contact-form-title">{t("badge")}</h2>
            </Typography>

            <Typography asChild variant="description" size="sm" className="mt-2">
              <p>{t("form.notLive")}</p>
            </Typography>

            <form className="mt-6 space-y-5" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{t("form.name")}</Label>
                  <Input id="contact-name" type="text" className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">{t("form.email")}</Label>
                  <Input id="contact-email" type="email" className="bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-topic">{t("form.topic")}</Label>
                <Input id="contact-topic" type="text" className="bg-background" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">{t("form.message")}</Label>
                <Textarea id="contact-message" rows={7} className="bg-background" />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button type="button" disabled className="min-w-48">
                  {t("form.submit")}
                </Button>

                <Button asChild variant="outline" className="min-w-48">
                  <Link href="/help">
                    {t("actions.goHelp")}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <nav aria-label="contact quick links" className="border-t border-border/25 pt-4">
                <Button asChild variant="link" className="h-auto p-0 text-sm font-semibold">
                  <Link href="/form">{t("actions.startForm")}</Link>
                </Button>
              </nav>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
