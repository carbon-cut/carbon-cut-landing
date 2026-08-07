import type { Metadata } from "next";
import { requireHouseholdSession } from "@/lib/auth/access";
import { getFormRoute } from "@/lib/routing/routes";
import { getScopedI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import FormPageClient from "./_components/formPageClient";

const formSeo = getScopedI18n("seo.pages.form");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: formSeo("title"),
  description: formSeo("description"),
  keywords: toKeywordArray(formSeo("keywords") as unknown),
};

export default async function Page() {
  await requireHouseholdSession(getFormRoute());
  return <FormPageClient />;
}
