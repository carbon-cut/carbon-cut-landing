import type { Metadata } from "next";

import PricingConfigurator from "./_components/PricingConfigurator";
import Typography from "@/components/ui/typography";
import { getServerSession } from "@/lib/auth/session";
import { getCollectivityPricingRoute } from "@/lib/routing/routes";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("seo.pages.collectivityPricing");
  return { title: t("title"), description: t("description") };
}

export default async function CollectivityPricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const [t, session] = await Promise.all([
    getScopedI18n("collectivityPricing"),
    getServerSession(),
  ]);

  return (
    <main
      id="content"
      className="flex w-full flex-col items-center md:mt-16 px-4 py-6 md:px-8 md:py-10"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-start gap-6 md:gap-8">
        <header className="flex w-full flex-col items-start gap-2">
          <Typography asChild variant="heading1" className="text-default-font">
            <h1>{t("title")}</h1>
          </Typography>
          <Typography asChild variant="bodySubframe" className="max-w-[720px] text-subtext-color">
            <p>{t("description")}</p>
          </Typography>
        </header>
        <PricingConfigurator
          isAuthenticated={session.authenticated}
          pricingRoute={getCollectivityPricingRoute()}
        />
      </div>
    </main>
  );
}
