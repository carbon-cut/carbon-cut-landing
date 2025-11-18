import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import Pricing from "../_pricing";

export default function PricingSection() {
  const t = useScopedI18n("home.pricing");

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-12">
      <div className="flex flex-col w-full items-center ">
        <Badge variant="default">{t("badge")}</Badge>
        <Typography asChild variant={"title"} size={"xl"} className="my-6 text-center">
          <h2 id="pricing-heading">{t("title")}</h2>
        </Typography>
        <Typography
          asChild
          variant="description"
          size="sm"
          className="text-center max-w-3xl mb-6 px-6"
        >
          <p>{t("description")}</p>
        </Typography>
        <Pricing />
      </div>
    </section>
  );
}
