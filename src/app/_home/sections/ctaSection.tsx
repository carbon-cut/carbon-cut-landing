import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

export default function CtaSection() {
  const t = useScopedI18n("home.cta");

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="my-6 bg-[#F8F8EC] h-fit"
    >
      <div className="z-0  md:px-28 md:py-16 w-full xl:px-36 xl:py-24">
        <div className="grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 w-full md:h-fit h-screen">
          <div className="order-2 md:order-1 md:block grid grid-rows-4 gap-4">
            <Typography
              asChild
              variant={"title"}
              size={"xl"}
              className="md:text-left text-center timeline-view range-on-entry/20vh_60vh translate-y-8 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
            >
              <h2 id="cta-heading">{t("title")}</h2>
            </Typography>
            <Typography
              asChild
              variant="description"
              size="sm"
              className="text-center md:text-left my-3 timeline-view range-on-entry/20vh_60vh translate-y-8 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
            >
              <p>{t("description")}</p>
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center mt-4">
              <Button
                asChild
                size={"lg"}
                className="timeline-view range-on-entry/20vh_40vh bg-linear-2-2 translate-y-4 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
                style={{ animationDelay: "120ms" }}
                aria-label={t("primaryCta.aria")}
              >
                <Link href="/form">
                  {t("primaryCta.label")} <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="timeline-view range-on-entry/20vh_40vh translate-y-4 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
                style={{ animationDelay: "180ms" }}
                aria-label={t("secondaryCta.aria")}
              >
                <Link href="#pricing">{t("secondaryCta.label")}</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="h-full relative">
              <Image
                alt={t("imageAlt")}
                src={"home/image 5.png"}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute top-0 -z-10 md:scale-125 w-full md:mt-0 mt-24 object-contain timeline-view range-on-entry/45vh_70vh translate-y-10 scale-105 opacity-0 animate-parallax-float motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100 no-animations:scale-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
