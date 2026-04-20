import { CollectivityBulletList } from "./lists";

import Typography from "@/components/ui/typography";

type ModuleScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
  dependenciesTitle: string;
  dependencies: string[];
  outputsTitle: string;
  outputs: string[];
};

export default function ModuleScaffold({
  eyebrow,
  title,
  description,
  dependenciesTitle,
  dependencies,
  outputsTitle,
  outputs,
}: ModuleScaffoldProps) {
  return (
    <section className="border border-border bg-card">
      <header className="border-b border-border px-5 py-5 md:px-6">
        <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
          <p>{eyebrow}</p>
        </Typography>
        <Typography asChild variant="title" size="2xl" className="mt-2">
          <h2>{title}</h2>
        </Typography>
        <Typography asChild variant="body" size="body" className="mt-3 max-w-3xl">
          <p>{description}</p>
        </Typography>
      </header>

      <div className="grid divide-y divide-border xl:grid-cols-2 xl:divide-x xl:divide-y-0">
        <section className="px-5 py-5 md:px-6">
          <Typography asChild variant="sectionTitle" size="sm">
            <h3>{dependenciesTitle}</h3>
          </Typography>
          <CollectivityBulletList className="mt-4" items={dependencies} tone="muted" />
        </section>

        <section className="px-5 py-5 md:px-6">
          <Typography asChild variant="sectionTitle" size="sm">
            <h3>{outputsTitle}</h3>
          </Typography>
          <CollectivityBulletList className="mt-4" items={outputs} tone="accent" />
        </section>
      </div>
    </section>
  );
}
