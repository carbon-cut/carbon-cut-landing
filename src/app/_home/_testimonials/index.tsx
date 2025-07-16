import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 md:py-12 md:px-32 py-6 px-2">
      <div className="pr-24">
        <Badge className="mb-6" variant="default">
          Témoignages
        </Badge>
        <br className="" />
        <span className="text-center text-4xl font-bold tracking-tight lg:text-5xl text-primary">
          Ce que nos <span className="text-chart-3">clients</span> <br /> disent
          de nous
        </span>
        <br />
        <p className="text-secondary my-6">
          Tableau de bord SaaS permettant aux utilisateurs de suivre et de
          réduire leur empreinte carbone personnelle
        </p>
        <div className="grid grid-cols-2 w-1/4">
          <Button
            size={"icon"}
            variant={"ghost"}
            className=" hover:bg-transparent rounded-full bg-white border-chart-2 border "
          >
            <ArrowLeft className="stroke-chart-2" />
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="rounded-full bg-white border-chart-2 border "
          >
            <ArrowRight className="stroke-chart-2" />
          </Button>
        </div>
      </div>
      <div className="pr-16">
        <Image
          width={32}
          height={32}
          alt="testimonial"
          src={"home/features/bi_chat-quote-fill.svg"}
        />
        <p className="text-primary font-semibold text-xl my-4">
          J&lsquo;ai utilisé ce site pour calculer mon empreinte carbone et
          j&lsquo;ai été impressionné par la simplicité et la précision des
          résultats. Les recommandations pour réduire mon impact sont claires et
          utiles. Un outil indispensable pour tout le monde qui veut contribuer
          à la préservation de la planète. Je recommande vivement !
        </p>
        <div>
          <div className="flex flex-row justify-start mt-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={"home/testimonials/Avatar 1.png"} />
              <AvatarFallback className="bg-chart-3 text-primary-foreground">
                SJ
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h1 className="text-primary text-lg font-semibold">
                Sarah Johnson
              </h1>
              <p className="text-secondary">Marketing Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
