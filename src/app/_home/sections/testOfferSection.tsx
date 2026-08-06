"use client";

import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

const introAnimation = "";
//"timeline-view range-on-entry/20vh_45vh translate-y-6 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100";

export default function TestOfferSection() {
  const t = useScopedI18n("home.testOffer");
  const chips = t("chips") as string[];
  const safeChips = Array.isArray(chips) ? chips : [];
  const chipToneClasses = [
    "border-chart-3/35 bg-chart-3/10 text-chart-3",
    "border-chart-1/35 bg-chart-1/10 text-chart-1",
    "border-chart-2/35 bg-chart-2/10 text-chart-2",
    "border-border/30 bg-muted/10 text-foreground",
  ];

  return (
    <section aria-labelledby="test-offer-heading" className="home-section py-6 md:py-8">
      <div className="content-width">
        <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-8">
          <div className={cn("text-left", introAnimation)}>
            <Badge variant="default">{t("badge")}</Badge>
            <Typography asChild variant="title" size="sm" className="mt-3">
              <h2 id="test-offer-heading">{t("title")}</h2>
            </Typography>
            <Typography asChild variant="description" size="md" className="mt-2 max-w-xl">
              <p>{t("description")}</p>
            </Typography>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            {safeChips.map((chip, index) => (
              <span
                key={chip}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                  chipToneClasses[index % chipToneClasses.length]
                )}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <Typography
          asChild
          variant="default"
          size="md"
          className={cn("mt-3 text-left text-foreground/60", introAnimation)}
        >
          <p>{t("note")}</p>
        </Typography>
        <div className="mt-6 h-px w-full bg-muted/10" />
      </div>
    </section>
  );
}
