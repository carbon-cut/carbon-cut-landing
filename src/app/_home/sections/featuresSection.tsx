import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import Features from "../_features";

export default function FeaturesSection() {
  const t = useScopedI18n("home.features");

  return (
    <section id="features" aria-labelledby="features-heading" className="py-12 px-4">
      <div className="flex flex-col w-full items-center ">
        <Badge variant="default">{t("badge")}</Badge>
        <Typography
          asChild
          variant={"title"}
          size={"huge"}
          className="text-center md:my-6 my-3"
        >
          <h2 id="features-heading">
            {t("title.line1")}{" "}
            <br className="md:hidden" /> {t("title.line2.prefix")}{" "}
            <span className="text-chart-3">{t("title.line2.highlight")}</span>{" "}
            {t("title.line2.suffix")}
          </h2>
        </Typography>
        <Typography
          asChild
          variant={"description"}
          size={"sm"}
          className="my-3 text-center px-6 md:px-16"
        >
          <p>{t("description")}</p>
        </Typography>
        <Features />
      </div>
    </section>
  );
}
