import type { Metadata } from "next";
import type { ReactNode } from "react";

import { toKeywordArray } from "@/lib/seo";
import { useScopedServerI18n } from "@/locales/server";

const collectivitySeo = useScopedServerI18n("seo.pages.collectivityDashboard");

export const metadata: Metadata = {
  title: collectivitySeo("title"),
  description: collectivitySeo("description"),
  keywords: toKeywordArray(collectivitySeo("keywords") as unknown),
};

export default function CollectivityLayout({ children }: { children: ReactNode }) {
  return children;
}
