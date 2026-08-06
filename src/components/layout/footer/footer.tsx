"use client";

import React from "react";
import { Button } from "../../ui/button";
import { useScopedI18n } from "@/locales/client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import FooterColumn, { FooterItem } from "./footerColumn";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { usePathname } from "next/navigation";

function Footer() {
  const tNav = useScopedI18n("home.nav");
  const tFooter = useScopedI18n("home.footer");
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const quickLinks: FooterItem[] = [
    {
      title: tNav("features"),
      url: "/#features",
    },
    {
      title: tNav("trust"),
      url: "/#trust",
    },
    {
      title: tNav("results"),
      url: "/#cta",
    },
  ];
  const contactLinks = [
    {
      title: tFooter("contact.email"),
      url: "/contact",
    },
    {
      title: tFooter("contact.helpCenter"),
      url: "/help",
    },
    {
      title: tFooter("contact.demo"),
      url: "/form",
    },
  ];
  const socialLinks: FooterItem[] = [
    {
      title: tFooter("social.linkedin"),
      url: "https://www.linkedin.com",
      Icon: Linkedin,
      external: true,
    },
    { title: tFooter("social.twitter"), url: "https://twitter.com", Icon: Twitter, external: true },
    {
      title: tFooter("social.facebook"),
      url: "https://www.facebook.com",
      Icon: Facebook,
      external: true,
    },
    {
      title: tFooter("social.instagram"),
      url: "https://www.instagram.com",
      Icon: Instagram,
      external: true,
    },
  ];
  const legalLinks: FooterItem[] = [
    { title: tFooter("legal.privacy"), url: "/legal/privacy" },
    { title: tFooter("legal.terms"), url: "/legal/terms" },
    { title: tFooter("legal.cookies"), url: "/legal/cookies" },
  ];
  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <footer id="site-footer" className="bg-card-primary md:p-12 p-6 z-[60]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
        <div className="flex flex-col lg:col-span-3 sm:col-span-2 self-start">
          <Image
            className="mb-6 self-start scale-125"
            src={`${basePath}/logo/logoDark.svg`}
            alt={`${tFooter("brand.name")} logo`}
            width={141}
            height={48}
          />
          <Typography asChild variant="description" className="text-card-primary-foreground">
            <p>{tFooter("brand.description")}</p>
          </Typography>
        </div>
        <FooterColumn
          className="lg:col-span-2 sm:col-span-1"
          title={tFooter("headings.quickLinks")}
          items={quickLinks}
          ariaLabel="Quick links"
        />
        <FooterColumn
          className="lg:col-span-2 sm:col-span-1"
          title={tFooter("headings.contact")}
          items={contactLinks}
          ariaLabel="Contact links"
        />
        <div className="flex flex-col lg:col-span-2 sm:col-span-1 self-start gap-3 lg:gap-6">
          {/* <FooterColumn
            title={tFooter("headings.social")}
            items={socialLinks}
            ariaLabel="Social media links"
          />
          <FooterColumn
            title={tFooter("headings.legal")}
            items={legalLinks}
            headingLevel="h2"
            ariaLabel="Legal links"
          /> */}
        </div>
        <div className="flex flex-col lg:col-span-3 sm:col-span-2 self-start">
          <Typography
            asChild
            variant="default"
            size="md"
            className="mb-3 text-card-primary-foreground font-semibold tracking-tight"
          >
            <h2>{tFooter("headings.newsletter")}</h2>
          </Typography>
          <Typography asChild variant="description" className="mb-6 text-card-primary-foreground">
            <p>{tFooter("newsletter.description")}</p>
          </Typography>
          <div className="relative w-full md:w-11/12">
            <input
              type="email"
              placeholder={tFooter("newsletter.placeholder")}
              className="h-12 w-full rounded-full border border-card-primary-foreground/15 bg-card px-5 pr-36 text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-card-primary-muted/70 focus:border-primary-border focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
            />
            <Button
              variant="footer"
              className="absolute right-1 top-1 z-10 h-10 px-5 text-primary-foreground"
            >
              <span className="relative z-10">{tFooter("newsletter.cta")}</span>
            </Button>
          </div>
          <Typography
            asChild
            variant="description"
            className="mt-4 ml-1 text-sm text-card-primary-muted/70"
          >
            <span>{tFooter("newsletter.privacy")}</span>
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
