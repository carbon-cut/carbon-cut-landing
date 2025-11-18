import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import Testimonials from "../_testimonials";

export default function TestimonialsSection() {
  const t = useScopedI18n("home.testimonials");

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-12">
      <Typography asChild variant="title" size="xl" className="text-center mb-10">
        <h2 id="testimonials-heading">{t("title")}</h2>
      </Typography>
      <Testimonials />
    </section>
  );
}
