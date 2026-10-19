"use client";

import React from "react";
import { Button } from "../../ui/button";
import { useScopedI18n } from "@/locales/client";
import FooterColumn, { FooterItem } from "./footerColumn";
import Typography from "@/components/ui/typography";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import {
  getAuthSignInRoute,
  getCollectivityLandingRoute,
  getCollectivityPricingRoute,
  getCollectivitySubscriptionRoute,
  getContactRoute,
} from "@/lib/routing/routes";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function Footer() {
  const tFooter = useScopedI18n("home.footer");
  const tCollectivityNav = useScopedI18n("collectivityLanding.nav");
  const tCollectivityFooter = useScopedI18n("collectivityLanding.footerLinks");
  const tCollectivityPrimaryCta = useScopedI18n("collectivityLanding.hero.primaryCta");
  const tAuth = useScopedI18n("(auth).common");
  const pathname = usePathname();
  const quickLinks: FooterItem[] = [
    {
      title: tCollectivityNav("product"),
      url: `${getCollectivityLandingRoute()}#product`,
    },
    {
      title: tCollectivityNav("methodology"),
      url: `${getCollectivityLandingRoute()}#methodology`,
    },
    {
      title: tCollectivityPrimaryCta("label"),
      url: getCollectivityPricingRoute(),
    },
    {
      title: tCollectivityNav("contact"),
      url: getContactRoute(),
    },
  ];
  const AccountLinks = [
    {
      title: tAuth("cta.signIn"),
      url: getAuthSignInRoute(),
    },
    {
      title: tCollectivityFooter("projects"),
      url: "/collectivity/projects",
    },
    {
      title: tCollectivityFooter("subscription"),
      url: getCollectivitySubscriptionRoute(),
    },
  ];
  if (pathname.startsWith("/auth")) {
    return null;
  }

  if (pathname.startsWith("/collectivity/")) {
    return null;
  }

  return (
    <footer id="site-footer" className="z-[60] bg-card-primary px-4 py-10 sm:px-6 md:px-6 md:py-12">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mx-auto grid w-full  grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
          <div className="col-span-2 flex flex-col self-start lg:col-span-1">
            <div className="mb-5 self-start">
              <Logo bg="dark" size={50} variant="full" className="dark:hidden" />
              <Logo bg="light" size={50} variant="full" className="hidden dark:block" />
            </div>
            <Typography asChild variant="bodySubframe" className="text-card-primary-foreground">
              <p>{tFooter("brand.description")}</p>
            </Typography>
          </div>
          <div className={"col-span-2 flex flex-row justify-center gap-6 lg:col-span-2"}>
            <FooterColumn
              className="col-span-1"
              title={tCollectivityFooter("explore")}
              items={quickLinks}
              ariaLabel={tCollectivityFooter("explore")}
            />
            <FooterColumn
              className="col-span-1"
              title={tCollectivityFooter("account")}
              items={AccountLinks}
              ariaLabel={tCollectivityFooter("account")}
            />
          </div>
          <div className="col-span-2 flex flex-col self-start lg:col-span-1">
            {/* <Typography
            asChild
            variant="heading3"
            className="mb-3 text-card-primary-foreground"
          >
            <h2>{tFooter("headings.newsletter")}</h2>
          </Typography>
          <Typography asChild variant="bodySubframe" className="mb-6 text-card-primary-foreground/80">
            <p>{tFooter("newsletter.description")}</p>
          </Typography>
          <div className="relative w-full md:w-11/12">
            <Input
              type="email"
              placeholder={tFooter("newsletter.placeholder")}
              className="h-10 w-full rounded-full border border-card-primary-foreground/15 bg-card px-5 pr-24 text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-card-primary-muted/70 focus:border-primary-border focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0"
            />
            <Button
              variant="footer"
              className="absolute rounded-full right-1 top-1 z-10 h-8 text-primary-foreground"
            >
              <span className="relative z-10">{tFooter("newsletter.cta")}</span>
            </Button>
          </div>
          <Typography
            asChild
            variant="bodySubframe"
            className="mt-4 ml-1 text-sm text-card-primary-muted/70"
          >
            <span>{tFooter("newsletter.privacy")}</span>
          </Typography> */}
          </div>
        </div>

        <Separator className="mt-6 mb-2 bg-card-primary-muted/60" />
        <div>
          <Typography variant="bodySubframe" className="text-card-primary-muted/70">
            {tFooter("copyright")}
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
