import React from "react";
import type { Metadata } from "next";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import HeroSection from "./_home/sections/heroSection";
import ProductPreviewSection from "./_home/sections/productPreviewSection";
import TrustOptionsSection from "./_home/sections/trustOptionsSection";
import CtaSection from "./_home/sections/ctaSection";
import TestOfferSection from "./_home/sections/testOfferSection";
import FaqSection from "./_home/sections/faqSection";

const homeSeo = useScopedServerI18n("seo.pages.home");

export const metadata: Metadata = {
  title: homeSeo("title"),
  description: homeSeo("description"),
  keywords: toKeywordArray(homeSeo("keywords") as unknown),
};
export default function Home() {
  return (
    <main id="content">
      <HeroSection />
      <ProductPreviewSection />
      <TrustOptionsSection />
      <TestOfferSection />
      <CtaSection />
      <FaqSection />
    </main>
  );
}
