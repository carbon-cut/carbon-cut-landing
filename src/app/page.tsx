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
import Typography from "@/components/ui/typography";
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
              "linear-gradient(0deg, rgba(10,41,36,1) -44%, rgba(217,255,249,0.44) 120%)",
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
              <Typography variant={"title"} size={"huge"} className="text-center">
                <span className="text-center">votre empreinte</span>
                <span className="text-chart-3"> carbone</span> <br />
                <div>
                  <span className="inline-block">
                    en toute simplicité !
                  </span>
                </div>
              </Typography>
            </div>
            <Typography variant={'subtitle'} size={'md'} className="text-center my-12">
              Mesurez, réduisez, agissez
            </Typography>
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
          <Typography variant={"title"} size={"huge"} className="text-center my-6">
            <h1>Calculez votre impact, réduisez votre</h1>
            empreinte,
            <span className="text-chart-3"> préservez la planète !</span>
          </Typography>
          <Typography variant={"description"} size={"sm"} className="my-3 text-center  ">
            Tableau de bord SaaS permettant aux utilisateurs de suivre <br /> et
            de réduire leur empreinte carbone personnelle
          </Typography>
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
          <Typography variant={'title'} size={'xl'} className="my-6 text-center">
            Tarifs
          </Typography>
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
              <Typography variant={"title"} size={"xl"} className="text-left">
              <h1>Votre empreinte <br /> carbone en toute simplicité !</h1>
              </Typography>
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
          <Typography variant={'title'} size={'xl'}  className="mt-4 text-center scroll-m-20">
            FAQs
          </Typography>
          <div className="min-w-full mx-24 my-12 px-12 pt-8 pb-12 rounded-xl bg-card">
            <FAQs />
          </div>
        </div>
      </section>
    </>
  );
}
