import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Providers from "@/lib/partials/Providers";
import { manropeSans } from "@/lib/fonts";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import ScrollToTopButton from "@/components/layout/scrollToTopButton";
import { Toaster } from '@/components/ui/sonner';
import "./globals.css";

const siteSeo = useScopedServerI18n("seo.site");

export const metadata: Metadata = {
  title: siteSeo("title"),
  description: siteSeo("description"),
  keywords: toKeywordArray(siteSeo("keywords") as unknown),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="SoS9lEY4Q1vtAs6pZxz6wGH0BKOiFj2cU2hj71xMGHg"
        />
      </head>
      <body className={`${manropeSans.variable} antialiased`}>
        <Toaster/>
        <Providers>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          {children}
          <Footer />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
