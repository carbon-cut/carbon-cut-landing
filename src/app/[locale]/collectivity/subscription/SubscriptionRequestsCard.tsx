"use client";

import { FeatherCheck, FeatherInbox, FeatherInfo, FeatherTicket, FeatherX } from "@subframe/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";

import { formatQuoteDate } from "../pricing/_lib/quotePresentation";
import type { CollectivitySubscriptionDetail } from "./_lib/claims";
import {
  approveSubscriptionRequest,
  denySubscriptionRequest,
  fetchSubscriptionDetail,
  subscriptionDetailQueryKey,
  subscriptionDetailQueryOptions,
} from "./_lib/queries";

export default function SubscriptionRequestsCard({
  initialSubscription,
}: {
  initialSubscription: CollectivitySubscriptionDetail;
}) {
  const t = useScopedI18n("collectivitySubscription.requests");
  const locale = useCurrentLocale();
  const queryClient = useQueryClient();
  const queryKey = subscriptionDetailQueryKey(initialSubscription.id);
  const detailQuery = useQuery({
    ...subscriptionDetailQueryOptions,
    queryKey,
    queryFn: () => fetchSubscriptionDetail(initialSubscription.id),
    initialData: initialSubscription,
  });
  const refresh = () => queryClient.invalidateQueries({ queryKey });
  const approve = useMutation({
    mutationFn: (claimId: number) => approveSubscriptionRequest(initialSubscription.id, claimId),
    onSuccess: refresh,
  });
  const deny = useMutation({
    mutationFn: (claimId: number) => denySubscriptionRequest(initialSubscription.id, claimId),
    onSuccess: refresh,
  });
  const subscription = detailQuery.data ?? initialSubscription;
  const pending = subscription.assignments.filter((item) => item.status === "pending");
  const declined = subscription.assignments
    .filter((item) => item.status === "denied")
    .sort((left, right) => (right.deniedAt ?? "").localeCompare(left.deniedAt ?? ""))
    .slice(0, 3);
  const isMutating = approve.isPending || deny.isPending;

  return (
    <Card className="w-full rounded-md border-neutral-border bg-default-background shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-4 mobile:flex-col">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <FeatherInbox
              className="text-heading-3 font-heading-3 text-brand-600"
              aria-hidden="true"
            />
            <CardTitle asChild>
              <h2>{t("title")}</h2>
            </CardTitle>
          </div>
          <CardDescription className="text-caption font-caption">
            {t("description")}
          </CardDescription>
        </div>
        <Badge variant="warning">
          <FeatherInbox className="size-3" aria-hidden="true" />
          {t("awaiting", { count: pending.length })}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex w-full items-center gap-2 rounded-sm border border-solid border-success-200 bg-brand-50 px-3 py-2">
          <FeatherTicket className="text-body font-body text-brand-700" aria-hidden="true" />
          <Typography variant="captionBold" className="text-brand-800">
            {t("approvalNotice")}
          </Typography>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("requested")}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pending.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-neutral-100">
                        <Typography variant="captionBold">
                          {initials(request.claimantFullName ?? request.claimantEmail)}
                        </Typography>
                      </AvatarFallback>
                    </Avatar>
                    <Typography variant="bodyBold" className="whitespace-nowrap text-default-font">
                      {request.claimantFullName ?? request.claimantEmail}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="bodySubframe"
                    className="whitespace-nowrap text-subtext-color"
                  >
                    {request.claimantEmail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="bodySubframe"
                    className="whitespace-nowrap text-subtext-color"
                  >
                    {formatQuoteDate(request.createdAt, locale)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="neutral-secondary"
                      size="small"
                      loading={isMutating}
                      onClick={() => deny.mutate(request.id)}
                    >
                      {t("deny")}
                    </Button>
                    <Button
                      variant="brand-primary"
                      size="small"
                      icon={<FeatherCheck />}
                      loading={isMutating}
                      onClick={() => approve.mutate(request.id)}
                    >
                      {t("approve")}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {declined.length > 0 && (
          <div className="flex flex-col items-start gap-2 border-t border-solid border-neutral-border pt-4">
            <Typography variant="captionBold" className="text-subtext-color">
              {t("recentlyDeclined")}
            </Typography>
            <table className="w-full border-separate border-spacing-y-2">
              <tbody>
                {declined.map((request) => (
                  <tr key={request.id}>
                    <td className="w-full min-w-0 py-2 pr-2">
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-neutral-100">
                            <Typography variant="captionBold">
                              {initials(request.claimantFullName ?? request.claimantEmail)}
                            </Typography>
                          </AvatarFallback>
                        </Avatar>
                        <Typography
                          variant="bodySubframe"
                          className="min-w-0 truncate text-subtext-color"
                        >
                          {request.claimantFullName ?? request.claimantEmail}
                        </Typography>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-2 pr-2">
                      <Badge variant="neutral">
                        <FeatherX className="size-3" aria-hidden="true" />
                        {t("declined")}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap py-2 text-right">
                      <Typography variant="captionSubframe" className="text-subtext-color">
                        {request.deniedAt ? formatQuoteDate(request.deniedAt, locale) : null}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {approve.isError || deny.isError ? (
          <Typography role="alert" variant="captionSubframe" className="text-error-700">
            <FeatherInfo className="inline size-3" aria-hidden="true" /> {t("error")}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}

function initials(value: string) {
  return value
    .split(/\s+|@/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
