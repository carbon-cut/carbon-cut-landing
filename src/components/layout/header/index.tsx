"use client";

import React, { useEffect } from "react";
import style from "./header.module.css";
import { Button } from "../../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuHamburger from "./_menuHamburger";
import Image from "next/image";
import { useScopedI18n } from "@/locales/client";

type MenuItem = {
  title: string;
  url: string;
};

function Header() {
  const tNav = useScopedI18n("home.nav");
  const menu: MenuItem[] = [
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
  const [dataState, setDataState] = React.useState("big");
  const [show, setShow] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  const pathName = usePathname();

  useEffect(() => {
    const isHome = pathName === "/";
    if (!isHome && isDesktop) {
      setDataState("small");
    } else if (!isHome && !isDesktop) {
      setDataState("bigSticky");
    }else setDataState("big");
  }, [pathName, isDesktop]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateMatch = () => setIsDesktop(media.matches);
    updateMatch();
    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, []);

  const navHidden = !show && !isDesktop;

  return (
    <header
      /* ref={headerDiv} */ data-state={dataState}
      className={style.header}
    >
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
        className={`${style.itemsContainer} ${show ? style.show : ''}`}
      >
        {menu.map((item) => (
          <div
            key={item.title}
            className="self-center md:text-base md:font-normal text-4xl"
          >
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

        <Button
          data-state={dataState}
          asChild
          className={style.button}
          size={"lg"}
          tabIndex={navHidden ? -1 : 0}
        >
          <Link href={"/form"}>Commencer</Link>
        </Button>
      </nav>
          <Button
            className="md:hidden z-10 hover:bg-transparent flex flex-col items-center justify-center"
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
