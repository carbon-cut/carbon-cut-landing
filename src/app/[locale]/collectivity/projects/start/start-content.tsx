"use client";

import { FeatherAlertTriangle, FeatherArrowRight, FeatherFolderPlus } from "@subframe/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import AuthBrand from "@/app/[locale]/auth/_components/auth-brand";
import {
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchAvailableCollectivityClaims,
} from "@/app/[locale]/collectivity/_lib/queries";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

export default function CollectivityStartContent() {
  const t = useScopedI18n("collectivityStart");
  const router = useRouter();
  const availableClaims = useQuery({
    ...collectivityQueryOptions,
    queryKey: collectivityQueryKeys.availableClaims(),
    queryFn: fetchAvailableCollectivityClaims,
  });

  return (
    <main id="content" className="min-h-screen bg-black/55 px-4 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
        <div className="w-full max-w-2xl rounded-3xl border border-border/70 bg-card px-6 py-7 shadow-xl md:px-8 md:py-8">
          <div className="mx-auto mb-7 mt-1 w-fit">
            <AuthBrand />
          </div>
          <section className="space-y-4" aria-labelledby="collectivity-start-title">
            <div className="space-y-1">
              <Typography asChild variant="heading3">
                <h2 id="collectivity-start-title">{t("title") as string}</h2>
              </Typography>
              <Typography asChild variant="bodySubframe">
                <p>{t("description") as string}</p>
              </Typography>
            </div>
            {availableClaims.isPending ? <LoadingState /> : null}
            {availableClaims.isError ? (
              <ErrorState retry={() => void availableClaims.refetch()} />
            ) : null}
            {availableClaims.data?.length === 0 ? <EmptyState /> : null}
            {availableClaims.data?.length ? (
              <div className="mt-6 flex flex-col gap-3">
                {availableClaims.data.map((claim) => (
                  <article key={claim.id} className="rounded-md border border-border p-2">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 space-y-1">
                        <Typography variant="bodyBold">
                          {
                            t("assignmentFrom", {
                              name: claim.subscription.purchaserName ?? "—",
                            }) as string
                          }
                        </Typography>
                        {claim.subscription.organization ? (
                          <Typography variant="bodySubframe" className="">
                            <p>
                              {
                                t("organization", {
                                  organization: claim.subscription.organization,
                                }) as string
                              }
                            </p>
                          </Typography>
                        ) : null}
                      </div>
                      <Button
                        className="rounded-full"
                        variant="brand-primary"
                        iconRight={<FeatherArrowRight />}
                        onClick={() =>
                          router.push(`/collectivity/projects/setup?claimId=${claim.id}`)
                        }
                      >
                        {t("createProject") as string}
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );

  function LoadingState() {
    return (
      <div className="mt-6 flex flex-col gap-3" aria-live="polite">
        <Typography variant="caption" className="text-secondary">
          {t("loading") as string}
        </Typography>
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  function EmptyState() {
    return (
      <div className="mt-6 flex flex-col items-start gap-2 rounded-md border border-border p-4">
        <FeatherFolderPlus
          className="text-heading-3 font-heading-3 text-secondary"
          aria-hidden="true"
        />
        <Typography variant="bodyBold">{t("emptyTitle") as string}</Typography>
        <Typography variant="caption" className="text-secondary">
          {t("emptyDescription") as string}
        </Typography>
      </div>
    );
  }

  function ErrorState({ retry }: { retry: () => void }) {
    return (
      <div className="mt-6 flex flex-col items-start gap-3 rounded-md border border-danger-200 bg-danger-50 p-4">
        <div className="flex items-center gap-2">
          <FeatherAlertTriangle
            className="text-body font-body text-danger-700"
            aria-hidden="true"
          />
          <Typography variant="bodyBold">{t("error") as string}</Typography>
        </div>
        <Button variant="outline" size="sm" onClick={retry}>
          {t("retry") as string}
        </Button>
      </div>
    );
  }
}
