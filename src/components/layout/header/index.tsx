"use client";

import React, { useEffect } from "react";
import style from "./header.module.css";
import { Button } from "../../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuHamburger from "./_menuHamburger";
import NavItem from "./_NavItem";
import { useAuth } from "@/lib/auth/auth-context";
import { useScopedI18n } from "@/locales/client";
import {
  getCollectivityLandingRoute,
  getCollectivityPricingRoute,
  getAuthSignInRoute,
} from "@/lib/routing/routes";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

type MenuItem = {
  title: string;
  url: string;
};

function Header() {
  const tNav = useScopedI18n("home.nav");
  const tCollectivityNav = useScopedI18n("collectivityLanding.nav");
  const tCollectivityPrimaryCta = useScopedI18n("collectivityLanding.hero.primaryCta");
  const tAuth = useScopedI18n("(auth).common");
  const [dataState, setDataState] = React.useState("big");
  const [show, setShow] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  const pathName = usePathname();
  const router = useRouter();
  const { status, signOut } = useAuth();
  const isCollectivityLanding = pathName === "/collectivity";
  const isLandingHeader = pathName === "/" || isCollectivityLanding;
  const menu: MenuItem[] = isCollectivityLanding
    ? [
        {
          title: tCollectivityNav("prototype"),
          url: `${getCollectivityLandingRoute()}#proof`,
        },
        {
          title: tCollectivityNav("setup"),
          url: `${getCollectivityLandingRoute()}#cta`,
        },
      ]
    : [
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

  useEffect(() => {
    if (!isLandingHeader && isDesktop) {
      setDataState("small");
    } else if (!isLandingHeader && !isDesktop) {
      setDataState("bigSticky");
    } else setDataState("big");
  }, [isLandingHeader, isDesktop]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const updateMatch = () => setIsDesktop(media.matches);
    updateMatch();
    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, []);

  const navHidden = !show && !isDesktop;

  async function handleSignOut() {
    const signedOut = await signOut();

    if (!signedOut) {
      return;
    }

    setShow(false);
    router.push("/");
  }

  if (pathName.startsWith("/auth")) {
    return null;
  }

  if (pathName.startsWith("/collectivity/")) {
    return null;
  }

  return (
    <header data-state={dataState} className={style.header}>
      <div className={style.headerInner}>
        <div className={style.logoRegion}>
          <Link className="z-50 shrink-0" href="/" onClick={() => setShow(false)}>
            <Logo bg="light" size={dataState === "small" ? 40 : 42} variant="full" />
          </Link>
        </div>

        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          aria-hidden={navHidden}
          className={`${style.itemsContainer} ${show ? style.show : ""}`}
        >
          <div className={style.navLinks}>
            {menu.map((item) => (
              <NavItem
                key={item.title}
                href={item.url}
                tabIndex={navHidden ? -1 : 0}
                onClick={() => setShow(false)}
              >
                {item.title}
              </NavItem>
            ))}
          </div>
        </nav>
        <div className={style.navActions}>
          {status === "authenticated" ? (
            <Button
              data-state={dataState}
              className={style.button}
              size="large"
              tabIndex={navHidden ? -1 : 0}
              onClick={handleSignOut}
            >
              {tAuth("cta.logout")}
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="brand-tertiary"
                size="medium"
                tabIndex={navHidden ? -1 : 0}
                onClick={() => setShow(false)}
                className="rounded-full"
              >
                <Link href={getAuthSignInRoute()}>{tAuth("cta.signIn")}</Link>
              </Button>
              <Button
                asChild
                data-state={dataState}
                variant="cta"
                className={cn(style.button, "rounded-full hidden md:flex")}
                size="large"
                tabIndex={navHidden ? -1 : 0}
                aria-label={tCollectivityPrimaryCta("aria")}
                onClick={() => setShow(false)}
              >
                <Link href={getCollectivityPricingRoute()}>{tCollectivityPrimaryCta("label")}</Link>
              </Button>
            </>
          )}
        </div>
        {/* <Button
          className="z-50 flex flex-col items-center justify-center hover:bg-transparent xl:hidden"
          variant="ghost"
          type="button"
          aria-label={tNav("toggleLabel")}
          aria-expanded={show}
          aria-controls="primary-navigation"
          onClick={() => setShow(!show)}
        >
          <MenuHamburger isOpen={show} />
        </Button> */}
      </div>
    </header>
  );
}

export default Header;
