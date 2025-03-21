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
      <section className="pt-32 relative min-h-screen">
        <div
          className="h-full w-full absolute top-0 left-0  z-10"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,41,36,1) -44%, rgba(217,255,249,0.44) 120%);",
          }}
        />
        <Image
          width={903}
          height={496}
          alt="hero-background"
          src={"home/hero/bg1.png"}
          className="absolute bottom-0 right-0 left-0 mx-auto z-0 w-screen blur-[2px]"
        />
        {
          <div className="flex flex-col w-full items-center z-20 ">
            <div className="my-6">
              <span className="text-center text-6xl font-bold tracking-tight lg:text-7xl">
                <span className="text-center">votre empreinte</span>
                <span className="text-chart-3"> carbone</span> <br />
                <div>
                  <span className="inline-block">
                    en toute simplicité !
                  </span>
                </div>
              </span>
            </div>
            <h1 className="text-primary text-center text-sm font-normal tracking-tight lg:text-2xl my-12">
              Mesurez, réduisez, agissez
            </h1>
            <Button asChild size="lg" className="mt-6 py-6 rounded-full">
              <Link href={"/form"}>
                Commencer <ArrowRight />
              </Link>
            </Button>
          </div>
        }
      </section>
      <Image
        width="930"
        height="600"
        alt="dashboard"
        src={"home/Dashboard Screen.png"}
        className="mx-auto"
      />
      {
        // secrion 2 Features
      }
      <section id="features">
        <div className="flex flex-col w-full items-center ">
          <Badge variant="default">Fonctionnalités</Badge>
          <span className="text-center text-4xl font-bold tracking-tight lg:text-6xl my-6 text-primary">
            <h1>Calculez votre impact, réduisez votre</h1>
            empreinte,
            <span className="text-chart-3"> préservez la planète !</span>
          </span>
          <p className="my-3 text-secondary text-center text-sm font-light tracking-tight lg:text-lg">
            Tableau de bord SaaS permettant aux utilisateurs de suivre <br /> et
            de réduire leur empreinte carbone personnelle
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
        className="mt-6 bg-[#F8F8EC] h-fit"
      >
        <div className="z-0 px-28 py-16 w-full xl:px-36 xl:py-24">
          <div className="grid grid-cols-2 w-full h-fit">
            <div className="">
              <h1 className="text-primary text-left text-4xl font-bold tracking-tight lg:text-6xl">
                Votre empreinte <br /> carbone en toute simplicité !
              </h1>
              <Button asChild size={"lg"} className="mt-16 bg-linear-2-2">
                <Link href="/form">
                  Commencer <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="h-fit">
              <div className="relative h-fit">
                <img
                  alt="home image"
                  className="absolute  top-0  -z-10 scale-125"
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
          <div className="min-w-full mx-24 my-12 px-12 pt-8 pb-12 rounded-xl bg-card">
            <FAQs />
          </div>
        </div>
      </section>
    </>
  );
}
