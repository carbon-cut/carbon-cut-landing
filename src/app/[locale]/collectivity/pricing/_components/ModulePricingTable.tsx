"use client";

import { FeatherCheckCircle } from "@subframe/core";
import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import {
  formatSubscriptionCurrency,
  REQUIRED_MODULE_ID,
  subscriptionCatalogue,
  type ModuleId,
  type PricingConfiguration,
  type PricingResult,
} from "../_lib/pricing";

type ModulePricingTableProps = {
  configuration: PricingConfiguration;
  pricing: PricingResult;
  onChange: (moduleIds: ModuleId[]) => void;
};

export default function ModulePricingTable({
  configuration,
  pricing,
  onChange,
}: ModulePricingTableProps) {
  const t = useScopedI18n("collectivityPricing");
  const pricesPerCommune = new Map(
    pricing.modules.map((module) => [module.id, module.annualPriceEur / configuration.communes])
  );
  const available = subscriptionCatalogue.modules.filter(
    (module) => subscriptionCatalogue.availability[module.availability].purchasableInInitialFlow
  );
  const upcoming = subscriptionCatalogue.modules.filter(
    (module) => !subscriptionCatalogue.availability[module.availability].purchasableInInitialFlow
  );
  const moduleDescriptions: Partial<Record<ModuleId, string>> = {
    ghg_inventory_scope_1_2: t("modules.descriptions.ghg_inventory_scope_1_2"),
    ghg_inventory_scope_3: t("modules.descriptions.ghg_inventory_scope_3"),
    emission_factor_consolidation: t("modules.descriptions.emission_factor_consolidation"),
    prospective_and_objectives: t("modules.descriptions.prospective_and_objectives"),
    ghg_mitigation_investment_plan: t("modules.descriptions.ghg_mitigation_investment_plan"),
    mrv_monitoring: t("modules.descriptions.mrv_monitoring"),
    significant_indicators: t("modules.descriptions.significant_indicators"),
    scoring_system: t("modules.descriptions.scoring_system"),
    commune_aggregation: t("modules.descriptions.commune_aggregation"),
  };

  function toggleModule(moduleId: ModuleId, checked: boolean) {
    const moduleIds = checked
      ? Array.from(new Set([...configuration.moduleIds, moduleId]))
      : configuration.moduleIds.filter((id) => id !== moduleId);
    onChange(
      moduleIds.includes(REQUIRED_MODULE_ID) ? moduleIds : [REQUIRED_MODULE_ID, ...moduleIds]
    );
  }

  return (
    <Card className="w-full overflow-hidden border-solid border-neutral-border bg-default-background">
      <CardHeader>
        <CardTitle asChild>
          <h2 id="subscription-modules-heading">{t("modules.title")}</h2>
        </CardTitle>
        <CardDescription asChild>
          <p>{t("modules.description")}</p>
        </CardDescription>
      </CardHeader>
      <CardContent flush>
        <section aria-labelledby="subscription-modules-heading" className="w-full">
          <div className="flex w-full items-center gap-4 border-y border-solid border-neutral-border bg-neutral-50 px-6 py-2 mobile:hidden">
            <div className="flex w-5 flex-none items-start" />
            <Typography variant="captionBold" className="grow shrink-0 basis-0 text-subtext-color">
              {t("modules.service")}
            </Typography>
            <Typography variant="captionBold" className="w-48 flex-none text-subtext-color">
              {t("modules.status")}
            </Typography>
            <Typography
              variant="captionBold"
              className="w-28 flex-none text-right text-subtext-color"
            >
              {t("modules.annualPrice")}
            </Typography>
          </div>

          <div className="flex w-full items-center gap-2 px-6 pt-4 pb-2 mobile:px-4">
            <FeatherCheckCircle className="text-body text-brand-600" aria-hidden="true" />
            <span className="text-caption-bold text-brand-700">{t("modules.available")}</span>
          </div>
          {available.map((module, index) => (
            <ModuleRow
              key={module.id}
              divider={index === 0 ? "bottom" : undefined}
              density="available"
              checked={configuration.moduleIds.includes(module.id)}
              disabled={module.id === REQUIRED_MODULE_ID}
              label={t(`modules.items.${module.id}`)}
              description={moduleDescriptions[module.id]}
              status={t(`availability.${module.availability}`)}
              statusVariant={getAvailabilityBadgeVariant(module.availability)}
              price={pricesPerCommune.get(module.id)}
              perYear={t("summary.perYear")}
              onCheckedChange={(checked) => toggleModule(module.id, checked)}
            />
          ))}

          <div className="flex w-full flex-col items-start gap-0.5 border-t border-solid border-neutral-border bg-neutral-50 px-6 pt-4 pb-3 mobile:px-4">
            <div className="flex items-center gap-2">
              <Clock3 className="size-4 text-subtext-color" aria-hidden="true" />
              <Typography variant="captionBold" className="text-subtext-color">
                {t("modules.upcoming")}
              </Typography>
            </div>
            <Typography variant="captionSubframe" className="pl-6 text-neutral-400">
              {t("modules.upcomingDescription")}
            </Typography>
          </div>
          {upcoming.map((module) => (
            <ModuleRow
              key={module.id}
              divider="top"
              density="upcoming"
              isLast={module.id === upcoming.at(-1)?.id}
              checked={false}
              disabled
              muted
              label={t(`modules.items.${module.id}`)}
              description={moduleDescriptions[module.id]}
              status={t(`availability.${module.availability}`)}
              statusVariant={getAvailabilityBadgeVariant(module.availability)}
            />
          ))}
        </section>
      </CardContent>
    </Card>
  );
}

function ModuleRow({
  divider,
  density,
  isLast,
  checked,
  disabled,
  label,
  description,
  status,
  statusVariant,
  price,
  perYear,
  muted,
  onCheckedChange,
}: {
  divider?: "top" | "bottom";
  density: "available" | "upcoming";
  isLast?: boolean;
  checked: boolean;
  disabled: boolean;
  label: string;
  description?: string;
  status: string;
  statusVariant: "success" | "neutral" | "warning";
  price?: number;
  perYear?: string;
  muted?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <div
      className={`flex w-full items-center gap-4 px-6 mobile:flex-wrap mobile:px-4 ${
        density === "available" ? "py-4" : isLast ? "rounded-b-md pt-3 pb-4" : "py-3"
      } ${
        divider === "bottom"
          ? "border-b border-solid border-neutral-border"
          : divider === "top"
            ? "border-t border-solid border-neutral-100"
            : ""
      } ${muted ? "bg-neutral-50" : ""}`}
    >
      <Checkbox
        className="h-auto w-5 flex-none"
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onCheckedChange?.(value === true)}
      />
      <div className="flex min-w-[0px] grow shrink-0 basis-0 flex-col items-start gap-0.5">
        <Typography
          variant={muted ? "bodySubframe" : "bodyBold"}
          className={muted ? "text-neutral-400" : "text-default-font"}
        >
          {label}
        </Typography>
        {description ? (
          <Typography
            variant="captionSubframe"
            className={`line-clamp-1 ${muted ? "text-neutral-400" : "text-subtext-color"}`}
          >
            {description}
          </Typography>
        ) : null}
      </div>
      <div className="flex w-48 flex-none items-center mobile:w-auto mobile:pl-9 mobile:pr-0 mobile:py-0">
        <Badge variant={statusVariant}>{status}</Badge>
      </div>
      <Typography
        variant={muted ? "bodySubframe" : "bodyBold"}
        className={`w-28 flex-none text-right mobile:grow ${muted ? "text-neutral-400" : ""}`}
      >
        {price === undefined ? "—" : `${formatSubscriptionCurrency(price)} ${perYear}`}
      </Typography>
    </div>
  );
}

function getAvailabilityBadgeVariant(
  availability: (typeof subscriptionCatalogue.modules)[number]["availability"]
) {
  if (availability === "available_at_launch") return "success" as const;
  if (availability === "coming_very_soon") return "warning" as const;
  return "neutral" as const;
}
