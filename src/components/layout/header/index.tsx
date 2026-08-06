"use client";

import React, { useEffect } from "react";
import style from "./header.module.css";
import { Button } from "../../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuHamburger from "./_menuHamburger";
import Image from "next/image";
import { useAuth } from "@/lib/auth/auth-context";
import { useScopedI18n } from "@/locales/client";

type MenuItem = {
  title: string;
  url: string;
};

function Header() {
  const tNav = useScopedI18n("home.nav");
  const tPrimaryCta = useScopedI18n("home.hero.primaryCta");
  const tAuth = useScopedI18n("(auth).common");
  const menu: MenuItem[] = [
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
  const [dataState, setDataState] = React.useState("big");
  const [show, setShow] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  const pathName = usePathname();
  const router = useRouter();
  const { status, signOut } = useAuth();

  useEffect(() => {
    const isHome = pathName === "/";
    if (!isHome && isDesktop) {
      setDataState("small");
    } else if (!isHome && !isDesktop) {
      setDataState("bigSticky");
    } else setDataState("big");
  }, [pathName, isDesktop]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateMatch = () => setIsDesktop(media.matches);
    updateMatch();
    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, []);

  const navHidden = !show && !isDesktop;

  async function handleSignOut() {
    await signOut();
    setShow(false);
    router.push("/auth/sign-in");
  }

  if (pathName.startsWith("/auth")) {
    return null;
  }

  return (
    <header /* ref={headerDiv} */ data-state={dataState} className={style.header}>
      <Link className="z-50" href={"/"} onClick={() => setShow(false)}>
        <Image
          data-state={dataState}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo/logoLight.svg`}
          className={style.logo}
          alt="logo"
          width={141}
          height={48}
        />
      </Link>

      <nav
        id="primary-navigation"
        aria-label="Primary navigation"
        aria-hidden={navHidden}
        className={`${style.itemsContainer} ${show ? style.show : ""}`}
      >
        {menu.map((item) => (
          <div key={item.title} className="self-center md:text-base md:font-normal text-4xl">
            <Link
              onClick={() => setShow(false)}
              href={item.url}
              tabIndex={navHidden ? -1 : 0}
              className="px-2 py-1"
            >
              {item.title}
            </Link>
          </div>
        ))}
        {status === "authenticated" ? (
          <Button
            data-state={dataState}
            className={style.button}
            size={"lg"}
            tabIndex={navHidden ? -1 : 0}
            onClick={handleSignOut}
          >
            {tAuth("cta.logout")}
          </Button>
        ) : (
          <Button
            asChild
            data-state={dataState}
            variant="cta"
            className={style.button}
            size={"lg"}
            tabIndex={navHidden ? -1 : 0}
            aria-label={tPrimaryCta("aria")}
            onClick={() => setShow(false)}
          >
            <Link href={"/form"}>{tPrimaryCta("label")}</Link>
          </Button>
        )}
      </nav>
      <Button
        className="md:hidden z-10 flex flex-col items-center justify-center hover:bg-transparent"
        variant={"ghost"}
        type="button"
        aria-label={tNav("toggleLabel")}
        aria-expanded={show}
        aria-controls="primary-navigation"
        onClick={() => setShow(!show)}
      >
        <MenuHamburger isOpen={show} />
      </Button>
    </header>
  );
}

export default Header;
