"use client";

import type { CollectivitySetupValues } from "@/app/collectivity/setup/_lib/schema";
import CollectivitySetupForm from "@/app/collectivity/setup/_components/collectivitySetupForm";

type CountryOption = {
  value: string;
  label: string;
};

type CollectivitySetupEntryFormProps = {
  countryOptions: CountryOption[];
  initialValues: Partial<CollectivitySetupValues>;
};

export default function CollectivitySetupEntryForm({
  countryOptions,
  initialValues,
}: CollectivitySetupEntryFormProps) {
  return (
    <CollectivitySetupForm
      variant="setup"
      initialValues={initialValues}
      countryOptions={countryOptions}
    />
  );
}
