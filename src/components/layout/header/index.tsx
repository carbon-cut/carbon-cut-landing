"use client";

import React, { useEffect } from "react";
import style from "./header.module.css";
import { Button } from "../../ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuHamburger from "./_menuHamburger";

type MenuItem = {
  title: string;
  url: string;
};


const menu: MenuItem[] = [
  {
    title: "Tarifs",
    url: "./#pricing",
  },
  {
    title: "FAQ",
    url: "./#faq",
  },
  {
    title: "Assistance",
    url: "./#support",
  },
];

function Header() {
  const [dataState, setDataState] = React.useState("big");
  const [show, setShow] = React.useState(false);

  const pathName = usePathname();

  /*   const headerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (headerDiv.current === null) return ;
      const headerBottom = headerDiv.current.offsetTop + headerDiv.current.offsetHeight;

    }, [headerDiv]);
 */
  useEffect(() => {
    const isHome = pathName === "/";
    if (!isHome) {
      setDataState("small");
    } else setDataState("big");
  }, [pathName]);

  return (
    <header
      /* ref={headerDiv} */ data-state={dataState}
      className={style.header}
    >
      <Link className="z-50" href={"/"} onClick={() => setShow(false)}>
        <img
          data-state={dataState}
          src={"/logo/logoLight.svg"}
          className={style.logo}
          alt="logo"
          width={141}
          height={48}
        />
      </Link>

      <div className={`${style.itemsContainer} ${show ? style.show : ''}`}>
        {menu.map((item) => (
          <div key={item.title} className="self-center  md:text-base md:font-normal text-4xl  ">
            <a onClick={() => setShow(false)} href={item.url}>{item.title}</a>
          </div>
        ))}

        <Button
          data-state={dataState}
          asChild
          className={style.button}
          size={"lg"}
        >
          <Link href={"/form"}>Commencer</Link>
        </Button>
      </div>
          <Button className="md:hidden z-10 hover:bg-transparent" variant={"ghost"} type="button" onClick={() => setShow(!show)}>
            <MenuHamburger isOpen={show} />
          {/* <Image
          data-state={dataState}
          src={"menu/charm_menu-hamburger.svg"}
          alt="menu"
          width={40}
          height={40}
          /> */}
{/*           <svg id="charm_menu-hamburger" width="40" height="40" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <style>
#hamburger-icon path{
    transition: linear 0.2s all;
}
#hamburger-icon:hover path:nth-child(1) {
transform-origin : 20% 35%;
transform: rotate(45deg) scale(1.2);
}
#hamburger-icon:hover path:nth-child(2) {
transform: translateX(50%) scaleX(0);
opacity: 0;
}
#hamburger-icon:hover path:nth-child(3) {
transform-origin: 25% 70%;
transform: rotate(-45deg) scale(1.2);
}
</style>
            <path d="M4.98438 7.70312H24.0156" stroke="yellow" stroke-width="2.71875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.98438  14.9531H24.0156M4.98438" stroke="red" stroke-width="2.71875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.98438 22.2031H24.0156M4.98438" stroke="black" stroke-width="2.71875" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> */}
      </Button>
    </header>
  );
}

export default Header;
