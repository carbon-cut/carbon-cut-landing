import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import FAQs from "../_faqs";

export default function FaqSection() {
  const t = useScopedI18n("home.faq");

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="pb-10"
    >
      <div className="flex flex-col w-full items-center md:px-12 px-3">
        <Badge
          variant="default"
          className="timeline-view range-on-entry/20vh_60vh translate-y-4 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
        >
          {t("badge")}
        </Badge>
        <Typography
          asChild
          variant={"title"}
          size={"xl"}
          className="mt-4 text-center scroll-m-20 timeline-view range-on-entry/20vh_60vh translate-y-6 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100 no-animations:rotate-0 max-w-3xl"
        >
          <h2 id="faq-heading">{t("title")}</h2>
        </Typography>
        <div className="w-full md:max-w-4xl mx-auto my-10 md:px-10 px-4 pb-6 rounded-xl bg-card timeline-view range-on-entry/20vh_60vh translate-y-8 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100">
          <FAQs />
        </div>
      </div>
    </section>
  );
}
