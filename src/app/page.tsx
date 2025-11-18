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
import type { Metadata } from "next";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = useScopedServerI18n("seo.pages.home");
  return {
    title: t("title"),
    description: t("description"),
    keywords: toKeywordArray(t("keywords") as unknown),
  };
}
export default function Home() {
  const quickLinks = [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#faq", label: "Questions fréquentes" },
  ];

  return (
    <main id="content">
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
          alt="Illustration du tableau de bord Carbon Cut"
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
                <span className="text-center">Votre empreinte</span>{" "}
                <span className="text-chart-3">carbone</span>{" "}
                <span className="block">en toute simplicité !</span>
              </h1>
            </Typography>
          </div>
          <Typography
            asChild
            variant={"subtitle"}
            size={"md"}
            className="text-center my-3 md:my-12 "
          >
            <p>
              Mesurez, réduisez et agissez grâce à un parcours guidé et des
              recommandations personnalisées.
            </p>
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 my-3 md:my-6">
            <Button
              asChild
              size="lg"
              className="py-6 rounded-full"
              aria-label="Commencer le questionnaire empreinte carbone"
            >
              <Link href="/form">
                Commencer <ArrowRight />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="py-6 rounded-full"
              aria-label="Découvrir les fonctionnalités clés"
            >
              <Link href="#features">Découvrir les fonctionnalités</Link>
            </Button>
          </div>
          <nav aria-label="Navigation rapide" className="mt-4">
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
      <section
        aria-label="Aperçu du produit"
        className="flex justify-center py-16 px-4 bg-background"
      >
        <Image
          width={930}
          height={600}
          alt="Capture d'écran du tableau de bord Carbon Cut"
          src={"home/Dashboard Screen.png"}
          className="mx-auto rounded-3xl shadow-xl"
        />
      </section>
      <section
        id="features"
        aria-labelledby="features-heading"
        className="py-12 px-4"
      >
        <div className="flex flex-col w-full items-center ">
          <Badge variant="default">Fonctionnalités</Badge>
          <Typography
            asChild
            variant={"title"}
            size={"huge"}
            className="text-center md:my-6 my-3"
          >
            <h2 id="features-heading">
              Calculez votre impact, réduisez votre{" "}
              <br className="md:hidden" /> empreinte et{" "}
              <span className="text-chart-3">préservez la planète</span>
            </h2>
          </Typography>
          <Typography
            asChild
            variant={"description"}
            size={"sm"}
            className="my-3 text-center px-6 md:px-16"
          >
            <p>
              Un tableau de bord SaaS intuitif pour collecter vos données,
              visualiser vos émissions par poste et accélérer votre transition
              bas carbone.
            </p>
          </Typography>
          <Features />
        </div>
      </section>
      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="py-12"
      >
        <Typography
          asChild
          variant="title"
          size="xl"
          className="text-center mb-10"
        >
          <h2 id="testimonials-heading">Ils adoptent Carbon Cut</h2>
        </Typography>
        <Testimonials />
      </section>
      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="py-12"
      >
        <div className="flex flex-col w-full items-center ">
          <Badge variant="default">Plans &amp; fonctionnalités</Badge>
          <Typography
            asChild
            variant={"title"}
            size={"xl"}
            className="my-6 text-center"
          >
            <h2 id="pricing-heading">Tarifs transparents pour chaque étape</h2>
          </Typography>
          <Typography
            asChild
            variant="description"
            size="sm"
            className="text-center max-w-3xl mb-6 px-6"
          >
            <p>
              Choisissez le plan adapté à votre maturité carbone et débloquez
              des fonctionnalités avancées : export des rapports, recommandations
              ciblées et accompagnement expert.
            </p>
          </Typography>
          <Pricing />
        </div>
      </section>
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
                className="md:text-left text-center"
              >
                <h2 id="cta-heading">
                  Passez à l’action avec Carbon Cut dès aujourd’hui
                </h2>
              </Typography>
              <Typography
                asChild
                variant="description"
                size="sm"
                className="text-center md:text-left"
              >
                <p>
                  Lancez votre audit carbone, partagez des liens directs avec
                  vos équipes et centralisez les données clés pour piloter vos
                  efforts de réduction.
                </p>
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center mt-4">
                <Button
                  asChild
                  size={"lg"}
                  className="bg-linear-2-2"
                  aria-label="Remplir le formulaire de calcul"
                >
                  <Link href="/form">
                    Commencer <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  aria-label="Consulter les offres"
                >
                  <Link href="#pricing">Voir les offres</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="h-full relative">
                <Image
                  alt="Application Carbon Cut sur mobile et desktop"
                  src={"home/image 5.png"}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute top-0 -z-10 md:scale-125 w-full md:mt-0 mt-24 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="pb-16"
      >
        <div className="flex flex-col w-full items-center md:px-16 px-3">
          <Badge variant="default">Questions fréquentes</Badge>
          <Typography
            asChild
            variant={"title"}
            size={"xl"}
            className="mt-4 text-center scroll-m-20"
          >
            <h2 id="faq-heading">FAQ</h2>
          </Typography>
          <div className="min-w-full mx-24 my-12 md:px-12 px-6  pb-6 rounded-xl bg-card">
            <FAQs />
          </div>
        </div>
      </section>
    </main>
  );
}
