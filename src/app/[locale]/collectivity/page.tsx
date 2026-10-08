import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GitCompareArrows } from "lucide-react";

import ScrollToTopButton from "@/components/layout/scrollToTopButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import {
  getCollectivityPricingRoute,
  getCollectivityStartRoute,
  getContactRoute,
} from "@/lib/routing/routes";
import { toKeywordArray } from "@/lib/seo";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { BrowserWindow } from "@/components/advanced/mock-browser-window";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const collectivityLandingSeo = await getScopedI18n("seo.pages.collectivityLanding");

  return {
    title: collectivityLandingSeo("title"),
    description: collectivityLandingSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) =>
          collectivityLandingSeo(`keywords.${i}` as Parameters<typeof collectivityLandingSeo>[0])
        )
    ),
  };
}

const heroSectionClass =
  "home-section section-hero relative flex overflow-hidden justify-start bg-surface-warm pt-72 md:pt-32";

const heroOverlayClass =
  "absolute top-0 left-0 z-10 h-[18rem] w-full [background:linear-gradient(180deg,rgba(217,255,249,0.14)_0%,rgba(248,248,236,0.32)_55%,rgba(248,248,236,0.98)_100%)] md:h-full md:[clip-path:none] md:[background:linear-gradient(0deg,rgba(10,41,36,79%)_-30%,rgba(217,255,249,0.34)_100%)]";

const heroBackgroundClass =
  "absolute bottom-auto top-0 left-0 z-0 h-[18rem] w-full object-cover object-center blur-[1px] md:-bottom-48 md:top-auto md:left-0 md:h-auto md:w-screen md:max-h-none md:object-contain md:origin-bottom-left md:scale-100 md:blur-[2px]";

const heroContentWrapperClass = "relative z-20 w-full max-w-3xl pt-8";

export default async function CollectivityIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("collectivityLanding");
  const validationRows = [
    {
      key: "stationaryEnergy",
      sector: t("validation.rows.stationaryEnergy.sector"),
      comparedAgainst: t("validation.referenceCalculation"),
    },
    {
      key: "transport",
      sector: t("validation.rows.transport.sector"),
      comparedAgainst: t("validation.referenceCalculation"),
    },
    {
      key: "afolu",
      sector: t("validation.rows.afolu.sector"),
      comparedAgainst: t("validation.municipalDatasets"),
    },
    {
      key: "wastewater",
      sector: t("validation.rows.wastewater.sector"),
      comparedAgainst: t("validation.municipalDatasets"),
    },
  ];

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
          <div className="flex w-full max-w-4xl flex-col items-start gap-7">
            <Typography asChild variant="marketingDisplay" className="text-left">
              <h1 id="collectivity-hero-heading">
                {t("hero.title.text", {
                  inventory: <span className="text-chart-3">{t("hero.title.highlight")}</span>,
                })}
              </h1>
            </Typography>
            <Typography asChild variant="bodyBold" size="lg" className="text-foreground">
              <p>{t("hero.description")}</p>
            </Typography>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                variant="cta"
                size="large"
                className="rounded-2xl"
                aria-label={t("hero.primaryCta.aria")}
                //iconRight={<ArrowRight className="!size-4" />}
              >
                <Link href={getCollectivityPricingRoute()}>{t("hero.primaryCta.label")}</Link>
              </Button>
              <Button
                asChild
                variant="neutral-tertiary"
                size="large"
                className="rounded-2xl"
                aria-label={t("hero.secondaryCta.aria")}
              >
                <Link href={getContactRoute()}>{t("hero.secondaryCta.label")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="home-section block bg-surface-warm">
        <BrowserWindow
          className="mx-auto mt-10 h-[28rem] overflow-hidden w-fit max-w-6xl md:h-[40rem]"
          url={`${process.env.NEXT_PUBLIC_APP_URL}/collectivity/projects/sfax/result`}
          size="lg"
          headerStyle="full"
        >
          <Image
            src={`home/screenshots/${locale}_collectivity_projects_sfax-end-to-end_result.png`}
            width={1050}
            height={595}
            alt={t("screenshot.alt")}
          />
        </BrowserWindow>
      </section>
      {/* <section>
        <CircuitBoard />
      </section> */}
      <section
        id="coverage"
        aria-labelledby="collectivity-afat-heading"
        className="flex w-full justify-center border-t border-border bg-background py-14 md:py-28"
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-10 md:gap-12 mobile:px-4">
          <div className="flex w-full items-end justify-between gap-8 mobile:flex-col mobile:items-start mobile:justify-start mobile:gap-4">
            <Typography asChild variant="marketingSectionTitle" className="max-w-[640px]">
              <h2 id="collectivity-afat-heading">{t("afatSection.title")}</h2>
            </Typography>
            <Typography asChild variant="marketingSectionDescription" className="max-w-[420px]">
              <p>{t("afatSection.description")}</p>
            </Typography>
          </div>
          <div className="flex w-full items-center justify-between gap-4 overflow-hidden">
            <div className="rounded-md border overflow-hidden -p-1 h-full border-border bg-card">
              <Image
                src={`home/screenshots/${locale}_MunAsset.png`}
                width={525}
                height={130}
                alt={t("afatSection.municipalAssetsImageAlt")}
                className=""
              />
            </div>
            <div className="rounded-md overflow-hidden -p-1 border h-full border-border bg-card ">
              <Image
                src={`home/screenshots/${locale}_AFAT.png`}
                width={525}
                height={130}
                alt={t("afatSection.imageAlt")}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="methodology"
        aria-labelledby="collectivity-references-heading"
        className="flex w-full flex-col items-center border-t border-border bg-neutral-50 px-10 py-20 mobile:px-4 mobile:py-12"
      >
        <div className="flex w-full max-w-[1200px] flex-col items-start gap-8 mobile:gap-6">
          <div className="flex w-full max-w-[640px] flex-col items-start gap-2">
            <Typography asChild variant="heading2" className="text-default-font">
              <h2 id="collectivity-references-heading">{t("references.title")}</h2>
            </Typography>
            <Typography asChild variant="bodySubframe" className="text-subtext-color">
              <p>{t("references.description")}</p>
            </Typography>
          </div>
          <div className="flex w-full flex-wrap items-center gap-y-3 border-t border-border pt-8">
            <Typography
              asChild
              variant="heading3"
              className="pr-6 text-lg leading-5 tracking-[0.02em] text-secondary"
            >
              <span>{t("references.ipcc")}</span>
            </Typography>
            <div className="h-6 w-px flex-none bg-neutral-300" />
            <Typography
              asChild
              variant="heading3"
              className="px-6 text-lg leading-5 tracking-[0.02em] text-secondary"
            >
              <span>{t("references.jrc")}</span>
            </Typography>
            <div className="h-6 w-px flex-none bg-neutral-300" />
            <Typography
              asChild
              variant="heading3"
              className="px-6 text-lg leading-5 tracking-[0.02em] text-secondary"
            >
              <span>{t("references.ghgProtocol")}</span>
            </Typography>
            <div className="h-6 w-px flex-none bg-neutral-300" />
            <Typography
              asChild
              variant="heading3"
              className="pl-6 text-lg leading-5 tracking-[0.02em] text-secondary"
            >
              <span>{t("references.ireBei")}</span>
            </Typography>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="collectivity-validation-heading"
        className="flex w-full flex-col items-center border-t border-borde px-10 py-28 mobile:px-4 mobile:py-14"
      >
        <div className="flex w-full max-w-[1200px] items-start gap-20 mobile:flex-col mobile:gap-10">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6">
            <Typography asChild variant="marketingSectionTitle">
              <h2 id="collectivity-validation-heading">{t("validation.title")}</h2>
            </Typography>
            <div className="flex w-full items-start border-l-2 border-neutral-300 pl-5">
              <Typography
                asChild
                variant="body"
                className="font-body text-[17px] leading-7 text-neutral-700"
              >
                <p>{t("validation.claim")}</p>
              </Typography>
            </div>
          </div>
          <div className="flex w-[520px] flex-none flex-col items-start gap-3 bg-card rounded-md border border-border px-6 py-6 mobile:w-full mobile:px-4">
            <div className="flex w-full items-center justify-between gap-3">
              <Typography asChild variant="bodyBold" className="text-default-font">
                <h3>{t("validation.cardTitle")}</h3>
              </Typography>
              <Typography asChild variant="captionSubframe" className="text-subtext-color">
                <span>{t("validation.caseStudy")}</span>
              </Typography>
            </div>
            <div className="w-full overflow-x-auto ">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">{t("validation.columns.sector")}</TableHead>
                    <TableHead scope="col">{t("validation.columns.comparedAgainst")}</TableHead>
                    <TableHead scope="col">{t("validation.columns.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validationRows.map((row) => (
                    <TableRow key={row.key}>
                      <TableCell>
                        <Typography
                          asChild
                          variant="bodyBold"
                          className="whitespace-nowrap text-default-font"
                        >
                          <span>{row.sector}</span>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          asChild
                          variant="bodySubframe"
                          className="whitespace-nowrap text-subtext-color"
                        >
                          <span>{row.comparedAgainst}</span>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Badge variant="neutral">
                          <GitCompareArrows aria-hidden="true" className="size-3.5" />
                          {t("validation.compared")}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Typography asChild variant="captionSubframe" className="text-subtext-color">
              <p>{t("validation.footnote")}</p>
            </Typography>
          </div>
        </div>
      </section>

      <section
        id="cta"
        aria-labelledby="collectivity-cta-heading"
        className="my-6 mb-0 w-full bg-surface-warm py-8"
      >
        <div className="relative z-0 mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="grid w-full gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div className="order-2 flex flex-col items-center gap-6 md:order-1 md:items-start">
              <Typography
                asChild
                variant="title"
                className="max-w-[720px] text-center font-heading-1 text-[40px] font-medium leading-[48px] tracking-[-0.01em] text-default-font md:text-left"
              >
                <h2 id="collectivity-cta-heading">{t("cta.title")}</h2>
              </Typography>
              <Typography
                asChild
                variant="description"
                size="md"
                className="max-w-xl text-center md:text-left"
              >
                <p>{t("cta.description")}</p>
              </Typography>
              <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row md:justify-start">
                <Button
                  asChild
                  variant="cta"
                  size="large"
                  className="rounded-2xl"
                  aria-label={t("hero.primaryCta.aria")}
                  //iconRight={<ArrowRight className="!size-4" />}
                >
                  <Link href={getCollectivityPricingRoute()}>{t("hero.primaryCta.label")}</Link>
                </Button>
                <Button
                  asChild
                  variant="neutral-tertiary"
                  size="large"
                  className="rounded-2xl"
                  aria-label={t("hero.secondaryCta.aria")}
                >
                  <Link href={getContactRoute()}>{t("hero.secondaryCta.label")}</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative min-h-[18rem] md:min-h-[24rem] px-8">
                <Image
                  alt={t("cta.imageAlt")}
                  src={"home/image 5.png"}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
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
