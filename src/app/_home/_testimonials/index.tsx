"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScopedI18n } from "@/locales/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  detail: string;
  name: string;
  role: string;
  initials: string;
  avatar?: string;
};

const testimonialKeys: Testimonial[] = [
  {
    quote: "cards.0.quote",
    detail: "cards.0.detail",
    name: "cards.0.name",
    role: "cards.0.role",
    initials: "SJ",
    avatar: "home/testimonials/Avatar 1.png",
  },
  {
    quote: "cards.1.quote",
    detail: "cards.1.detail",
    name: "cards.1.name",
    role: "cards.1.role",
    initials: "HM",
    avatar: "home/testimonials/Avatar 2.png",
  },
  {
    quote: "cards.2.quote",
    detail: "cards.2.detail",
    name: "cards.2.name",
    role: "cards.2.role",
    initials: "CD",
    avatar: "home/testimonials/Avatar 3.png",
  },
];

function Testimonials() {
  const t = useScopedI18n("home.testimonials");
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const items = useMemo(
    () =>
      testimonialKeys.map((item) => ({
        quote: t(item.quote),
        detail: t(item.detail),
        name: t(item.name),
        role: t(item.role),
        initials: item.initials,
        avatar: item.avatar,
      })),
    [t]
  );
  const currentIndex = index % items.length;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState(0);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const handlePrev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % items.length);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container || !track.firstElementChild) return;
      const prefersDesktop = window.matchMedia("(min-width: 768px)").matches;
      const gapValue = parseFloat(
        getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0"
      );
      if (prefersDesktop) {
        const first = track.firstElementChild as HTMLElement;
        const rect = first.getBoundingClientRect();
        setItemWidth(rect.width + (Number.isFinite(gapValue) ? gapValue : 0));
      } else {
        setItemWidth(container.clientWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:py-12 md:px-32 py-6 px-2 gap-8 w-full max-w-full">
      <div className=" md:pr-24 timeline-view range-on-entry/20vh_50vh opacity-0 animate-tilt-in-left motion-reduce:animate-none no-animations:translate-y-0 no-animations:translate-x-0 no-animations:rotate-0 no-animations:opacity-100">
        <div className="h-[50px]" />
        <span className="text-center text-4xl font-bold tracking-tight lg:text-5xl text-primary">
          {t("title")}
        </span>
        <br />
        <p className="text-secondary my-6">{t("description")}</p>
        <div className="grid grid-cols-2 w-1/4">
          <Button
            size={"icon"}
            variant={"ghost"}
            className=" hover:bg-transparent rounded-full bg-white border-chart-2 border "
            onClick={handlePrev}
            aria-label={t("controls.prev")}
          >
            <ArrowLeft className="stroke-chart-2" aria-hidden />
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="rounded-full bg-white border-chart-2 border "
            onClick={handleNext}
            aria-label={t("controls.next")}
          >
            <ArrowRight className="stroke-chart-2" aria-hidden />
          </Button>
        </div>
      </div>
      <div
        className=" timeline-view range-on-entry/20vh_50vh animate-tilt-in-right translate-y-8 opacity-0  motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100 no-animations:blur-0"
        style={{ animationDelay: "140ms" }}
      >
        <div className="overflow-x-hidden w-full" ref={containerRef}>
          <div
            ref={trackRef}
            className=" flex gap-0 md:gap-6 transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
          >
            {items.map((item) => (
              <article
                key={item.quote}
                className="flex-none basis-full w-full min-w-0 rounded-3xl bg-card p-6 border border-border/60 flex flex-col"
              >
                <Image
                  width={32}
                  height={32}
                  alt="Quote icon"
                  src={`${basePath}/home/features/bi_chat-quote-fill.svg`}
                />
                <p className="text-primary font-semibold text-xl my-4 leading-relaxed">
                  {item.quote}
                </p>
                <p className="text-secondary text-base mb-6 leading-relaxed">{item.detail}</p>
                <div className="mt-auto flex flex-row justify-start">
                  <Avatar className="h-12 w-12">
                    {item.avatar ? <AvatarImage src={`${basePath}/${item.avatar}`} /> : null}
                    <AvatarFallback className="bg-chart-3 text-primary-foreground">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h1 className="text-primary text-lg font-semibold">{item.name}</h1>
                    <p className="text-secondary">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
