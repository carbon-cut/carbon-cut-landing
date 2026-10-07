"use client";

import type { CollectivitySetupValues } from "@/app/[locale]/collectivity/projects/setup/_lib/schema";
import CollectivitySetupForm from "@/app/[locale]/collectivity/projects/setup/_components/collectivitySetupForm";
import type { ReactNode } from "react";

type CountryOption = {
  value: string;
  label: ReactNode;
};

type CollectivitySetupEntryFormProps = {
  approvedClaimId: number;
  countryOptions: CountryOption[];
  initialValues: Partial<CollectivitySetupValues>;
};

export default function CollectivitySetupEntryForm({
  approvedClaimId,
  countryOptions,
  initialValues,
}: CollectivitySetupEntryFormProps) {
  return (
    <CollectivitySetupForm
      approvedClaimId={approvedClaimId}
      variant="setup"
      initialValues={initialValues}
      countryOptions={countryOptions}
    />
  );
}
