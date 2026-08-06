import { requireCollectivitySetupSession } from "@/lib/auth/access";

import { getCollectivityCountryOptions } from "./_lib/schema";
import CollectivitySetupEntryForm from "./_components/collectivitySetupEntryForm";

export const dynamic = "force-dynamic";

export default async function CollectivitySetupPage() {
  await requireCollectivitySetupSession("/collectivity/setup");
  const countryOptions = await getCollectivityCountryOptions();

  return <CollectivitySetupEntryForm countryOptions={countryOptions} initialValues={{}} />;
}
