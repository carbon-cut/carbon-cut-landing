"use client";

import { FlaskConical, Target, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

const introAnimation =
  "timeline-view range-on-entry/20vh_45vh translate-y-6 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100";

const optionIcons = [FlaskConical, Target, Compass] as const;
const iconClasses = [
  "border border-section-food-3/18 bg-section-food-3/14 text-section-food shadow-[0_8px_18px_rgba(255,111,51,0.12)]",
  "border border-[hsl(var(--chart-1))]/18 bg-[hsl(var(--chart-1))]/14 text-[hsl(var(--chart-1))] shadow-[0_8px_18px_rgba(168,183,106,0.16)]",
  "border border-chart-2/18 bg-chart-2/16 text-chart-2 shadow-[0_8px_18px_rgba(0,186,190,0.1)]",
] as const;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, highlights: Array<{ term: string; className: string }>) => {
  if (!highlights.length) return text;
  const map = new Map(highlights.map((item) => [item.term.toLowerCase(), item.className]));
  const pattern = highlights.map((item) => escapeRegExp(item.term)).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));
  return parts.map((part, index) => {
    const className = map.get(part.toLowerCase());
    return className ? (
      <span key={`${part}-${index}`} className={className}>
        {part}
      </span>
    ) : (
      part
    );
  });
};

export default function TrustOptionsSection() {
  const t = useScopedI18n("home.trust");

  const points = [
    {
      title: t("points.testing.title"),
      description: t("points.testing.description"),
    },
    {
      title: t("points.scope.title"),
      description: t("points.scope.description"),
    },
    {
      title: t("points.firstStep.title"),
      description: t("points.firstStep.description"),
    },
  ];

  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="bg-background px-4 py-14 md:px-8 md:py-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <Badge variant="default" className={introAnimation}>
          {t("badge")}
        </Badge>
        <Typography
          asChild
          variant="title"
          size="md"
          className={cn("mt-4 max-w-3xl text-center", introAnimation)}
        >
          <h2 id="trust-heading">{t("title")}</h2>
        </Typography>
        <Typography
          asChild
          variant="description"
          size="md"
          className={cn("mt-3 max-w-3xl text-center", introAnimation)}
        >
          <p>{t("description")}</p>
        </Typography>

        <div className="mt-10 grid w-full gap-4 md:grid-cols-3 md:gap-5">
          {points.map((point, index) => {
            const Icon = optionIcons[index];
            return (
              <div
                key={point.title}
                className="rounded-[1.4rem] border border-border/7 bg-card/62 p-5 shadow-[0_10px_22px_rgba(9,35,31,0.025)]"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    iconClasses[index]
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <Typography asChild variant="title" size="sm" className="mt-4 text-left">
                  <h3>{point.title}</h3>
                </Typography>
                <Typography asChild variant="description" size="md" className="mt-3 text-left ">
                  <p>
                    {highlightText(point.description, [
                      { term: "test", className: "text-section-food font-bold" },
                      { term: "transport", className: "text-section-transport font-bold" },
                      { term: "énergie", className: "text-section-energy font-bold" },
                      {
                        term: "empreinte personnelle",
                        className: "text-section-waste font-bold",
                      },
                    ])}
                  </p>
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
