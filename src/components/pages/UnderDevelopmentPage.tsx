import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

type PageButton = {
  label: string;
  href: string;
};

type UnderDevelopmentPageProps = {
  title: ReactNode;
  description: ReactNode;
  primaryButton: PageButton;
  secondaryButton: PageButton;
};

export default function UnderDevelopmentPage({
  title,
  description,
  primaryButton,
  secondaryButton,
}: UnderDevelopmentPageProps) {
  return (
    <main id="content">
      <section
        aria-labelledby="under-development-heading"
        className="home-section section-hero relative flex min-h-screen overflow-hidden bg-surface-warm pt-24 pb-0 md:pt-32 md:pb-0"
      >
        <Image
          src="/shared/underDevHero.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover object-center opacity-60"
        />
        <div className="relative z-20 flex w-full flex-1 items-center justify-center px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-16">
          <div className="flex w-full max-w-5xl flex-col items-center text-center">
            <Typography asChild variant="title" size="huge" className="max-w-4xl text-center">
              <h1 id="under-development-heading">{title}</h1>
            </Typography>

            <Typography asChild variant="subtitle" size="md" className="mt-5 max-w-2xl text-center">
              <div>{description}</div>
            </Typography>

            <div className="mt-8 flex w-full max-w-lg flex-col justify-center gap-4 sm:w-auto sm:flex-row">
              <Button asChild variant="outline" size="lg" className="justify-center">
                <Link href={primaryButton.href}>
                  <ArrowLeft />
                  {primaryButton.label}
                </Link>
              </Button>
              <Button asChild variant="cta" size="lg" className="justify-center py-6">
                <Link href={secondaryButton.href}>
                  {secondaryButton.label}
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
