import { redirect } from "next/navigation";
import Link from "next/link";

import AuthBrand from "@/app/[locale]/auth/_components/auth-brand";
import CollectivityAccessNotice from "@/app/[locale]/collectivity/_components/CollectivityAccessNotice";
import { loadCollectivityProjectsForUser } from "@/app/[locale]/collectivity/_lib/loadCollectivitySetupSnapshot";
import {
  getCollectivityModuleRoute,
  getCollectivityProjectsRoute,
  getCollectivitySetupRoute,
  isCollectivityModuleSlug,
  type CollectivityModuleSlug,
} from "@/app/[locale]/collectivity/_lib/routing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { requireCollectivitySession } from "@/lib/auth/access";
import { CollectivityBackendError } from "@/lib/collectivity/backend";
import { buildLogoutRedirect } from "@/lib/auth/redirect";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export const dynamic = "force-dynamic";

function normalizeModuleParam(value: string | string[] | undefined): CollectivityModuleSlug {
  const singleValue =
    typeof value === "string" ? value : Array.isArray(value) ? value[0] : undefined;

  if (singleValue && isCollectivityModuleSlug(singleValue)) {
    return singleValue;
  }

  return "setup";
}

export default async function CollectivityProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const session = await requireCollectivitySession(getCollectivityProjectsRoute());
  let projects;

  try {
    projects = await loadCollectivityProjectsForUser(session.user);
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      if (error.status === 401) {
        redirect(buildLogoutRedirect(getCollectivityProjectsRoute()));
      }

      return (
        <CollectivityAccessNotice returnHref={getCollectivitySetupRoute()} status={error.status} />
      );
    }

    throw error;
  }

  if (projects.length === 0) {
    redirect(getCollectivitySetupRoute());
  }

  const resolvedSearchParams = await searchParams;
  const moduleSlug = normalizeModuleParam(resolvedSearchParams.module);
  const t = await getScopedI18n("(pages).collectivityDashboard");
  const moduleTitle = t(`workflow.sections.${moduleSlug}.title`);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-10 md:px-6">
      <section className="w-full rounded-[2rem] border border-border bg-card px-5 py-6 shadow-[0_20px_60px_rgba(9,35,31,0.06)] md:px-8 md:py-8">
        <div className="mx-auto mb-7 w-fit">
          <AuthBrand />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
            <p>{t("projectSelector.eyebrow") as string}</p>
          </Typography>
          <Typography asChild variant="title" size="md" className="mt-3">
            <h1>{t("projectSelector.title") as string}</h1>
          </Typography>
          <Typography asChild variant="description" size="md" className="mt-3">
            <p>{t("projectSelector.description") as string}</p>
          </Typography>
          <div className="mt-4 flex justify-center">
            <Badge variant="outline">{moduleTitle}</Badge>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-border bg-background/60 px-4 py-4 md:px-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Typography asChild variant="sectionTitle" size="sm">
                      <h2>{project.name}</h2>
                    </Typography>
                    <Badge variant="outline">{project.slug}</Badge>
                  </div>
                  <Typography asChild variant="body" size="body" className="mt-2 text-secondary">
                    <p>{project.territory}</p>
                  </Typography>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-secondary">
                    <span>
                      {t("planMarkers.referenceYear") as string}: {project.referenceYear}
                    </span>
                    <span>
                      {t("planMarkers.supportYears") as string}: {project.inventoryYears.join(", ")}
                    </span>
                  </div>
                </div>

                <Button asChild className="min-w-40 self-start md:self-center">
                  <Link href={getCollectivityModuleRoute(project.slug, moduleSlug)}>
                    {t("projectSelector.openAction") as string}
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
