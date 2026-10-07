import {
  FeatherCheckCircle,
  FeatherGlobe,
  FeatherLock,
  FeatherRepeat,
  FeatherShieldCheck,
} from "@subframe/core";

import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { getTaxTreatment, type ViesStatus } from "../_lib/taxTreatment";

export default function TaxTreatment({
  countryCode,
  viesStatus,
}: {
  countryCode: string | undefined;
  viesStatus: ViesStatus;
}) {
  const t = useScopedI18n("collectivityPricing.quoteInformation.cards.legalIdentity.taxTreatment");
  const treatment = getTaxTreatment(countryCode, viesStatus);
  const isResolved = treatment !== "unresolved";
  const isAwaitingVies = Boolean(countryCode) && treatment === "unresolved";
  const status = isAwaitingVies
    ? t("pendingViesStatus")
    : treatment === "unresolved"
      ? t("pendingInformationStatus")
      : treatment === "france"
        ? t("status")
        : t(treatment);
  const description = isAwaitingVies
    ? t("pendingViesDescription")
    : treatment === "unresolved"
      ? t("pendingInformationDescription")
      : treatment === "france"
        ? t("description")
        : treatment === "europeanUnion"
          ? t("europeanUnionDescription")
          : t("outsideEuropeanUnionDescription");

  return (
    <div
      className={
        isResolved
          ? "flex w-full flex-col items-start gap-4 rounded-sm border border-solid border-brand-200 bg-brand-50 px-4 py-4"
          : "flex w-full flex-col items-start gap-4 rounded-sm border border-solid border-neutral-border bg-neutral-50 px-4 py-4"
      }
    >
      <div className="flex w-full items-start gap-3">
        <div
          className={
            isResolved
              ? "flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-100"
              : "flex h-9 w-9 flex-none items-center justify-center rounded-full bg-neutral-100"
          }
        >
          <FeatherShieldCheck
            className={
              isResolved
                ? "text-heading-3 font-heading-3 text-brand-700"
                : "text-heading-3 font-heading-3 text-neutral-600"
            }
            aria-hidden="true"
          />
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
          <div className="flex w-full flex-wrap items-center gap-2">
            <Typography
              variant="captionBold"
              className={isResolved ? "text-brand-800" : "text-default-font"}
            >
              {t("title")}
            </Typography>
            <FeatherLock
              className={
                isResolved
                  ? "text-caption font-caption text-brand-700"
                  : "text-caption font-caption text-neutral-600"
              }
              aria-hidden="true"
            />
          </div>
          <Typography variant="heading3" className="text-default-font">
            {status}
          </Typography>
          <Typography variant="captionSubframe" className="text-subtext-color">
            {description}
          </Typography>
        </div>
      </div>
      <div
        className={
          isResolved
            ? "flex w-full flex-col items-start gap-1 border-t border-solid border-brand-200 pt-3"
            : "flex w-full flex-col items-start gap-1 border-t border-solid border-neutral-border pt-3"
        }
      >
        <TaxTreatmentRow
          icon={<FeatherCheckCircle />}
          label={t("france")}
          currentLabel={t("current")}
          current={treatment === "france"}
        />
        <TaxTreatmentRow
          icon={<FeatherRepeat />}
          label={t("europeanUnion")}
          currentLabel={t("current")}
          current={treatment === "europeanUnion"}
        />
        <TaxTreatmentRow
          icon={<FeatherGlobe />}
          label={t("outsideEuropeanUnion")}
          currentLabel={t("current")}
          current={treatment === "outsideEuropeanUnion"}
        />
      </div>
    </div>
  );
}

function TaxTreatmentRow({
  icon,
  label,
  currentLabel,
  current = false,
}: {
  icon: React.ReactNode;
  label: string;
  currentLabel?: string;
  current?: boolean;
}) {
  return (
    <div
      className={
        current
          ? "flex w-full items-center gap-2 rounded-sm bg-default-background px-2 py-1"
          : "flex w-full items-center gap-2 px-2 py-1"
      }
    >
      <span
        className={
          current
            ? "text-caption font-caption text-brand-700"
            : "text-caption font-caption text-neutral-400"
        }
      >
        {icon}
      </span>
      <Typography
        variant={current ? "captionBold" : "captionSubframe"}
        className={current ? "grow shrink-0 basis-0 text-brand-800" : "text-subtext-color"}
      >
        {label}
      </Typography>
      {current ? (
        <Typography variant="captionSubframe" className="text-brand-700">
          {currentLabel}
        </Typography>
      ) : null}
    </div>
  );
}
