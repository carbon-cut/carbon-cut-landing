import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

export default function HeroSection() {
  const t = useScopedI18n("home.hero");

  const quickLinks = [
    { href: "#features", label: t("quickLinks.links.features") },
    { href: "#pricing", label: t("quickLinks.links.pricing") },
    { href: "#faq", label: t("quickLinks.links.faq") },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="pt-32 relative min-h-screen overflow-hidden bg-[#F8F8EC]"
    >
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
        alt={t("imageAlt")}
        src={"home/hero/bg1.png"}
        priority
        className="absolute md:-bottom-48 bottom-[45%]  
            left-0 mx-auto z-0 w-screen  origin-bottom-left scale-125 md:scale-100 md:blur-[2px] blur-[1px]"
      />
      <div className="bg-background h-full w-full absolute top-0 left-0 md:hidden  z-11 md:[clip-path:none] [clip-path:polygon(0_55%,100%_55%,100%_100%,0_100%)]" />
      <div className="absolute top-[50%] translate-y-[60%] md:translate-y-0 md:static flex flex-col w-full z-20 items-center px-4">
        <div className="my-3 md:my-6">
          <Typography
            asChild
            variant={"title"}
            size={"huge"}
            className="text-center"
          >
            <h1 id="hero-heading">
              <span className="text-center">{t("title.line1")}</span>{" "}
              <span className="text-chart-3">{t("title.highlight")}</span>{" "}
              <span className="block">{t("title.line2")}</span>
            </h1>
          </Typography>
        </div>
        <Typography
          asChild
          variant={"subtitle"}
          size={"md"}
          className="text-center my-3 md:my-12 "
        >
          <p>{t("description")}</p>
        </Typography>
        <div className="flex flex-col sm:flex-row gap-4 my-3 md:my-6">
          <Button
            asChild
            size="lg"
            className="py-6 rounded-full"
            aria-label={t("primaryCta.aria")}
          >
            <Link href="/form">
              {t("primaryCta.label")} <ArrowRight />
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="py-6 rounded-full"
            aria-label={t("secondaryCta.aria")}
          >
            <Link href="#features">{t("secondaryCta.label")}</Link>
          </Button>
        </div>
        <nav aria-label={t("quickLinks.ariaLabel")} className="mt-4">
          <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline decoration-dotted underline-offset-4 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
