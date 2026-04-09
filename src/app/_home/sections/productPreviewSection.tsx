"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

const introAnimation =
  "timeline-view range-on-entry/20vh_45vh translate-y-6 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100";

const stepKeys = ["guided", "focus", "result"] as const;
const observerThresholds = [0.42, 0.42, 0.78];
const observerRootMargin = {
  topPercent: 40,
  bottomPercent: 24,
};
const observerRootMarginValue = `-${observerRootMargin.topPercent}% 0px -${observerRootMargin.bottomPercent}% 0px`;
const showObserverDebug = false;

export default function ProductPreviewSection() {
  const t = useScopedI18n("home.whatItDoes");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isDesktop, setIsDesktop] = useState(false);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => setIsDesktop(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setActiveIndex(0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          setActiveIndex((prev) => {
            if (prev === -1 || prev === 2) return -1;
            else return prev;
          });
          return;
        }

        const nextIndex = stepRefs.current.findIndex((element) => element === visible.target);

        if (nextIndex >= 0) setActiveIndex(nextIndex);
      },
      {
        threshold: observerThresholds,
        rootMargin: observerRootMarginValue,
      }
    );

    stepRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <section
      id="features"
      aria-labelledby="what-it-does-heading"
      className="bg-surface-warm px-4 py-14 md:px-8 md:py-20"
    >
      {showObserverDebug && isDesktop ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-4 z-[70] rounded-[1.75rem] border border-chart-3/45 bg-chart-3/5 block"
          style={{
            top: `${observerRootMargin.topPercent}%`,
            bottom: `${observerRootMargin.bottomPercent}%`,
          }}
        >
          <div className="absolute left-3 top-3 rounded-full bg-chart-3 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-sm">
            observer root
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <Badge variant="default" className={introAnimation}>
          {t("badge")}
        </Badge>
        <Typography
          asChild
          variant="title"
          size="xl"
          className={cn("mt-4 max-w-4xl text-center md:max-w-5xl", introAnimation)}
        >
          <h2 id="what-it-does-heading">{t("title")}</h2>
        </Typography>
        <Typography
          asChild
          variant="description"
          size="md"
          className={cn("mt-4 max-w-3xl text-center md:max-w-4xl", introAnimation)}
        >
          <p>{t("description")}</p>
        </Typography>

        <div className="mt-12 grid w-full max-w-6xl gap-8 md:mt-16 md:grid-cols-[minmax(0,0.98fr)_minmax(20rem,1.02fr)] md:items-start md:gap-10">
          <div className="md:sticky md:top-1/4  md:self-start">
            <div className="relative flex items-center justify-center rounded-[2rem] border border-border/6 bg-card/10 p-4 shadow-[0_14px_34px_rgba(9,35,31,0.03)] md:p-5">
              <Image
                width={1152}
                height={768}
                alt={t("imageAlt")}
                src={"home/Évaluation Carbone _ Réduisez votre empreinte.png"}
                priority={false}
                className="h-auto w-full max-w-[42rem] object-contain drop-shadow-[0_10px_22px_rgba(9,35,31,0.05)]"
              />
            </div>
          </div>

          <div className="pt-1 md:py-24">
            <div className="space-y-7 md:space-y-20">
              {stepKeys.map((key, index) => {
                const isActive = isDesktop ? index === activeIndex : true;

                return (
                  <article
                    key={key}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    className="relative scroll-mt-28 pl-9 md:h-[12rem] md:pl-12"
                  >
                    <div
                      className={cn(
                        "absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 md:h-9 md:w-9",
                        isActive
                          ? "border-chart-3 bg-card shadow-[0_10px_24px_rgba(255,111,51,0.16)]"
                          : "border-border/18 bg-surface-warm"
                      )}
                    >
                      <div
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors duration-300 md:h-2.5 md:w-2.5",
                          isActive ? "bg-chart-3" : "bg-muted/25"
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "absolute bottom-0 left-2.5 top-10 w-px transition-colors duration-300 md:left-[1.05rem] md:top-11 md:h-16",
                        index === stepKeys.length - 1 && "hidden md:block",
                        isActive ? "bg-chart-3/60" : "bg-muted/14"
                      )}
                    />

                    <div className="max-w-xl">
                      <div
                        className={cn(
                          "text-[0.68rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300",
                          isActive ? "text-chart-3/90" : "text-foreground/40"
                        )}
                      >
                        {t(`items.${key}.step`)}
                      </div>

                      <Typography
                        asChild
                        variant="title"
                        size="md"
                        className={cn(
                          "mt-2.5 text-left leading-[1.08] transition-all duration-300 md:max-w-[32rem]",
                          isActive ? "text-foreground" : "text-foreground/58"
                        )}
                      >
                        <h3>{t(`items.${key}.title`)}</h3>
                      </Typography>

                      <div
                        className={cn(
                          "grid overflow-hidden transition-all duration-400 ease-out",
                          isActive
                            ? "mt-3 grid-rows-[1fr] opacity-100"
                            : "mt-1.5 grid-rows-[0fr] opacity-78 md:mt-1.5 md:grid-rows-[0fr]"
                        )}
                      >
                        <div className="overflow-hidden">
                          <Typography
                            asChild
                            variant="description"
                            size="md"
                            className="max-w-[31rem] text-left"
                          >
                            <p>{t(`items.${key}.description`)}</p>
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
