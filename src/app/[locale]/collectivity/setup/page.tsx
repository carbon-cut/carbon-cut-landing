import { requireCollectivitySetupSession } from "@/lib/auth/access";
import { getCollectivitySetupEntryRoute } from "@/lib/routing/routes";

import { getCollectivityCountryOptions } from "./_lib/schema";
import CollectivitySetupEntryForm from "./_components/collectivitySetupEntryForm";

export const dynamic = "force-dynamic";

export default async function CollectivitySetupPage() {
  await requireCollectivitySetupSession(getCollectivitySetupEntryRoute());
  const countryOptions = await getCollectivityCountryOptions();

  return <CollectivitySetupEntryForm countryOptions={countryOptions} initialValues={{}} />;
}
