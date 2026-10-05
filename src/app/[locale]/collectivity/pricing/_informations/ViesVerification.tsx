import { FeatherBadgeCheck } from "@subframe/core";
import { CircleX, Loader2 } from "lucide-react";
import type { ViesStatus } from "../_lib/taxTreatment";

export default function ViesVerification({
  status,
  labels,
}: {
  status: ViesStatus;
  labels: {
    notChecked: string;
    checking: string;
    verified: string;
    invalid: string;
    unavailable: string;
  };
}) {
  const isVerified = status === "verified";
  const isChecking = status === "checking";
  const isInvalid = status === "invalid";
  const label = isVerified
    ? labels.verified
    : isChecking
      ? labels.checking
      : isInvalid
        ? labels.invalid
        : status === "unavailable"
          ? labels.unavailable
          : labels.notChecked;

  return (
    <div
      className={
        isVerified
          ? "flex h-6 items-center gap-1 rounded-md border border-solid border-success-100 bg-success-100 px-2 text-caption font-caption text-success-800"
          : isInvalid
            ? "flex h-6 items-center gap-1 rounded-md border border-solid border-error-100 bg-error-100 px-2 text-caption font-caption text-error-700"
            : "flex h-6 items-center gap-1 rounded-md border border-solid border-neutral-border bg-neutral-100 px-2 text-caption font-caption text-subtext-color"
      }
    >
      {isVerified ? <FeatherBadgeCheck aria-hidden="true" /> : null}
      {isInvalid ? <CircleX aria-hidden="true" className="h-3 w-3" /> : null}
      {isChecking ? <Loader2 aria-hidden="true" className="h-3 w-3 animate-spin" /> : null}
      {label}
    </div>
  );
}
