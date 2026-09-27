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
  formatSubscriptionLabel,
  moduleMeetsConditions,
  type PricingConfiguration,
  type PricingResult,
  type SubscriptionCatalogue,
} from "../_lib/pricing";

type ModulePricingTableProps = {
  configuration: PricingConfiguration;
  catalogue: SubscriptionCatalogue;
  pricing: PricingResult;
  onChange: (moduleKeys: string[]) => void;
};

export default function ModulePricingTable({
  configuration,
  catalogue,
  pricing,
  onChange,
}: ModulePricingTableProps) {
  const t = useScopedI18n("collectivityPricing");
  const pricesPerCommune = new Map(
    pricing.modules.map((module) => [module.key, module.annualUnitAmountCents])
  );
  const available = catalogue.modules.filter(
    (module) =>
      module.status === "available" && moduleMeetsConditions(module, configuration.communes)
  );
  const unavailable = catalogue.modules.filter((module) => !available.includes(module));
  const moduleDescriptions: Record<string, string> = {
    ghg_inventory_scope_1_2: t("modules.descriptions.ghg_inventory_scope_1_2"),
    ghg_inventory_scope_3: t("modules.descriptions.ghg_inventory_scope_3"),
    emission_factor_consolidation: t("modules.descriptions.emission_factor_consolidation"),
    prospective_objectives: t("modules.descriptions.prospective_and_objectives"),
    ghg_mitigation_investment_plan: t("modules.descriptions.ghg_mitigation_investment_plan"),
    mrv_tracking: t("modules.descriptions.mrv_monitoring"),
    significant_indicators: t("modules.descriptions.significant_indicators"),
    scoring_100: t("modules.descriptions.scoring_system"),
    intermunicipal_aggregation: t("modules.descriptions.commune_aggregation"),
  };

  function toggleModule(moduleKey: string, checked: boolean) {
    onChange(
      checked
        ? Array.from(new Set([...configuration.moduleKeys, moduleKey]))
        : configuration.moduleKeys.filter((key) => key !== moduleKey)
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
              key={module.key}
              divider={index === 0 ? "bottom" : undefined}
              density="available"
              checked={configuration.moduleKeys.includes(module.key)}
              disabled={false}
              label={getModuleLabel(t, module.key)}
              description={moduleDescriptions[module.key]}
              status={t("availability.available_at_launch")}
              statusVariant="success"
              price={pricesPerCommune.get(module.key)}
              perYear={t("summary.perYear")}
              onCheckedChange={(checked) => toggleModule(module.key, checked)}
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
          {unavailable.map((module) => (
            <ModuleRow
              key={module.key}
              divider="top"
              density="upcoming"
              isLast={module.key === unavailable.at(-1)?.key}
              checked={false}
              disabled
              muted
              label={getModuleLabel(t, module.key)}
              description={moduleDescriptions[module.key]}
              status={getModuleStatus(t, module, configuration.communes)}
              statusVariant={getModuleStatusVariant(module, configuration.communes)}
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

function getModuleLabel(t: ReturnType<typeof useScopedI18n>, key: string) {
  const translationKeys: Record<string, string> = {
    ghg_inventory_scope_1_2: "ghg_inventory_scope_1_2",
    ghg_inventory_scope_3: "ghg_inventory_scope_3",
    emission_factor_consolidation: "emission_factor_consolidation",
    prospective_objectives: "prospective_and_objectives",
    ghg_mitigation_investment_plan: "ghg_mitigation_investment_plan",
    mrv_tracking: "mrv_monitoring",
    significant_indicators: "significant_indicators",
    scoring_100: "scoring_system",
    intermunicipal_aggregation: "commune_aggregation",
  };
  const translationKey = translationKeys[key];
  return translationKey ? t(`modules.items.${translationKey}`) : formatSubscriptionLabel(key);
}

function getModuleStatus(
  t: ReturnType<typeof useScopedI18n>,
  module: SubscriptionCatalogue["modules"][number],
  communes: number
) {
  if (module.status === "available" && !moduleMeetsConditions(module, communes)) {
    return t("modules.upcoming");
  }
  if (module.status === "coming_soon") return t("availability.coming_very_soon");
  return formatSubscriptionLabel(module.status);
}

function getModuleStatusVariant(
  module: SubscriptionCatalogue["modules"][number],
  communes: number
): "success" | "neutral" | "warning" {
  if (module.status === "available" && moduleMeetsConditions(module, communes)) {
    return "success";
  }
  if (module.status === "coming_soon" || module.status === "available") {
    return "warning";
  }
  return "neutral";
}
