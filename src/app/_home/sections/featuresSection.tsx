import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import Features from "../_features";

const titleAnimation = `timeline-view range-on-entry/360px_560px
          translate-y-[50px] opacity-0 no-animations:translate-x-0 no-animations:opacity-100
          animate-to-translate-0 animate-fade-in-out`

export default function FeaturesSection() {
  const t = useScopedI18n("home.features");

  return (
    <section id="features" aria-labelledby="features-heading" 
      className="py-12 px-4"
    >
      <div className="flex flex-col w-full items-center ">
        <Badge className={titleAnimation} variant="default">{t("badge")}</Badge>
        <Typography
          asChild
          variant={"title"}
          size={"xl"}
          className={"text-center md:my-6 my-3 md:mx-32 " + " " + titleAnimation}
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
          className="my-3 text-center px-6 md:px-16 scale-95 animate-to-translate-0
          timeline-view range-on-entry/300px_460px translate-y-[50px] opacity-0 no-animations:translate-y-0 no-animations:opacity-100"
        >
          <p>{t("description")}</p>
        </Typography>
        <Features />
      </div>
    </section>
  );
}
