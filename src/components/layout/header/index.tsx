"use client";

import React, { useEffect, useRef } from "react";
import style from './header.module.css'
import { Button } from "../../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = {
  title: string;
  url: string;
};

const bigHeaderUrls = ['']

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
    }
];

function Header() {

  const [dataState, setDataState] = React.useState('big');

  const pathName = usePathname();

/*   const headerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (headerDiv.current === null) return ;
      const headerBottom = headerDiv.current.offsetTop + headerDiv.current.offsetHeight;

    }, [headerDiv]);
 */
  useEffect(()=>{
    const isHome = pathName === '/';
    if (!isHome){
      setDataState('small')
    }else setDataState('big')
  }, [pathName])

  return (
    <header /* ref={headerDiv} */ data-state={dataState} className={style.header}>
        <Link href={'/'}>
          <Image data-state={dataState} src={'logo/logoLight.svg'} className={style.logo} alt="logo" width={141} height={48} />
      </Link>

<div  className="flex flex-row gap-12 flex-nowrap">
      {menu.map((item) => (
        <div key={item.title} className="self-center">
            <a href={item.url}>{item.title}</a>
        </div>
      ))}
      
      <Button data-state={dataState} asChild className={ style.button} size={'lg'}><Link href={'/form'}>Commencer</Link></Button>
      </div>
    </header>
  );
}

export default Header;
