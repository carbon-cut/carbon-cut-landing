import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

const heroSectionClass =
  "home-section section-hero relative overflow-hidden bg-surface-warm pt-24 pb-0 flex flex-row md:pt-32 md:pb-0";

const heroOverlayClass =
  "absolute top-0 left-0 z-10 h-[18rem] w-full [background:linear-gradient(180deg,rgba(217,255,249,0.14)_0%,rgba(248,248,236,0.32)_55%,rgba(248,248,236,0.98)_100%)] md:h-full md:[clip-path:none] md:[background:linear-gradient(0deg,rgba(10,41,36,79%)_-30%,rgba(217,255,249,0.34)_100%)]";

const heroBackgroundClass =
  "absolute bottom-auto top-0 left-0 z-0 h-[18rem] w-full object-cover object-center blur-[1px] md:-bottom-48 md:top-auto md:left-0 md:h-auto md:w-screen md:max-h-none md:object-contain md:origin-bottom-left md:scale-100 md:blur-[2px]";

const heroContentWrapperClass =
  "relative z-20 mt-[14.5rem] -translate-y-6 flex w-full flex-col items-center rounded-t-[2.25rem] bg-surface-warm px-4 pb-10 pt-7 shadow-[0_-18px_42px_rgba(248,248,236,0.92)] md:static md:mt-0 md:translate-y-0 md:rounded-none md:bg-transparent md:px-6 md:pb-0 md:pt-0 md:shadow-none";

const heroDescriptionClass = "text-center my-4 max-w-3xl md:my-12";

const heroButtonsClass =
  "my-4 flex w-full max-w-lg flex-col justify-center gap-4 sm:w-auto sm:flex-row md:my-6";

export default function HeroSection() {
  const t = useScopedI18n("home.hero");

  return (
    <section id="hero" aria-labelledby="hero-heading" className={heroSectionClass}>
      <div className={heroOverlayClass} />
      <Image
        width={903}
        height={632}
        alt={t("imageAlt")}
        src={"home/hero/bg1.png"}
        priority
        className={heroBackgroundClass}
      />
      <div className={heroContentWrapperClass}>
        <div className="my-3 md:my-6 max-w-5xl">
          <Typography asChild variant={"title"} size={"huge"} className="text-center">
            <h1 id="hero-heading">
              <span className="text-center">{t("title.line1")}</span>{" "}
              <span className="text-chart-3">{t("title.highlight")}</span>{" "}
              <span className="block">{t("title.line2")}</span>
            </h1>
          </Typography>
        </div>
        <Typography asChild variant={"subtitle"} size={"md"} className={heroDescriptionClass}>
          <p>{t("description")}</p>
        </Typography>
        <div className={heroButtonsClass}>
          <Button
            asChild
            variant="cta"
            size="lg"
            className="py-6 justify-center"
            aria-label={t("primaryCta.aria")}
          >
            <Link href="/form">
              {t("primaryCta.label")} <ArrowRight />
            </Link>
          </Button>
          <Button
            variant="cta"
            asChild
            size="lg"
            className="py-6 justify-center bg-linear-accent-diagonal"
            aria-label={t("secondaryCta.aria")}
          >
            <Link href="#features">{t("secondaryCta.label")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
