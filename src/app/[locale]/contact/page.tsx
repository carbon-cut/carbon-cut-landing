import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { SUPPORT_EMAIL } from "@/lib/contact";
import { getFormRoute, getHelpRoute } from "@/lib/routing/routes";
import { toKeywordArray } from "@/lib/seo";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { ArrowRight, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { CopyClipboard } from "@/components/ui/copyClipboard";
import {
  ContactFormProvider,
  ContactInventoryInput,
  ContactInventoryTextarea,
  ContactWebsiteHoneypot,
} from "./ContactFormProvider";
import { FeatherAtSign, FeatherSend, FeatherTag, FeatherUser } from "@subframe/core";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const contactSeo = await getScopedI18n("seo.pages.contact");

  return {
    title: contactSeo("title"),
    description: contactSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) => contactSeo(`keywords.${i}` as Parameters<typeof contactSeo>[0]))
    ),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("(pages).contact");
  const checklist = Array.from({ length: 4 }).map((_, i) =>
    t(`checklist.${i}` as Parameters<typeof t>[0])
  );

  return (
    <main id="content" className="bg-background px-4 pb-20 pt-32 md:px-8 md:pt-40">
      <section aria-labelledby="contact-heading" className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.8fr)] lg:gap-12">
          <aside className="space-y-8">
            <header className="space-y-2">
              <Typography asChild variant="captionBold" className="text-brand-700">
                <span>{t("eyebrow")}</span>
              </Typography>
              <Typography asChild variant="heading1">
                <h1 id="contact-heading">{t("title")}</h1>
              </Typography>

              <Typography asChild variant="bodySubframe" className="max-w-xl text-subtext-color">
                <p>{t("description")}</p>
              </Typography>
            </header>

            <section
              aria-labelledby="contact-direct-title"
              className="border-l-2 border-primary/40 pl-4"
            >
              <Typography asChild variant="subtitle" size="sm">
                <h2 id="contact-direct-title">{t("emailLabel")}</h2>
              </Typography>
              <div className="flex items-end gap-2">
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  aria-label={SUPPORT_EMAIL}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4"
                >
                  <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                  {SUPPORT_EMAIL}
                </a>
                <CopyClipboard value={SUPPORT_EMAIL} ariaLabel={SUPPORT_EMAIL} />
              </div>
              <Typography asChild variant="caption" size="sm" className="mt-2 block">
                <p>{t("responseTime")}</p>
              </Typography>
            </section>
          </aside>
          <section
            aria-labelledby="contact-form-title"
            className="rounded-2xl border border-border/35 bg-card p-6 md:p-7"
          >
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-brand-600" aria-hidden="true" />
                <Typography asChild variant="heading2">
                  <h2 id="contact-form-title">{t("form.title")}</h2>
                </Typography>
              </div>
              <Typography asChild variant="captionSubframe" className="mt-1 text-subtext-color">
                <p>{t("form.description")}</p>
              </Typography>
            </div>

            <ContactFormProvider>
              <ContactWebsiteHoneypot />
              <div className="grid gap-4 sm:grid-cols-2">
                <ContactInventoryInput
                  icon={<FeatherUser className="text-brand-600" />}
                  name="name"
                  label={t("form.name")}
                />
                <ContactInventoryInput
                  icon={<FeatherAtSign className="text-brand-600" />}
                  name="email"
                  label={t("form.email")}
                  type="email"
                />
              </div>

              <ContactInventoryInput
                icon={<FeatherTag className="text-brand-600" />}
                name="topic"
                label={t("form.topic")}
              />

              <ContactInventoryTextarea label={t("form.message")} />

              <div className="flex flex-wrap justify-end items-center gap-3 pt-1">
                <Button
                  type="submit"
                  icon={<FeatherSend />}
                  size="large"
                  variant="brand-primary"
                  className=""
                >
                  {t("form.submit")}
                </Button>
              </div>
            </ContactFormProvider>
          </section>
        </div>
      </section>
    </main>
  );
}
