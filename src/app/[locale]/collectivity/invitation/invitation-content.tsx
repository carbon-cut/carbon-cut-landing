"use client";

import {
  FeatherAlertTriangle,
  FeatherCheck,
  FeatherCircleCheck,
  FeatherClock,
  FeatherFolderOpen,
  FeatherHourglass,
  FeatherLink2Off,
  FeatherPauseCircle,
  FeatherRefreshCw,
  FeatherSend,
  FeatherTicket,
  FeatherUserX,
} from "@subframe/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import AuthBrand from "@/app/[locale]/auth/_components/auth-brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { getAuthSignInRoute } from "@/lib/routing/routes";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";

import { formatQuoteDate } from "../pricing/_lib/quotePresentation";
import {
  fetchInvitationClaim,
  fetchInvitationPreview,
  InvitationApiError,
  invitationClaimQueryKey,
  invitationPreviewQueryKey,
  retryInvitationRequest,
  submitInvitationRequest,
} from "./_lib/queries";
import type { CollectivityInvitationClaim, CollectivityInvitationPreview } from "./_lib/types";

type InvitationContentProps = {
  token: string | null;
  claimId: number | null;
  authenticated: boolean;
};
type ViewState =
  | "valid"
  | "pending"
  | "approved"
  | "consumed"
  | "denied"
  | "revoked"
  | "invalid"
  | "expired"
  | "replaced"
  | "disabled";

export default function InvitationContent({
  token,
  claimId,
  authenticated,
}: InvitationContentProps) {
  const t = useScopedI18n("collectivityInvitation");
  const locale = useCurrentLocale();
  const router = useRouter();
  const previewQuery = useQuery({
    queryKey: invitationPreviewQueryKey(token ?? "missing"),
    queryFn: () => fetchInvitationPreview(token!),
    enabled: Boolean(token) && claimId === null,
    retry: false,
  });
  const claimQuery = useQuery({
    queryKey: invitationClaimQueryKey(claimId ?? 0),
    queryFn: () => fetchInvitationClaim(claimId!),
    enabled: claimId !== null,
    retry: false,
  });
  const goToClaim = (id: number) => router.replace(`/collectivity/invitation?claimId=${id}`);
  const request = useMutation({
    mutationFn: () => submitInvitationRequest(token!),
    onSuccess: (claim) => goToClaim(claim.id),
    onError: (error) => {
      if (
        error instanceof InvitationApiError &&
        error.details?.code === "CLAIM_ALREADY_EXISTS" &&
        error.details.claimId
      ) {
        goToClaim(error.details.claimId);
      }
    },
  });
  const retry = useMutation({
    mutationFn: () => retryInvitationRequest(claimId!, token!),
    onSuccess: (claim) => goToClaim(claim.id),
  });

  if (
    (token && claimId === null && previewQuery.isPending) ||
    (claimId !== null && claimQuery.isPending)
  ) {
    return <InvitationSkeleton />;
  }

  const claim = claimQuery.data;
  const preview = claim?.invitation ?? previewQuery.data ?? invalidPreview();
  const state = getViewState(claim, preview, Boolean(token));
  const inviter = claim?.inviter ?? preview.inviter;
  const details = detailRows(state, claim, preview, locale, t);
  const config = stateConfig(state, t);
  const returnTo = token
    ? `/collectivity/invitation?${new URLSearchParams({ token }).toString()}`
    : "/collectivity/invitation";

  return (
    <main id="content" className="min-h-screen bg-black/55 px-4 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card px-6 py-7 shadow-xl md:px-8 md:py-8">
          <div className="mx-auto mb-7 mt-1 w-fit">
            <AuthBrand />
          </div>
          <div className="flex flex-col gap-6">
            {inviter ? <InviterContext inviter={inviter} /> : null}
            <section
              className="flex flex-col items-center gap-3 pt-2 text-center"
              aria-live="polite"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full border ${config.iconClassName}`}
              >
                <config.Icon
                  className={`text-heading-1 font-heading-1 ${config.iconColor}`}
                  aria-hidden="true"
                />
              </div>
              <Badge variant={config.badgeVariant}>
                <config.BadgeIcon className="size-3" aria-hidden="true" />
                {config.badge}
              </Badge>
              <Typography asChild variant="heading2" className="text-center text-default-font">
                <h1>{config.title}</h1>
              </Typography>
              <Typography
                variant="bodySubframe"
                className="max-w-md text-center text-subtext-color"
              >
                {config.description(inviter?.firstName ?? null, inviter?.lastName ?? null)}
              </Typography>
            </section>
            {state !== "invalid" ? <Progress state={state} t={t} /> : null}
            {details.length ? <DetailList details={details} /> : null}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {state === "valid" ? (
              authenticated ? (
                <Button
                  className="w-full"
                  variant="brand-primary"
                  size="large"
                  icon={<FeatherSend />}
                  loading={request.isPending}
                  onClick={() => request.mutate()}
                >
                  {t("request")}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant="brand-primary"
                  size="large"
                  onClick={() => router.push(getAuthSignInRoute(returnTo))}
                >
                  {t("signIn")}
                </Button>
              )
            ) : null}
            {state === "approved" && claim ? (
              <Button
                className="w-full"
                variant="brand-primary"
                size="large"
                icon={<FeatherTicket />}
                onClick={() => router.push(`/collectivity/setup?claimId=${claim.id}`)}
              >
                {t("createProject")}
              </Button>
            ) : null}
            {state === "consumed" && claim?.project ? (
              <Button
                className="w-full"
                variant="neutral-secondary"
                size="large"
                icon={<FeatherFolderOpen />}
                onClick={() => router.push(`/collectivity/${claim.project!.slug}/setup`)}
              >
                {t("openProject")}
              </Button>
            ) : null}
            {state === "denied" && token ? (
              <Button
                className="w-full"
                variant="brand-primary"
                size="large"
                icon={<FeatherRefreshCw />}
                loading={retry.isPending}
                onClick={() => retry.mutate()}
              >
                {t("retry")}
              </Button>
            ) : null}
            {state === "pending" ? (
              <Typography variant="bodySubframe" className="text-center text-subtext-color">
                {t("pendingHelp")}
              </Typography>
            ) : null}
            {(["expired", "replaced", "disabled", "revoked", "denied"] as ViewState[]).includes(
              state
            ) && inviter ? (
              <Typography variant="bodySubframe" className="text-center text-subtext-color">
                {t("contact", { name: `${inviter.firstName} ${inviter.lastName}` })}
              </Typography>
            ) : null}
            {state === "invalid" ? (
              <Button
                className="w-full"
                variant="neutral-secondary"
                size="large"
                onClick={() => router.push("/")}
              >
                {t("home")}
              </Button>
            ) : null}
            {request.isError || retry.isError ? (
              <Typography role="alert" variant="captionSubframe" className="text-error-700">
                {t("error")}
              </Typography>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function InvitationSkeleton() {
  return (
    <main className="min-h-screen bg-black/55 px-4 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
        <Skeleton className="h-96 w-full max-w-md rounded-3xl" />
      </section>
    </main>
  );
}
function InviterContext({
  inviter,
}: {
  inviter: NonNullable<CollectivityInvitationPreview["inviter"]>;
}) {
  const initials = `${inviter.firstName[0] ?? ""}${inviter.lastName[0] ?? ""}`.toUpperCase();
  return (
    <div className="flex w-full items-center gap-3 rounded-sm bg-neutral-50 px-4 py-3">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-brand-100 text-brand-700">
          <Typography variant="captionBold">{initials}</Typography>
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <Typography variant="bodyBold">
          {inviter.firstName} {inviter.lastName} vous invite
        </Typography>
        {inviter.organization ? (
          <Typography variant="captionSubframe" className="text-subtext-color">
            {inviter.organization}
          </Typography>
        ) : null}
      </div>
    </div>
  );
}
function Progress({ state, t }: { state: ViewState; t: ReturnType<typeof useScopedI18n> }) {
  const active =
    state === "valid"
      ? 0
      : state === "pending" || state === "denied"
        ? 2
        : state === "approved" || state === "revoked"
          ? 3
          : 4;
  return (
    <div className="grid grid-cols-4 gap-2">
      {[t("steps.invitation"), t("steps.request"), t("steps.approval"), t("steps.project")].map(
        (label, index) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-caption-bold ${index < active ? "bg-brand-600 text-white" : index === active ? "border-2 border-brand-600 bg-brand-50 text-brand-700" : "border border-neutral-300 bg-default-background text-subtext-color"}`}
            >
              {index < active ? <FeatherCheck className="size-3" /> : index + 1}
            </span>
            <Typography
              variant="captionSubframe"
              className={index <= active ? "text-brand-700" : "text-subtext-color"}
            >
              {label}
            </Typography>
          </div>
        )
      )}
    </div>
  );
}
function DetailList({ details }: { details: Array<[string, string]> }) {
  return (
    <div className="overflow-hidden rounded-sm border border-solid border-neutral-border">
      {details.map(([label, value], index) => (
        <div
          key={label}
          className={`flex items-center justify-between gap-4 px-4 py-2.5 ${index ? "border-t border-solid border-neutral-border" : ""}`}
        >
          <Typography variant="bodySubframe" className="text-subtext-color">
            {label}
          </Typography>
          <Typography variant="bodyBold" className="text-right text-default-font">
            {value}
          </Typography>
        </div>
      ))}
    </div>
  );
}
function invalidPreview(): CollectivityInvitationPreview {
  return {
    state: "invalid",
    inviter: null,
    createdAt: null,
    expiresAt: null,
    stateChangedAt: null,
  };
}
function getViewState(
  claim: CollectivityInvitationClaim | undefined,
  preview: CollectivityInvitationPreview,
  hasToken: boolean
): ViewState {
  if (claim) return claim.status;
  if (!hasToken) return "invalid";
  return preview.state;
}
function detailRows(
  state: ViewState,
  claim: CollectivityInvitationClaim | undefined,
  preview: CollectivityInvitationPreview,
  locale: string,
  t: ReturnType<typeof useScopedI18n>
) {
  const rows: Array<[string, string]> = [];
  const add = (key: string, value: string | null | undefined) => {
    if (value) rows.push([t(key), formatQuoteDate(value, locale)]);
  };
  if (claim) {
    add("details.requested", claim.createdAt);
    add("details.approved", claim.approvedAt);
    add("details.denied", claim.deniedAt);
    add("details.revoked", claim.revokedAt);
    add("details.project", claim.consumedAt);
  } else {
    add("details.created", preview.createdAt);
    if (state === "valid") add("details.expires", preview.expiresAt);
    else add("details.changed", preview.stateChangedAt);
  }
  return rows;
}
function stateConfig(state: ViewState, t: ReturnType<typeof useScopedI18n>) {
  const name = (first: string | null, last: string | null) =>
    [first, last].filter(Boolean).join(" ");
  const configs = {
    valid: {
      Icon: FeatherTicket,
      BadgeIcon: FeatherCircleCheck,
      badgeVariant: "brand",
      iconClassName: "border-success-200 bg-brand-50",
      iconColor: "text-brand-600",
      badge: t("states.valid.badge"),
      title: t("states.valid.title"),
      description: (first: string | null, last: string | null) =>
        t("states.valid.description", { name: name(first, last) }),
    },
    pending: {
      Icon: FeatherClock,
      BadgeIcon: FeatherHourglass,
      badgeVariant: "warning",
      iconClassName: "border-warning-200 bg-warning-50",
      iconColor: "text-warning-600",
      badge: t("states.pending.badge"),
      title: t("states.pending.title"),
      description: () => t("states.pending.description"),
    },
    approved: {
      Icon: FeatherCircleCheck,
      BadgeIcon: FeatherCheck,
      badgeVariant: "success",
      iconClassName: "border-success-200 bg-success-50",
      iconColor: "text-success-700",
      badge: t("states.approved.badge"),
      title: t("states.approved.title"),
      description: () => t("states.approved.description"),
    },
    consumed: {
      Icon: FeatherFolderOpen,
      BadgeIcon: FeatherCheck,
      badgeVariant: "success",
      iconClassName: "border-success-200 bg-success-50",
      iconColor: "text-success-700",
      badge: t("states.consumed.badge"),
      title: t("states.consumed.title"),
      description: () => t("states.consumed.description"),
    },
    denied: {
      Icon: FeatherUserX,
      BadgeIcon: FeatherAlertTriangle,
      badgeVariant: "error",
      iconClassName: "border-error-200 bg-error-50",
      iconColor: "text-error-600",
      badge: t("states.denied.badge"),
      title: t("states.denied.title"),
      description: () => t("states.denied.description"),
    },
    revoked: {
      Icon: FeatherUserX,
      BadgeIcon: FeatherAlertTriangle,
      badgeVariant: "error",
      iconClassName: "border-error-200 bg-error-50",
      iconColor: "text-error-600",
      badge: t("states.revoked.badge"),
      title: t("states.revoked.title"),
      description: () => t("states.revoked.description"),
    },
    invalid: {
      Icon: FeatherLink2Off,
      BadgeIcon: FeatherAlertTriangle,
      badgeVariant: "error",
      iconClassName: "border-error-200 bg-error-50",
      iconColor: "text-error-600",
      badge: t("states.invalid.badge"),
      title: t("states.invalid.title"),
      description: () => t("states.invalid.description"),
    },
    expired: {
      Icon: FeatherHourglass,
      BadgeIcon: FeatherClock,
      badgeVariant: "warning",
      iconClassName: "border-warning-200 bg-warning-50",
      iconColor: "text-warning-600",
      badge: t("states.expired.badge"),
      title: t("states.expired.title"),
      description: () => t("states.expired.description"),
    },
    replaced: {
      Icon: FeatherRefreshCw,
      BadgeIcon: FeatherRefreshCw,
      badgeVariant: "neutral",
      iconClassName: "border-neutral-200 bg-neutral-100",
      iconColor: "text-subtext-color",
      badge: t("states.replaced.badge"),
      title: t("states.replaced.title"),
      description: () => t("states.replaced.description"),
    },
    disabled: {
      Icon: FeatherPauseCircle,
      BadgeIcon: FeatherPauseCircle,
      badgeVariant: "neutral",
      iconClassName: "border-neutral-200 bg-neutral-100",
      iconColor: "text-subtext-color",
      badge: t("states.disabled.badge"),
      title: t("states.disabled.title"),
      description: () => t("states.disabled.description"),
    },
  } as const;
  return configs[state];
}
