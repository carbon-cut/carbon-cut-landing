import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "@/lib/partials/Providers";
import { manropeSans } from "@/lib/fonts";
export const metadata: Metadata = {
  title: "Carbon Cut",
  description:
    "Tableau de bord SaaS permettant aux utilisateurs de suivre et de réduire leur empreinte carbone personnelle",
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
         {/*  <Header /> */}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
