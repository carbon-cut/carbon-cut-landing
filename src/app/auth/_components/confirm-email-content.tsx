"use client";

import React from "react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthBrand from "@/app/auth/_components/auth-brand";
import { getErrorCode, isUpstreamAuthError, postAuth } from "@/app/auth/_components/auth-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { sanitizeReturnTo } from "@/lib/auth/redirect";
import { useAuth } from "@/lib/auth/auth-context";
import { useScopedI18n } from "@/locales/client";

export function ConfirmEmailPageContent() {
  const t = useScopedI18n("(auth).verify");
  const tCommon = useScopedI18n("(auth).common");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refetchSession } = useAuth();
  const email = searchParams.get("email") ?? "";
  const [confirmation, setConfirmation] = useState("");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<"confirm" | "resend" | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting("confirm");
    setErrorMessage(null);
    setInfoMessage(null);

    const result = await postAuth<{ authenticated: true; user: { email: string } }>(
      "/api/auth/email-confirmation",
      {
        email,
        confirmation,
      }
    );

    setSubmitting(null);

    if (!result.ok) {
      if (isUpstreamAuthError(result.error)) {
        setErrorMessage(tCommon("error.unavailable"));
        return;
      }

      const code = getErrorCode(result.error);

      if (code === "AUTH_INVALID_EMAIL_CONFIRMATION_TOKEN") {
        setErrorMessage(t("error.invalidToken"));
        return;
      }

      if (code === "AUTH_USER_BLOCKED") {
        setErrorMessage(t("error.blocked"));
        return;
      }

      setErrorMessage(result.error.error?.message ?? t("error.genericConfirm"));
      return;
    }

    await refetchSession();
    const returnTo = sanitizeReturnTo(searchParams.get("returnTo"));
    router.push(returnTo ?? "/form");
  }

  async function handleResend() {
    setSubmitting("resend");
    setErrorMessage(null);
    setInfoMessage(null);

    const result = await postAuth<{ email: string; sent: true }>("/api/auth/resend-confirmation", {
      email,
    });

    setSubmitting(null);

    if (!result.ok) {
      if (isUpstreamAuthError(result.error)) {
        setErrorMessage(tCommon("error.unavailable"));
        return;
      }

      const code = getErrorCode(result.error);

      if (code === "AUTH_EMAIL_ALREADY_CONFIRMED") {
        router.push("/auth/sign-in");
        return;
      }

      if (code === "AUTH_USER_BLOCKED") {
        setErrorMessage(t("error.blocked"));
        return;
      }

      setErrorMessage(result.error.error?.message ?? t("error.genericResend"));
      return;
    }

    setInfoMessage(t("message.sent"));
  }

  return (
    <section aria-labelledby="confirm-title" className="mx-auto w-full">
      <div className="mx-auto mb-7 mt-1 w-fit">
        <AuthBrand />
      </div>
      <div>
        <Typography asChild variant="title" size="md">
          <h1 id="confirm-title">{t("title")}</h1>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mt-2">
          <p>{t("description")}</p>
        </Typography>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Alert>
            <AlertTitle>{t("title")}</AlertTitle>
            <AlertDescription>{t("message.email", { email })}</AlertDescription>
          </Alert>
          {infoMessage ? (
            <Alert variant="success">
              <AlertTitle>{t("form.reset")}</AlertTitle>
              <AlertDescription>{infoMessage}</AlertDescription>
            </Alert>
          ) : null}
          {errorMessage ? (
            <Alert variant="destructive">
              <AlertTitle>{t("title")}</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : null}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80" htmlFor="confirmation">
              {t("form.code")}
            </label>
            <Input
              id="confirmation"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={submitting !== null}
              onClick={handleResend}
            >
              {t("form.reset")}
            </Button>
            <Button type="submit" disabled={submitting !== null} className="h-11 flex-1">
              {t("form.submit")}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-secondary">
          <Link href="/auth/sign-in" className="text-primary underline-offset-4 hover:underline">
            {t("link.login")}
          </Link>
        </p>
      </div>
    </section>
  );
}

export function ConfirmEmailPageFallback() {
  const t = useScopedI18n("(auth).verify");

  return (
    <section aria-labelledby="confirm-title-fallback" className="mx-auto w-full">
      <div className="mx-auto mb-7 mt-1 w-fit">
        <AuthBrand />
      </div>
      <div>
        <Typography asChild variant="title" size="md">
          <h1 id="confirm-title-fallback">{t("title")}</h1>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mt-2">
          <p>{t("description")}</p>
        </Typography>
      </div>
    </section>
  );
}
