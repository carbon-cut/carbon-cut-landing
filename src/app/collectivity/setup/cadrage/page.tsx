import { requireCollectivitySetupSession } from "@/lib/auth/access";

import { getCollectivityCountryOptions } from "../../_cadrage/schema";
import { DEFAULT_COLLECTIVITY_PLAN_ID } from "../../_lib/routing";
import CollectivitySetupCadrageForm from "../_components/collectivitySetupCadrageForm";

export const dynamic = "force-dynamic";

export default async function CollectivitySetupCadragePage() {
  await requireCollectivitySetupSession("/collectivity/setup/cadrage");
  const countryOptions = await getCollectivityCountryOptions();

  return (
    <CollectivitySetupCadrageForm
      countryOptions={countryOptions}
      initialValues={{
        planId: DEFAULT_COLLECTIVITY_PLAN_ID,
      }}
    />
  );
}
