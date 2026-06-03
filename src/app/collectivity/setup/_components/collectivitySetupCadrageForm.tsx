"use client";

import type { CollectivityCadrageValues } from "@/app/collectivity/_cadrage/schema";
import CollectivityCadrageForm from "@/app/collectivity/_components/collectivityCadrageForm";

type CountryOption = {
  value: string;
  label: string;
};

type CollectivitySetupCadrageFormProps = {
  countryOptions: CountryOption[];
  initialValues: Partial<CollectivityCadrageValues>;
};

export default function CollectivitySetupCadrageForm({
  countryOptions,
  initialValues,
}: CollectivitySetupCadrageFormProps) {
  return (
    <CollectivityCadrageForm
      variant="setup"
      initialValues={initialValues}
      countryOptions={countryOptions}
    />
  );
}
