import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import FAQs from "./_faqs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Features from "./_features";
import Pricing from "./_pricing";
import Testimonials from "./_testimonials";

export default function Home() {
  return (
    <>
    {
      // secrion 1
    }
      <section>
        <div className="flex flex-col w-full items-center ">
          <Badge variant="default">
            7 Day Free Trial - No Credit card required
          </Badge>
          <div className="my-6">
            <span className="text-center text-4xl font-bold tracking-tight lg:text-5xl">
              <h1 className="text-center">Unlock the</h1>
              <span className="text-chart-3">Power </span>
              of<span> Data <Image height={19} width={137} alt="vector" className="ml-auto" src={'home/features/Vector 6.svg'} /></span>
            </span>
          </div>
          <h1 className="text-primary text-center text-sm font-light tracking-tight lg:text-lg">
          Turn Data into Actionable Insights <br /> with Our SaaS Dashboard
          </h1>
          <Button size="lg" className="my-6 rounded-full">Get Started <ArrowRight /></Button>
          <Image width="715" height="510" alt="dashboard" src={'SaaS Dashboard.svg'}/>
        </div>
      </section>
      {
      // secrion 2
    }
      <section id="features">
      <div className="flex flex-col w-full items-center ">
        <Badge variant="default">Features</Badge>
        <span className="text-center text-4xl font-bold tracking-tight lg:text-5xl my-6">
          <h1>Real-Time Insights,</h1>
          <h1 className="text-chart-2">Real-Time Results</h1>
        </span>
        <p className="text-card-foreground text-center text-sm font-light tracking-tight lg:text-lg">
        Saas dashboard that enable users to perform various <br /> tasks and activities related to their business
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
        <h1 className="text-center text-4xl font-bold tracking-tight lg:text-5xl my-6">Pricing</h1>
        <Pricing />
      </div>
      </section>
      {
        // section 4 Hero
      }
      <section className="mt-6" style={{backgroundColor: '#E7E7E7'}}>
        <div className=" px-28 py-16 w-full xl:px-36">
        <h1 className="text-left text-4xl font-bold tracking-tight lg:text-5xl">Unlock Your Business <br /> Potential Today!</h1>
<div className="grid grid-cols-2 w-full">

  <div className="">
  <p className="text-muted-foreground my-6">Small businesses and startups looking to <br /> gain data insights</p>
  <Button className="rounded-full">Get Started <ArrowRight /></Button>
  </div>
  <div className="h-full">
    <div className="relative h-full">
    <img width={250} alt="total orders" className="absolute right-0 bottom-0 z-0" src={'home/hero/Total orders.svg'}/>
    <img width={250} alt="Visitors" className="absolute right-0 left-0 bottom-0 mx-auto z-10" src={'home/hero/Visitors.svg'}/>
    <img width={250} alt="Total sales" className="absolute left-0 bottom-0 z-0" src={'home/hero/Total Sales.svg'}/>
    </div>
  </div>
</div>
</div>
      </section>
      <section id="faq">
        <div className="flex flex-col w-full items-center ">
          <Badge variant="default">Frequently asked questions</Badge>
          <h1 className="mt-4 text-center scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            FAQs
          </h1>
          <div className="min-w-full mx-24 mt-6 px-12 py-8 rounded-xl bg-card-primary">
            <FAQs />
          </div>
        </div>
      </section>
    </>
  );
}
