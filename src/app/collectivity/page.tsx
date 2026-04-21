import { redirect } from "next/navigation";
import { DEFAULT_COLLECTIVITY_PLAN_ID, getCollectivityPlanRoute } from "./_lib/routing";

export default function CollectivityIndexPage() {
  redirect(getCollectivityPlanRoute(DEFAULT_COLLECTIVITY_PLAN_ID));
}
