import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
type MenuItem = {
  title: string;
  url: string;
};
const menu: MenuItem[] = [
    {
        title: "Tarifs",
        url: "/#pricing",
    },
    {
        title: "FAQ",
        url: "/#faq",
    },
    {
        title: "Assistance",
        url: "/#support",
    }
];

function Header() {
  return (
    <header className="bg-white items-center grid grid-cols-12 py-8 px-20 sticky top-0 z-50 shadow-md">
      <div className=""></div>
        <Link href={'/'}>
      <Image src={'logo/logoLight.svg'} className="scale-125" alt="logo" width={141} height={48} />
      </Link>
      <div className="col-span-5"></div>
      {menu.map((item) => (
        <div key={item.title} className="">
            <a href={item.url}>{item.title}</a>
        </div>
      ))}
      <Button asChild className="rounded-full py-6" size={'lg'}><Link href={'/form'}>Commencer</Link></Button>
    </header>
  );
}

export default Header;
