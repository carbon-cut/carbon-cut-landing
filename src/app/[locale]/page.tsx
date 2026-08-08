import React from "react";
import type { Metadata } from "next";
import { getScopedI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import { setStaticParamsLocale } from "next-international/server";
import HeroSection from "./_home/sections/heroSection";
import ProductPreviewSection from "./_home/sections/productPreviewSection";
import TrustOptionsSection from "./_home/sections/trustOptionsSection";
import CtaSection from "./_home/sections/ctaSection";
import TestOfferSection from "./_home/sections/testOfferSection";
import FaqSection from "./_home/sections/faqSection";
import ScrollToTopButton from "@/components/layout/scrollToTopButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const homeSeo = await getScopedI18n("seo.pages.home");

  return {
    title: homeSeo("title"),
    description: homeSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) => homeSeo(`keywords.${i}` as Parameters<typeof homeSeo>[0]))
    ),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <main id="content">
      <HeroSection />
      <ProductPreviewSection />
      <TrustOptionsSection />
      <TestOfferSection />
      <CtaSection />
      <FaqSection />
      <ScrollToTopButton />
    </main>
  );
}
