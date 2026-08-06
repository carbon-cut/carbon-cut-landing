import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileSearch, MapPinned } from "lucide-react";

import ScrollToTopButton from "@/components/layout/scrollToTopButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { toKeywordArray } from "@/lib/seo";
import { useScopedServerI18n } from "@/locales/server";

const collectivityLandingSeo = useScopedServerI18n("seo.pages.collectivityLanding");

export const metadata: Metadata = {
  title: collectivityLandingSeo("title"),
  description: collectivityLandingSeo("description"),
  keywords: toKeywordArray(collectivityLandingSeo("keywords") as unknown),
};

const heroSectionClass =
  "home-section section-hero relative overflow-hidden bg-surface-warm pt-24 pb-0 flex flex-row md:pt-32 md:pb-0";

const heroOverlayClass =
  "absolute top-0 left-0 z-10 h-[18rem] w-full [background:linear-gradient(180deg,rgba(217,255,249,0.14)_0%,rgba(248,248,236,0.32)_55%,rgba(248,248,236,0.98)_100%)] md:h-full md:[clip-path:none] md:[background:linear-gradient(0deg,rgba(10,41,36,79%)_-30%,rgba(217,255,249,0.34)_100%)]";

const heroBackgroundClass =
  "absolute bottom-auto top-0 left-0 z-0 h-[18rem] w-full object-cover object-center blur-[1px] md:-bottom-48 md:top-auto md:left-0 md:h-auto md:w-screen md:max-h-none md:object-contain md:origin-bottom-left md:scale-100 md:blur-[2px]";

const heroContentWrapperClass =
  "relative z-20 mt-[14.5rem] -translate-y-6 flex w-full flex-col items-center rounded-t-[2.25rem] bg-surface-warm px-4 pb-10 pt-7 shadow-[0_-18px_42px_rgba(248,248,236,0.92)] md:static md:mt-0 md:translate-y-0 md:rounded-none md:bg-transparent md:px-6 md:pb-0 md:pt-0 md:shadow-none";

const proofPoints = [
  {
    key: "territory",
    Icon: MapPinned,
    className:
      "border border-section-food-3/18 bg-section-food-3/14 text-section-food shadow-[0_8px_18px_rgba(255,111,51,0.12)]",
  },
  {
    key: "inventory",
    Icon: ClipboardCheck,
    className:
      "border border-[hsl(var(--chart-1))]/18 bg-[hsl(var(--chart-1))]/14 text-[hsl(var(--chart-1))] shadow-[0_8px_18px_rgba(168,183,106,0.16)]",
  },
  {
    key: "review",
    Icon: FileSearch,
    className:
      "border border-chart-2/18 bg-chart-2/16 text-chart-2 shadow-[0_8px_18px_rgba(0,186,190,0.1)]",
  },
] as const;

const collectivityStartHref = "/collectivity/start";

export default function CollectivityIndexPage() {
  const t = useScopedServerI18n("collectivityLanding");

  return (
    <main id="content">
      <section id="hero" aria-labelledby="collectivity-hero-heading" className={heroSectionClass}>
        <div className={heroOverlayClass} />
        <Image
          width={903}
          height={632}
          alt={t("hero.imageAlt")}
          src={"home/hero/bg1.png"}
          priority
          className={heroBackgroundClass}
        />
        <div className={heroContentWrapperClass}>
          <Badge variant="default" className="mb-2">
            {t("hero.badge")}
          </Badge>
          <div className="my-3 max-w-5xl md:my-6">
            <Typography asChild variant="title" size="huge" className="text-center">
              <h1 id="collectivity-hero-heading">
                <span>{t("hero.title.line1")}</span>{" "}
                <span className="text-chart-3">{t("hero.title.highlight")}</span>{" "}
                <span className="block">{t("hero.title.line2")}</span>
              </h1>
            </Typography>
          </div>
          <Typography
            asChild
            variant="subtitle"
            size="md"
            className="my-4 max-w-3xl text-center md:my-12"
          >
            <p>{t("hero.description")}</p>
          </Typography>
          <div className="my-4 flex w-full max-w-lg flex-col justify-center gap-4 sm:w-auto sm:flex-row md:my-6">
            <Button
              asChild
              variant="cta"
              size="lg"
              className="justify-center py-6"
              aria-label={t("hero.primaryCta.aria")}
            >
              <Link href={collectivityStartHref}>
                {t("hero.primaryCta.label")} <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="cta"
              size="lg"
              className="justify-center bg-linear-accent-diagonal py-6"
              aria-label={t("hero.secondaryCta.aria")}
            >
              <Link href="#proof">{t("hero.secondaryCta.label")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="proof"
        aria-labelledby="collectivity-proof-heading"
        className="home-section bg-background py-14 md:py-16"
      >
        <div className="content-width flex flex-col items-center">
          <Badge variant="default">{t("proof.badge")}</Badge>
          <Typography asChild variant="title" size="md" className="mt-4 max-w-3xl text-center">
            <h2 id="collectivity-proof-heading">{t("proof.title")}</h2>
          </Typography>
          <Typography
            asChild
            variant="description"
            size="md"
            className="mt-3 max-w-3xl text-center"
          >
            <p>{t("proof.description")}</p>
          </Typography>

          <div className="mt-10 grid w-full gap-4 md:grid-cols-3 md:gap-5">
            {proofPoints.map(({ key, Icon, className }) => (
              <article
                key={key}
                className="rounded-[1.4rem] border border-border/7 bg-card/65 p-5 shadow-[0_10px_22px_rgba(9,35,31,0.025)]"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${className}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <Typography asChild variant="title" size="sm" className="mt-4 text-left">
                  <h3>{t(`proof.points.${key}.title`)}</h3>
                </Typography>
                <Typography asChild variant="description" size="md" className="mt-3 text-left">
                  <p>{t(`proof.points.${key}.description`)}</p>
                </Typography>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cta"
        aria-labelledby="collectivity-cta-heading"
        className="home-section my-6 mb-0 bg-surface-warm"
      >
        <div className="z-0 w-full md:px-20 md:py-8 xl:px-32 xl:py-0">
          <div className="grid w-full grid-rows-2 gap-8 md:h-fit md:grid-cols-2 md:grid-rows-1 md:items-center">
            <div className="order-2 grid gap-4 md:order-1 md:block">
              <Typography asChild variant="title" size="xl" className="text-center md:text-left">
                <h2 id="collectivity-cta-heading">{t("cta.title")}</h2>
              </Typography>
              <Typography
                asChild
                variant="description"
                size="md"
                className="my-3 text-center md:max-w-xl md:text-left"
              >
                <p>{t("cta.description")}</p>
              </Typography>
              <div className="mt-4 flex justify-center md:justify-start">
                <Button
                  asChild
                  variant="cta"
                  size="lg"
                  className="bg-linear-accent-diagonal"
                  aria-label={t("cta.primaryCta.aria")}
                >
                  <Link href={collectivityStartHref}>
                    {t("cta.primaryCta.label")} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-full min-h-[18rem] md:min-h-[24rem]">
                <Image
                  alt={t("cta.imageAlt")}
                  src={"home/image 5.png"}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute top-0 -z-10 mt-8 w-full object-contain md:mt-0 md:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTopButton />
    </main>
  );
}
