import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export default async function CollectivityPricingQuoteInformationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("collectivityPricing.quoteInformation.cards");
  const cards = [
    {
      title: t("legalIdentity.title"),
      description: t("legalIdentity.description"),
    },
    {
      title: t("quoteTerms.title"),
      description: t("quoteTerms.description"),
    },
  ];

  return (
    <div className="flex w-full items-start gap-8 mobile:flex-col mobile:gap-6">
      <section className="flex min-w-0 grow shrink-0 basis-0 flex-col items-start gap-6 mobile:flex-none">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="w-full border-solid border-neutral-border bg-default-background shadow-sm"
          >
            <CardHeader className="px-6 py-6 mobile:px-4 mobile:py-4">
              <CardTitle>{card.title}</CardTitle>
              <CardDescription className="font-body">{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
      <aside className="sticky top-6 flex w-96 flex-none mobile:static mobile:w-full">
        <Card className="w-full border-solid border-neutral-border bg-default-background shadow-md">
          <CardHeader className="px-6 py-6 mobile:px-4 mobile:py-4">
            <CardTitle>{t("selectedOffer.title")}</CardTitle>
          </CardHeader>
        </Card>
      </aside>
    </div>
  );
}
