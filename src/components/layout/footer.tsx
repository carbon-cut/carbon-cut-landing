import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type QuickLink = {
  title: string;
  url: string;
};

const quickLinks: QuickLink[] = [
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
  },
];

function Footer() {
  return (
    <div className="bg-card-primary py-12 px-12 grid grid-cols-12 gap-12">
      <div></div>
      <div className="flex flex-col col-span-3 self-start">
        <Image
          className=" scroll-m-20  mb-6 scale-125 self-start"
          src={"logo/logoDark.svg"}
          alt="logo"
          width={141}
          height={48}
          
        />
        <p className="text-card-primary-foreground">
          Saas dashboard that enable users to perform various tasks and
          activities related to their business
        </p>
      </div>
      <div></div>
      <div className="flex flex-col col-span-3 self-start">
        <h1 className="text-primary-foreground scroll-m-20 text-xl font-sans tracking-tight lg:text-2xl mb-6">
          QuickLinks
        </h1>
        {quickLinks.map((item) => (
          <a
            key={item.title}
            className="text-card-primary-muted/80 text-xl mb-2"
            href={item.url}
          >
            {item.title}
          </a>
        ))}
      </div>
      <div className="flex flex-col col-span-3 self-start">
        <h1 className="text-primary-foreground scroll-m-20 text-xl font-sans tracking-tight lg:text-2xl mb-6">
          Newsletter
        </h1>
        <p className="text-card-primary-foreground mb-6 mr-20">
        Entrez votre email pour recevoir des réductions et des offres exclusives.
        </p>
        <div className="relative w-11/12">
          <input
            type="email"
            placeholder="Email"
            className="rounded-full px-4 py-2 w-full"
          />
          <Button
            className="primary absolute z-10 right-0 rounded-full py-5 px-4 text-primary-foreground font-normal"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
