"use client";

import { FeatherCircleSlash, FeatherLink, FeatherRadio, FeatherRefreshCw } from "@subframe/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyClipboard } from "@/components/ui/copyClipboard";
import Typography from "@/components/ui/typography";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";

import { formatQuoteDate } from "../pricing/_lib/quotePresentation";
import type { CollectivitySubscriptionDetail } from "./_lib/claims";
import {
  createSubscriptionInvitationLink,
  fetchSubscriptionDetail,
  revokeSubscriptionInvitationLink,
  subscriptionDetailQueryKey,
  subscriptionDetailQueryOptions,
} from "./_lib/queries";

export default function SubscriptionInvitationLinkCard({
  initialSubscription,
}: {
  initialSubscription: CollectivitySubscriptionDetail;
}) {
  const t = useScopedI18n("collectivitySubscription.invitationLink");
  const locale = useCurrentLocale();
  const queryClient = useQueryClient();
  const subscriptionId = initialSubscription.id;
  const detailQueryKey = subscriptionDetailQueryKey(subscriptionId);
  const detailQuery = useQuery({
    ...subscriptionDetailQueryOptions,
    queryKey: detailQueryKey,
    queryFn: () => fetchSubscriptionDetail(subscriptionId),
    initialData: initialSubscription,
  });
  const createLink = useMutation({
    mutationFn: () => createSubscriptionInvitationLink(subscriptionId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: detailQueryKey });
    },
  });
  const revokeLink = useMutation({
    mutationFn: () => revokeSubscriptionInvitationLink(subscriptionId),
    onSuccess: async () => {
      createLink.reset();
      await queryClient.invalidateQueries({ queryKey: detailQueryKey });
    },
  });
  const subscription = detailQuery.data ?? initialSubscription;
  const invitationLink = createLink.data ?? subscription.claimLink;
  const invitationPath = invitationLink ? buildInvitationPath(invitationLink.token) : null;
  const [origin, setOrigin] = useState<string | null>(null);
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const link = invitationPath && origin ? `${origin}${invitationPath}` : null;
  const displayedLink = link?.replace(/^https?:\/\//, "") ?? invitationPath;
  const isMutating = createLink.isPending || revokeLink.isPending;

  return (
    <Card className="w-full flex-row items-center gap-4 rounded-md border-neutral-border bg-default-background px-4 py-3 mobile:flex-col mobile:items-start">
      {link && invitationLink ? (
        <div className="flex min-w-0 max-w-full grow basis-0 items-center gap-3">
          <FeatherLink
            className="text-heading-3 font-heading-3 text-subtext-color"
            aria-hidden="true"
          />
          <div className="flex min-w-0 grow basis-0 flex-col items-start">
            <div className="flex w-full items-center gap-1">
              <Typography
                variant="bodySubframe"
                className="truncate font-mono text-default-font max-w-1/2 md:max-w-[350px]"
              >
                {displayedLink}
              </Typography>
              <CopyClipboard
                value={link ?? ""}
                ariaLabel={t("copy")}
                disabled={isMutating || !link}
              />
            </div>
            <Typography variant="captionSubframe" className="text-subtext-color">
              {t("expiresAt", { date: formatQuoteDate(invitationLink.expiresAt, locale) })}
            </Typography>
          </div>
          <Badge variant="success" className="flex-none">
            <FeatherRadio className="size-3" aria-hidden="true" />
            {t("accepting")}
          </Badge>
        </div>
      ) : (
        <div className="flex min-w-0 grow basis-0 items-center gap-3">
          <FeatherLink
            className="text-heading-3 font-heading-3 text-subtext-color"
            aria-hidden="true"
          />
          <Button
            type="button"
            variant="brand-primary"
            size="small"
            loading={isMutating}
            onClick={() => createLink.mutate()}
          >
            {t("create")}
          </Button>
        </div>
      )}
      {link ? (
        <div className="flex flex-none items-center gap-2 mobile:w-full">
          <Button
            type="button"
            variant="neutral-secondary"
            size="small"
            icon={<FeatherRefreshCw />}
            loading={isMutating}
            onClick={() => createLink.mutate()}
          >
            {t("replace")}
          </Button>
          <Button
            type="button"
            variant="destructive-secondary"
            size="small"
            icon={<FeatherCircleSlash />}
            loading={isMutating}
            onClick={() => revokeLink.mutate()}
          >
            {t("stop")}
          </Button>
        </div>
      ) : null}
      {createLink.isError || revokeLink.isError ? (
        <Typography role="alert" variant="captionSubframe" className="text-error-700">
          {t("error")}
        </Typography>
      ) : null}
    </Card>
  );
}

function buildInvitationPath(token: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const params = new URLSearchParams({ token });
  return `${basePath}/collectivity/invitation?${params.toString()}`;
}
