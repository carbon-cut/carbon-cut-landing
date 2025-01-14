import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
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
    <div className="bg-white items-center grid grid-cols-12 py-8 px-20 sticky top-0 z-50 shadow-md">
      <div className=""></div>
      <Image src={'logo/logoLight.svg'} className="scale-125" alt="logo" width={141} height={48} />
      <div className="col-span-5"></div>
      {menu.map((item) => (
        <div key={item.title} className="">
            <a href={item.url}>{item.title}</a>
        </div>
      ))}
      <Button className="rounded-full py-6" size={'lg'}>Sign in</Button>
    </div>
  );
}

export default Header;
