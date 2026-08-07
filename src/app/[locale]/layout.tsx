import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Providers from "@/lib/partials/Providers";
import { manropeSans } from "@/lib/fonts";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import { Toaster } from "@/components/ui/sonner";
import { setStaticParamsLocale } from "next-international/server";
import ".././globals.css";

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const siteSeo = await getScopedI18n("seo.site");

  return {
    title: siteSeo("title"),
    description: siteSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) => siteSeo(`keywords.${i}` as Parameters<typeof siteSeo>[0]))
    ),
  };
}

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <meta
          name="google-site-verification"
          content="SoS9lEY4Q1vtAs6pZxz6wGH0BKOiFj2cU2hj71xMGHg"
        />
      </head>
      <body className={`${manropeSans.variable} antialiased`}>
        <Toaster />
        <Providers locale={locale}>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
