import UnderDevelopmentPage from "@/components/pages/UnderDevelopmentPage";
import { getCollectivityLandingRoute } from "@/lib/routing/routes";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export default async function HouseholdPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("householdUnderDevelopment");

  return (
    <UnderDevelopmentPage
      title={t("title")}
      description={t("description")}
      primaryButton={{
        label: t("primaryButton.label"),
        href: "/",
      }}
      secondaryButton={{
        label: t("secondaryButton.label"),
        href: getCollectivityLandingRoute(),
      }}
    />
  );
}
