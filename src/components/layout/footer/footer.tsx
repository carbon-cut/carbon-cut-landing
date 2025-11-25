import React from "react";
import { Button } from "../../ui/button";
import { useScopedServerI18n } from "@/locales/server";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import FooterColumn, { FooterItem } from "./footerColumn";

function Footer() {
  const tNav = useScopedServerI18n("home.nav");
  const tFooter = useScopedServerI18n("home.footer");
  const quickLinks: FooterItem[] = [
    {
      title: tNav("features"),
      url: "/#features",
    },
    {
      title: tNav("testimonials"),
      url: "/#testimonials",
    },
    {
      title: tNav("pricing"),
      url: "/#pricing",
    },
    {
      title: tNav("faq"),
      url: "/#faq",
    },
  ];
  const supportLinks = [
    {
      title: tFooter("support.email"),
      url: "mailto:support@carboncut.app",
    },
    {
      title: tFooter("support.helpCenter"),
      url: "/#faq",
    },
    {
      title: tFooter("support.demo"),
      url: "/#pricing",
    },
  ];
  const socialLinks: FooterItem[] = [
    { title: tFooter("social.linkedin"), url: "https://www.linkedin.com", Icon: Linkedin, external: true },
    { title: tFooter("social.twitter"), url: "https://twitter.com", Icon: Twitter, external: true },
    { title: tFooter("social.facebook"), url: "https://www.facebook.com", Icon: Facebook, external: true },
    { title: tFooter("social.instagram"), url: "https://www.instagram.com", Icon: Instagram, external: true },
  ];
  const legalLinks: FooterItem[] = [
    { title: tFooter("legal.privacy"), url: "/legal/privacy" },
    { title: tFooter("legal.terms"), url: "/legal/terms" },
    { title: tFooter("legal.cookies"), url: "/legal/cookies" },
  ];
  return (
    <div className="bg-card-primary md:p-12 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
        <div className="flex flex-col lg:col-span-3 sm:col-span-2 self-start">
          <img
            className=" scroll-m-20  mb-6 scale-125 self-start"
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo/logoDark.svg`}
            alt={`${tFooter("brand.name")} logo`}
            width={141}
            height={48}
            
          />
          <p className="text-card-primary-foreground">
            {tFooter("brand.description")}
          </p>
        </div>
        <FooterColumn
          className="lg:col-span-2 sm:col-span-1"
          title={tFooter("headings.quickLinks")}
          items={quickLinks}
          ariaLabel="Quick links"
        />
        <FooterColumn
          className="lg:col-span-2 sm:col-span-1"
          title={tFooter("headings.support")}
          items={supportLinks}
          ariaLabel="Support links"
        />
        <div className="flex flex-col lg:col-span-2 sm:col-span-1 self-start gap-3 lg:gap-6">
          <FooterColumn
            title={tFooter("headings.social")}
            items={socialLinks}
            ariaLabel="Social media links"
          />
          <FooterColumn
            title={tFooter("headings.legal")}
            items={legalLinks}
            headingLevel="h2"
            ariaLabel="Legal links"
          />
        </div>
        <div className="flex flex-col lg:col-span-3 sm:col-span-2 self-start">
          <h1 className="text-primary-foreground scroll-m-20 text-xl font-sans tracking-tight lg:text-2xl md:mb-6 mb-3">
            {tFooter("headings.newsletter")}
          </h1>
          <p className="text-card-primary-foreground mb-6">
            {tFooter("newsletter.description")}
          </p>
          <div className="relative w-full md:w-11/12">
            <input
              type="email"
              placeholder={tFooter("newsletter.placeholder")}
              className="rounded-full px-4 py-2 w-full"
            />
            <Button
              className="primary absolute z-10 right-0 rounded-full py-5 px-4 text-primary-foreground font-normal"
            >
              {tFooter("newsletter.cta")}
            </Button>
          </div>
          <span className="text-card-primary-muted/70 text-sm mt-4 ml-1">
            {tFooter("newsletter.privacy")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
