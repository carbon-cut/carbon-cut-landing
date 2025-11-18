import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import FAQs from "../_faqs";

export default function FaqSection() {
  const t = useScopedI18n("home.faq");

  return (
    <section id="faq" aria-labelledby="faq-heading" className="pb-16">
      <div className="flex flex-col w-full items-center md:px-16 px-3">
        <Badge variant="default">{t("badge")}</Badge>
        <Typography asChild variant={"title"} size={"xl"} className="mt-4 text-center scroll-m-20">
          <h2 id="faq-heading">{t("title")}</h2>
        </Typography>
        <div className="min-w-full mx-24 my-12 md:px-12 px-6  pb-6 rounded-xl bg-card">
          <FAQs />
        </div>
      </div>
    </section>
  );
}
