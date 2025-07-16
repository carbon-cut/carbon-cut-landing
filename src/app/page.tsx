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
      <section className="pt-32 relative min-h-screen overflow-hidden bg-[#F8F8EC]">
        <div
          className="h-full w-full absolute top-0 left-0  z-10 md:[clip-path:none] [clip-path:polygon(0_0,100%_0,100%_55%,0_55%)]"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,41,36,79%) -30%, rgba(217,255,249,0.34) 100%)",
          }}
        />
        <Image
          width={903}
          height={632}
          alt="hero-background"
          src={"home/hero/bg1.png"}
          className="absolute md:-bottom-48 bottom-[45%]  
            left-0 mx-auto z-0 w-screen  origin-bottom-left scale-125 md:scale-100 md:blur-[2px] blur-[1px]"
        />
        <div className="bg-background h-full w-full absolute top-0 left-0 md:hidden  z-11 md:[clip-path:none] [clip-path:polygon(0_55%,100%_55%,100%_100%,0_100%)]" />
        {
          <div className="absolute top-[50%] translate-y-[60%] md:translate-y-0 md:static flex flex-col w-full z-20 items-center">
            <div className="my-3 md:my-6">
              <Typography
                variant={"title"}
                size={"huge"}
                className="text-center"
              >
                <span className="text-center">votre empreinte</span>
                <span className="text-chart-3"> carbone</span> <br />
                <div>
                  <span className="inline-block">en toute simplicité !</span>
                </div>
              </Typography>
            </div>
            <Typography
              variant={"subtitle"}
              size={"md"}
              className="text-center my-3 md:my-12 "
            >
              Mesurez, réduisez, agissez
            </Typography>
            <Button
              asChild
              size="lg"
              className="my-3 md:my-6 py-6 rounded-full"
            >
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
          <Typography
            variant={"title"}
            size={"huge"}
            className="text-center md:my-6 my-3"
          >
            <h1>
              Calculez votre impact, réduisez votre <br className="md:hidden" />{" "}
              empreinte,
            </h1>
            <span className="text-chart-3"> préservez la planète !</span>
          </Typography>
          <Typography
            variant={"description"}
            size={"sm"}
            className="my-3 text-center  px-16"
          >
            Saas dashboard that enable users to perform various tasks and
            activities related to their business
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
          <Typography
            variant={"title"}
            size={"xl"}
            className="my-6 text-center"
          >
            Tarifs
          </Typography>
          <Pricing />
        </div>
      </section>
      {
        // section 4 Hero
      }
      <section className="my-6 bg-[#F8F8EC] h-fit">
        <div className="z-0  md:px-28 md:py-16 w-full xl:px-36 xl:py-24">
          <div className="grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 w-full md:h-fit h-screen">
            <div className="order-2 md:order-1 md:block grid grid-rows-4">
              <Typography variant={"title"} size={"xl"} className="md:text-left text-center">
                <h1>
                  Votre empreinte <br /> carbone en toute simplicité !
                </h1>
              </Typography>
              <Button asChild size={"lg"} className="mt-16 bg-linear-2-2 mx-auto">
                <Link href="/form">
                  Commencer <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="h-full relative">
                <img
                  alt="home image"
                  className="absolute top-0 -z-10 md:scale-125 w-full md:mt-0 mt-24"
                  src={"home/image 5.png"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="faq">
        <div className="flex flex-col w-full items-center md:px-16 px-3">
          <Badge variant="default">Questions fréquemment posées</Badge>
          <Typography
            variant={"title"}
            size={"xl"}
            className="mt-4 text-center scroll-m-20"
          >
            FAQs
          </Typography>
          <div className="min-w-full mx-24 my-12 md:px-12 px-6  pb-6 rounded-xl bg-card">
            <FAQs />
          </div>
        </div>
      </section>
    </>
  );
}
