import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import Testimonials from "../_testimonials";

export default function TestimonialsSection() {
  const t = useScopedI18n("home.testimonials");

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-12"
    >
      <div className="flex flex-col justify-center mb-4">
        <Badge
          variant="default"
          className="w-fit timeline-view range-on-entry/20vh_50vh translate-y-3 scale-90 opacity-0 animate-rise-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100"
        >
          {t("badge")}
        </Badge>
      
      <div className="timeline-view range-on-entry/20vh_50vh translate-y-6 opacity-0 blur-sm animate-blur-in motion-reduce:animate-none no-animations:translate-y-0 no-animations:opacity-100 no-animations:blur-0">
        <Typography asChild variant="title" size="xl" className="text-center mb-10">
          <h2 id="testimonials-heading">{t("title")}</h2>
        </Typography>
      </div>
      </div>
      <Testimonials />
    </section>
  );
}
