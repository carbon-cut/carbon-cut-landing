import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Providers from "@/lib/partials/Providers";
import { manropeSans } from "@/lib/fonts";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
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
      <body
        className={`${manropeSans.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
