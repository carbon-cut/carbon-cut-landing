import React from "react";
import type { Metadata } from "next";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import HeroSection from "./_home/sections/heroSection";
import ProductPreviewSection from "./_home/sections/productPreviewSection";
import FeaturesSection from "./_home/sections/featuresSection";
import TestimonialsSection from "./_home/sections/testimonialsSection";
import PricingSection from "./_home/sections/pricingSection";
import CtaSection from "./_home/sections/ctaSection";
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
      
      <ProductPreviewSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <FaqSection />
    </main>
  );
}
