import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useScopedServerI18n } from "@/locales/server";

type Props = {
  children: ReactNode;
};

export default function HelpNestedLayout({ children }: Props) {
  const t = useScopedServerI18n("(pages).helpCurrent");
  const categories = t("categories.items") as { title: string; href: string }[];

  return (
    <main id="content" className="bg-background px-4 pb-16 pt-32 md:px-8 md:pt-36">
      <section className="mx-auto w-full max-w-6xl">
        <header className="rounded-2xl border border-border/30 bg-surface-warm px-5 py-5 md:px-8 md:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge variant="default">{t("badge")}</Badge>
              <Typography asChild variant="description" size="sm" className="mt-2">
                <p>{t("status")}</p>
              </Typography>
            </div>
            <Link
              href="/help"
              className="text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              {t("categories.title")}
            </Link>
          </div>

          <nav aria-label="Catégories d'aide" className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="rounded-full border border-border/40 bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-background"
              >
                {category.title}
              </Link>
            ))}
          </nav>
        </header>

        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
