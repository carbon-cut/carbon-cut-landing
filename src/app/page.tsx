import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import FAQs from "./_home/_faqs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Features from "./_home/_features";
import Pricing from "./_home/_pricing";
import Testimonials from "./_home/_testimonials";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {
        // secrion 1
      }
      <section>
        <div className="flex flex-col w-full items-center ">
          <Badge variant="default">
            Essai gratuit de 7 jours - Sans carte de crédit requise
          </Badge>
          <div className="my-6">
            <span className="text-center text-4xl font-bold tracking-tight lg:text-5xl">
              <span className="text-center">votre empreinte</span>
              <span className="gradient-text"> carbone</span> <br />
              <div>
                <span className="inline-block">
                  en toute simplicité !
                  <Image
                    height={19}
                    width={137}
                    alt="vector"
                    className="ml-auto mr-14 scale-125"
                    src={"home/features/Vector 6.svg"}
                  />
                </span>
              </div>
            </span>
          </div>
          <h1 className="text-primary text-center text-sm font-normal tracking-tight lg:text-lg">
            Mesurez, réduisez, agissez
          </h1>
          <Button asChild size="lg" className="mt-6 -mb-2 rounded-full">
            <Link href={'/form'}>
          Commencer <ArrowRight />
          </Link></Button>
          <Image
            width="930"
            height="600"
            alt="dashboard"
            src={"home/Dashboard Screen.png"}
          />
        </div>
      </section>
      {
        // secrion 2 Features
      }
      <section id="features">
        <div className="flex flex-col w-full items-center ">
          <Badge variant="default">Fonctionnalités</Badge>
          <span className="text-center text-4xl font-bold tracking-tight lg:text-5xl my-6 text-primary">
            <h1>Calculez votre impact, réduisez votre</h1>
            empreinte,
            <span className="gradient-text"> préservez la planète !</span>
          </span>
          <p className="text-secondary text-center text-sm font-light tracking-tight lg:text-lg">
          Tableau de bord SaaS permettant aux utilisateurs de suivre  <br /> et de réduire leur empreinte carbone personnelle
          </p>
          <Features />
        </div>
      </section>
      {
        //section Testimonials
      }
      <section id="testimonials">
        <Testimonials />
      </section>
      {
        // section 3 Pricing
      }
      <section id="pricing">
        <div className="flex flex-col w-full items-center ">
          <Badge variant="default">Plans & Features</Badge>
          <h1 className="text-center text-4xl font-bold tracking-tight lg:text-5xl my-6 text-primary">
            Tarifs
          </h1>
          <Pricing />
        </div>
      </section>
      {
        // section 4 Hero
      }
      <section
        className="mt-6"
        style={{
          background: "linear-gradient(to bottom right, #C0C7CD, #D6DBDF)",
        }}
      >
        <div className=" px-28 py-16 w-full xl:px-36">
          <div className="grid grid-cols-2 w-full h-fit">
            <div className="">
            <h1 className="text-primary text-left text-4xl font-bold tracking-tight lg:text-6xl">
            Votre empreinte  <br /> carbone en toute simplicité !
          </h1>
              <Button asChild size={'lg'} className="rounded-full mt-16 py-4"><Link href="/form">
                Commencer <ArrowRight />
                </Link>
              </Button>
              
            </div>
            <div className="h-fit">
              <div className="relative h-fit">
                <img
                  width={559}
                  
                  alt="home image"
                  className="absolute  top-0  z-0 scale-125"
                  src={"home/image 5.png"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="faq">
        <div className="flex flex-col w-full items-center px-16">
          <Badge variant="default">Questions fréquemment posées</Badge>
          <h1 className="mt-4 text-center scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            FAQs
          </h1>
          <div className="min-w-full mx-24 my-12 px-12 pt-8 pb-12 rounded-xl bg-primary">
            <FAQs />
          </div>
        </div>
      </section>
    </>
  );
}
