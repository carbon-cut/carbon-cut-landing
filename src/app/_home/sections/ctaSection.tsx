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
      className="home-section my-6 mb-0 bg-surface-warm"
    >
      <div className="z-0 w-full md:px-20 md:py-16 xl:px-32 xl:py-20">
        <div className="grid w-full grid-rows-2 gap-8 md:h-fit md:grid-cols-2 md:grid-rows-1 md:items-center">
          <div className="order-2 grid gap-4 md:order-1 md:block">
            <Typography
              asChild
              variant={"title"}
              size={"xl"}
              className="text-center timeline-view range-on-entry/20vh_60vh translate-y-8 opacity-0 animate-rise-in md:text-left motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
            >
              <h2 id="cta-heading">{t("title")}</h2>
            </Typography>
            <Typography
              asChild
              variant="description"
              size="md"
              className="my-3 text-center timeline-view range-on-entry/20vh_60vh translate-y-8 opacity-0 animate-rise-in md:max-w-xl md:text-left motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
            >
              <p>{t("description")}</p>
            </Typography>
            <div className="mt-4 flex justify-center md:justify-start">
              <div
                className="timeline-view range-on-entry/20vh_40vh translate-y-4 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
                style={{ animationDelay: "120ms" }}
              >
                <Button
                  asChild
                  variant="cta"
                  size={"lg"}
                  className="bg-linear-accent-diagonal"
                  aria-label={t("primaryCta.aria")}
                >
                  <Link href="/form">
                    {t("primaryCta.label")} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative h-full min-h-[18rem] md:min-h-[24rem]">
              <Image
                alt={t("imageAlt")}
                src={"home/image 5.png"}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute top-0 -z-10 mt-8 w-full object-contain opacity-0 timeline-view range-on-entry/45vh_70vh translate-y-10 scale-105 animate-parallax-float md:mt-0 md:scale-110 motion-reduce:animate-none no-animations:translate-y-0 no-animations:scale-100 no-animations:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
