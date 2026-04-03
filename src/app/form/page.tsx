import type { Metadata } from "next";
import { requireServerSession } from "@/lib/auth/session";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import FormPageClient from "./_components/formPageClient";

const formSeo = useScopedServerI18n("seo.pages.form");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: formSeo("title"),
  description: formSeo("description"),
  keywords: toKeywordArray(formSeo("keywords") as unknown),
};

export default async function Page() {
  await requireServerSession("/form");
  return <FormPageClient />;
}
