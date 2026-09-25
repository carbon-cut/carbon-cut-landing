"use client";

import { Calendar, CalendarRange, Minus, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RadioCardGroup from "@/components/ui/radio-card-group";
import SegmentedControl from "@/components/ui/segmentedControl";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import type { ContractTerm, Perimeter, PricingConfiguration } from "../_lib/pricing";
import { MAX_COMMUNES } from "../_lib/pricing";

type SubscriptionControlsProps = {
  configuration: PricingConfiguration;
  onCommit: (next: Partial<PricingConfiguration>) => void;
};

const coverageTiers = [
  { key: "one", min: 1, max: 1 },
  { key: "twoToThree", min: 2, max: 3 },
  { key: "fourToFive", min: 4, max: 5 },
  { key: "sixToTen", min: 6, max: MAX_COMMUNES },
] as const;

export default function SubscriptionControls({
  configuration,
  onCommit,
}: SubscriptionControlsProps) {
  const t = useScopedI18n("collectivityPricing");

  return (
    <Card className="w-full border-solid border-neutral-border bg-default-background">
      <CardHeader className="pb-6 mobile:pt-4">
        <CardTitle asChild>
          <h2 id="subscription-settings-heading">{t("configuration.panelTitle")}</h2>
        </CardTitle>
        <CardDescription asChild>
          <p>{t("configuration.panelDescription")}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section
          aria-labelledby="subscription-settings-heading"
          className="flex w-full flex-col items-start gap-6"
        >
          <div className="flex w-full flex-col items-start gap-3">
            <div className="flex w-full items-center justify-between gap-4 mobile:flex-col mobile:items-start">
              <div className="flex flex-col items-start gap-1">
                <Typography asChild variant="bodyBold">
                  <label htmlFor="communes">{t("configuration.communes.label")}</label>
                </Typography>
                <Typography variant="captionSubframe">
                  {t("configuration.communes.description")}
                </Typography>
              </div>
              <div className="flex items-center gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-1 py-1">
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-sm text-subtext-color hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={t("configuration.communes.decrease")}
                  disabled={configuration.communes === 1}
                  onClick={() => onCommit({ communes: configuration.communes - 1 })}
                >
                  <Minus className="size-4" aria-hidden="true" />
                </button>
                <div id="communes" className="flex w-12 flex-none items-center justify-center">
                  <Typography variant="heading3">{configuration.communes}</Typography>
                </div>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-sm text-subtext-color hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={t("configuration.communes.increase")}
                  disabled={configuration.communes === MAX_COMMUNES}
                  onClick={() => onCommit({ communes: configuration.communes + 1 })}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2">
              {coverageTiers.map((tier) => {
                const selected =
                  configuration.communes >= tier.min && configuration.communes <= tier.max;
                return (
                  <div
                    key={tier.key}
                    className={
                      selected
                        ? "flex items-center rounded-full border border-solid border-brand-600 bg-brand-50 px-3 py-1"
                        : "flex items-center rounded-full border border-solid border-neutral-border bg-neutral-50 px-3 py-1"
                    }
                  >
                    <Typography
                      variant={selected ? "captionBold" : "captionSubframe"}
                      className={selected ? "text-brand-700" : undefined}
                    >
                      {t(`configuration.communes.tiers.${tier.key}`)}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-px w-full flex-none bg-neutral-border" />

          <div className="flex w-full items-center justify-between gap-4 mobile:flex-col mobile:items-start">
            <div className="flex flex-col items-start gap-1">
              <Typography asChild variant="bodyBold">
                <p>{t("configuration.term.label")}</p>
              </Typography>
              <Typography variant="captionSubframe">
                {t("configuration.term.description")}
              </Typography>
            </div>
            <SegmentedControl
              className="h-auto w-48 flex-none mobile:w-full"
              state={String(configuration.term) as "1" | "3"}
              setState={(term) => onCommit({ term: Number(term) as ContractTerm })}
              options={[
                {
                  value: "1",
                  label: t("configuration.term.oneYear"),
                  icon: <Calendar aria-hidden="true" />,
                },
                {
                  value: "3",
                  label: t("configuration.term.threeYears"),
                  icon: <CalendarRange aria-hidden="true" />,
                },
              ]}
            />
          </div>

          <div className="h-px w-full flex-none bg-neutral-border" />

          <fieldset className="flex w-full flex-col items-start gap-3">
            <div className="flex flex-col items-start gap-1">
              <Typography asChild variant="bodyBold">
                <legend>{t("configuration.perimeter.label")}</legend>
              </Typography>
              <Typography variant="captionSubframe">
                {t("configuration.perimeter.description")}
              </Typography>
            </div>
            <RadioCardGroup
              value={configuration.perimeter}
              onValueChange={(perimeter) => onCommit({ perimeter: perimeter as Perimeter })}
              options={(["municipal_assets", "whole_territory"] as const).map((perimeter) => ({
                value: perimeter,
                label: t(`configuration.perimeter.${perimeter}`),
                description: t(`configuration.perimeter.${perimeter}_description`),
              }))}
            />
          </fieldset>
        </section>
      </CardContent>
    </Card>
  );
}
