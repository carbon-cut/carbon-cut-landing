import React from "react";
import { Button } from "../ui/button";
type MenuItem = {
  title: string;
  url: string;
};
const menu: MenuItem[] = [
    {
        title: "Pricing",
        url: "/#pricing",
    },
    {
        title: "Faq's",
        url: "/#faq",
    },
    {
        title: "Support",
        url: "/#support",
    }
];

function Header() {
  return (
    <div className="bg-white items-center grid grid-cols-12 py-8 px-20 sticky top-0 z-50 shadow-md">
      <div className=""></div>
      <h1 className="">Prosperico</h1>
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
