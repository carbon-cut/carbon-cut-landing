import { redirect } from "next/navigation";

import countryMetadata from "../../pricing/_lib/countries.json";
import { requireCollectivitySession } from "@/lib/auth/access";
import {
  getAvailableCollectivityClaims,
  getCollectivityCountries,
} from "@/lib/collectivity/backend";
import { getCollectivitySetupEntryRoute, getCollectivityStartRoute } from "@/lib/routing/routes";

import { getCollectivityCountryOptions } from "./_lib/schema";
import CollectivitySetupEntryForm from "./_components/collectivitySetupEntryForm";

export const dynamic = "force-dynamic";

export default async function CollectivitySetupPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ claimId?: string }>;
}) {
  await requireCollectivitySession(getCollectivitySetupEntryRoute());
  const claimId = Number((await searchParams).claimId);

  if (!Number.isSafeInteger(claimId) || claimId < 1) {
    redirect(getCollectivityStartRoute());
  }

  const [{ locale }, supportedCountries, availableClaims] = await Promise.all([
    params,
    getCollectivityCountries(),
    getAvailableCollectivityClaims(),
  ]);

  if (!availableClaims.some((claim) => claim.id === claimId)) {
    redirect(getCollectivityStartRoute());
  }

  const countryOptions = getCollectivityCountryOptions(
    supportedCountries.map((country) => country.code),
    locale
  ).map((option) => {
    const country = countryMetadata.find((candidate) => candidate.alpha3 === option.value);
    return {
      ...option,
      label: (
        <span className="flex items-center gap-2">
          {country ? <span aria-hidden="true" className={`flag:${country.alpha2}`} /> : null}
          <span>{option.label}</span>
        </span>
      ),
    };
  });

  return (
    <CollectivitySetupEntryForm
      approvedClaimId={claimId}
      countryOptions={countryOptions}
      initialValues={{}}
    />
  );
}
