"use client";

import {
  FeatherLayers,
  FeatherPlus,
  FeatherUserMinus,
  FeatherUserPlus,
  FeatherUsers,
} from "@subframe/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Typography from "@/components/ui/typography";
import CompactSelect from "@/components/controls/CompactSelect";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";

import { formatQuoteDate } from "../pricing/_lib/quotePresentation";
import type { CollectivitySubscriptionDetail } from "./_lib/claims";
import {
  assignSubscriptionPlaceDirectly,
  assignSubscriptionPlaceToSelf,
  fetchSubscriptionDetail,
  revokeSubscriptionAssignment,
  SubscriptionApiError,
  subscriptionDetailQueryKey,
  subscriptionDetailQueryOptions,
} from "./_lib/queries";

export default function SubscriptionCapacityCard({
  initialSubscription,
}: {
  initialSubscription: CollectivitySubscriptionDetail;
}) {
  const t = useScopedI18n("collectivitySubscription.capacity");
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
  const assignSelf = useMutation({
    mutationFn: () => assignSubscriptionPlaceToSelf(subscriptionId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: detailQueryKey });
    },
  });
  const assignDirectly = useMutation({
    mutationFn: (claimantUserId: number) =>
      assignSubscriptionPlaceDirectly(subscriptionId, claimantUserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: detailQueryKey });
    },
  });
  const revokeAssignment = useMutation({
    mutationFn: (claimId: number) => revokeSubscriptionAssignment(subscriptionId, claimId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: detailQueryKey });
    },
  });

  const subscription = detailQuery.data ?? initialSubscription;
  const {
    purchased: purchasedPlaces,
    available: availableCount,
    reserved,
    used,
  } = subscription.credits;
  const assignedCount = reserved + used;
  const assignedClaims = subscription.assignments
    .filter((assignment) => assignment.status === "approved" || assignment.status === "consumed")
    .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  const canAssignSelf = availableCount > 0;
  const assignmentOptions = uniqueInvitees(subscription.assignments).map((assignment) => ({
    value: String(assignment.claimantUserId),
    label: assignment.claimantEmail,
  }));
  const isAssigning = assignSelf.isPending || assignDirectly.isPending;
  const assignmentError = assignSelf.error ?? assignDirectly.error;

  return (
    <Card className="w-full rounded-md border-neutral-border bg-default-background shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FeatherLayers
            className="text-heading-3 font-heading-3 text-brand-600"
            aria-hidden="true"
          />
          <CardTitle asChild>
            <h2 id="subscription-capacity-title">{t("title")}</h2>
          </CardTitle>
        </div>
        <CardDescription className="text-caption font-caption">{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <section aria-labelledby="subscription-capacity-title" className="flex flex-col gap-5">
          <div className="flex w-full items-end justify-between gap-4 mobile:flex-col mobile:items-start">
            <div className="flex flex-wrap items-end gap-2">
              <Typography variant="captionBold" className="">
                {t("assignedOfPurchased", { assigned: assignedCount, purchased: purchasedPlaces })}
              </Typography>
              <Typography variant="captionSubframe" className=" text-subtext-color">
                {t("availabilitySummary", { available: availableCount })}
              </Typography>
            </div>
            <div className="flex items-center gap-4">
              <CapacityLegend
                colorClassName="bg-brand-600"
                label={t("assignedLegend", { count: assignedCount })}
              />
              <CapacityLegend
                colorClassName="border border-dashed border-neutral-400"
                label={t("availableLegend", { count: availableCount })}
              />
              <CapacityLegend
                colorClassName="bg-neutral-300"
                label={t("purchasedLegend", { count: purchasedPlaces })}
              />
            </div>
          </div>

          <Progress
            value={purchasedPlaces > 0 ? (assignedCount / purchasedPlaces) * 100 : 0}
            color="bg-brand-600"
            bg="bg-neutral-100"
            aria-label={t("progressLabel")}
            aria-valuenow={assignedCount}
            aria-valuemin={0}
            aria-valuemax={purchasedPlaces}
          />

          <div className="grid w-full grid-cols-5 items-start gap-3 mobile:grid-cols-2">
            {Array.from({ length: purchasedPlaces }, (_, index) => {
              const claim = assignedClaims[index];
              const showSelfAction = index === assignedCount && canAssignSelf;

              return claim ? (
                <div
                  key={claim.id}
                  className="flex min-w-0 flex-col items-start gap-3 self-stretch rounded-md border border-solid border-success-200 bg-brand-50 px-3 py-3"
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-brand-100 text-brand-700">
                        <Typography variant="captionBold">
                          {initialsFromEmail(claim.claimantEmail)}
                        </Typography>
                      </AvatarFallback>
                    </Avatar>
                    <Typography variant="captionSubframe" className="text-brand-700">
                      {t("place", { number: index + 1 })}
                    </Typography>
                  </div>
                  <div className="flex w-full min-w-0 flex-col items-start">
                    <Typography
                      variant="bodyBold"
                      className="w-full truncate text-default-font"
                      title={claim.claimantEmail}
                    >
                      {claim.claimantFullName || claim.claimantEmail}
                    </Typography>
                    <Typography variant="captionSubframe" className="text-subtext-color">
                      {claim.approvedAt
                        ? t("assignedSince", {
                            date: formatQuoteDate(claim.approvedAt, locale),
                          })
                        : t("assigned")}
                    </Typography>
                  </div>
                  {claim.status === "approved" && claim.projectId == null ? (
                    <Button
                      type="button"
                      variant="destructive-tertiary"
                      size="small"
                      className="h-6 rounded-xl md:w-full flex-none"
                      icon={<FeatherUserMinus />}
                      aria-label={t("revokeFor", { email: claim.claimantEmail })}
                      disabled={revokeAssignment.isPending || isAssigning}
                      onClick={() => revokeAssignment.mutate(claim.id)}
                    >
                      {t("revoke")}
                    </Button>
                  ) : null}
                </div>
              ) : (
                <div
                  key={index}
                  className={`flex min-w-0 flex-col items-start gap-2 self-stretch rounded-md border-2 border-dashed bg-default-background px-3 py-3 ${
                    showSelfAction ? "border-brand-300" : "border-neutral-300"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-neutral-400">
                      <FeatherPlus className="size-3 text-subtext-color" aria-hidden="true" />
                    </span>
                    <Typography
                      variant="captionSubframe"
                      className={showSelfAction ? "text-brand-700" : "text-subtext-color"}
                    >
                      {t("place", { number: index + 1 })}
                    </Typography>
                  </div>
                  {showSelfAction ? (
                    <>
                      <Button
                        type="button"
                        variant="brand-secondary"
                        size="small"
                        className="h-6 rounded-2xl md:w-full flex-none"
                        icon={<FeatherUserPlus />}
                        loading={isAssigning}
                        disabled={revokeAssignment.isPending}
                        onClick={() => assignSelf.mutate()}
                      >
                        {t("assignSelf")}
                      </Button>
                      <CompactSelect
                        className="md:w-full rounded-2xl"
                        leadingIcon={<FeatherUsers className="size-3" />}
                        loading={isAssigning}
                        options={assignmentOptions}
                        placeholder={t("assignApproved")}
                        onValueChange={(claimantUserId) =>
                          assignDirectly.mutate(Number(claimantUserId))
                        }
                      />
                    </>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <Typography variant="bodyBold" className="text-subtext-color">
                        {t("available")}
                      </Typography>
                      <Typography variant="captionSubframe" className="text-subtext-color">
                        {t("unassigned")}
                      </Typography>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {detailQuery.isError ? (
            <Typography role="alert" variant="captionSubframe" className="text-error-700">
              {t("refreshError")}
            </Typography>
          ) : null}
          {assignmentError ? (
            <Typography role="alert" variant="captionSubframe" className="text-error-700">
              {assignmentError instanceof SubscriptionApiError &&
              assignmentError.status === 409 &&
              !["SUBSCRIPTION_EXPIRED", "SUBSCRIPTION_UNPAID", "SUBSCRIPTION_NOT_STARTED"].includes(
                assignmentError.code ?? ""
              )
                ? t("capacityError")
                : t("assignError")}
            </Typography>
          ) : null}
          {revokeAssignment.isError ? (
            <Typography role="alert" variant="captionSubframe" className="text-error-700">
              {t("revokeError")}
            </Typography>
          ) : null}
        </section>
      </CardContent>
    </Card>
  );
}

function CapacityLegend({ colorClassName, label }: { colorClassName: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${colorClassName}`} aria-hidden="true" />
      <Typography variant="captionSubframe" className="text-subtext-color">
        {label}
      </Typography>
    </div>
  );
}

function initialsFromEmail(email: string) {
  return email.split("@")[0].slice(0, 2).toUpperCase();
}

function uniqueInvitees(assignments: CollectivitySubscriptionDetail["assignments"]) {
  const invitees = new Map<number, CollectivitySubscriptionDetail["assignments"][number]>();

  for (const assignment of assignments) {
    if (assignment.source === "invite_link" && assignment.claimantUserId != null) {
      invitees.set(assignment.claimantUserId, assignment);
    }
  }

  return [...invitees.values()];
}
