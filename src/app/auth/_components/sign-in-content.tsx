"use client";

import React from "react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthShell from "@/app/auth/_components/auth-shell";
import { getErrorCode, isUpstreamAuthError, postAuth } from "@/app/auth/_components/auth-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sanitizeReturnTo } from "@/lib/auth/redirect";
import { useAuth } from "@/lib/auth/auth-context";
import { useScopedI18n } from "@/locales/client";

export function SignInPageContent() {
  const t = useScopedI18n("(auth).login");
  const tCommon = useScopedI18n("(auth).common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetchSession } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const result = await postAuth<{ authenticated: true; user: { email: string } }>(
      "/api/auth/sign-in",
      {
        identifier,
        password,
      }
    );

    setSubmitting(false);

    if (!result.ok) {
      if (isUpstreamAuthError(result.error)) {
        setErrorMessage(tCommon("error.unavailable"));
        return;
      }

      const code = getErrorCode(result.error);

      if (code === "AUTH_EMAIL_CONFIRMATION_REQUIRED") {
        router.push(
          `/auth/confirmation-required?email=${encodeURIComponent(identifier)}${searchParams.get("returnTo") ? `&returnTo=${encodeURIComponent(searchParams.get("returnTo") as string)}` : ""}`
        );
        return;
      }

      if (code === "AUTH_INVALID_CREDENTIALS") {
        setErrorMessage(t("error.invalidCredentials"));
        return;
      }

      if (code === "AUTH_USER_BLOCKED") {
        setErrorMessage(t("error.blocked"));
        return;
      }

      if (code === "AUTH_PROVIDER_DISABLED") {
        setErrorMessage(t("error.providerDisabled"));
        return;
      }

      setErrorMessage(result.error.error?.message ?? t("error.generic"));
      return;
    }

    await refetchSession();
    const returnTo = sanitizeReturnTo(searchParams.get("returnTo"));
    router.push(returnTo ?? "/form");
  }

  return (
    <AuthShell
      title={t("title")}
      description={t("description")}
      footer={
        <>
          {t("message.signup")}{" "}
          <Link href="/auth/sign-up" className="text-primary underline-offset-4 hover:underline">
            {t("link.signup")}
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>{t("title")}</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary" htmlFor="identifier">
            {t("form.email")}
          </label>
          <Input
            id="identifier"
            type="email"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary" htmlFor="password">
            {t("form.password")}
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            {t("link.forgetPassword")}
          </Link>
          <Button type="submit" disabled={submitting}>
            {t("form.submit")}
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}

export function SignInPageFallback() {
  const t = useScopedI18n("(auth).login");

  return (
    <AuthShell title={t("title")} description={t("description")}>
      <></>
    </AuthShell>
  );
}
