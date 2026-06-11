import Typography from "@/components/ui/typography";

type RouteSection = {
  title: string;
  description: string;
};

type RouteDescriptionPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  sectionsTitle?: string;
  sections?: RouteSection[];
};

export default function RouteDescriptionPanel({
  eyebrow,
  title,
  description,
  sectionsTitle,
  sections = [],
}: RouteDescriptionPanelProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-border/10 bg-card shadow-[0_18px_36px_rgba(9,35,31,0.04)]">
      <header className="border-b border-border/10 px-5 py-5 md:px-6">
        <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
          <p>{eyebrow}</p>
        </Typography>
        <Typography asChild variant="title" size="2xl" className="mt-2">
          <h2>{title}</h2>
        </Typography>
      </header>

      <div className="px-5 py-5 md:px-6">
        <Typography asChild variant="body" size="body" className="max-w-3xl">
          <p>{description}</p>
        </Typography>
      </div>

      {sections.length > 0 ? (
        <div className="border-t border-border/10 px-5 py-5 md:px-6">
          {sectionsTitle ? (
            <Typography asChild variant="sectionTitle" size="sm">
              <h3>{sectionsTitle}</h3>
            </Typography>
          ) : null}

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-border/10 bg-background/90 px-4 py-4"
              >
                <Typography asChild variant="sectionTitle" size="sm">
                  <h4>{section.title}</h4>
                </Typography>
                <Typography asChild variant="body" size="body" className="mt-2">
                  <p>{section.description}</p>
                </Typography>
              </section>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
