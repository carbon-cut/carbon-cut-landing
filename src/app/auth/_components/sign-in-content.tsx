"use client";

import React from "react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getErrorCode, isUpstreamAuthError, postAuth } from "@/app/auth/_components/auth-api";
import AuthBrand from "@/app/auth/_components/auth-brand";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
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
    <section aria-labelledby="signin-title" className="mx-auto w-full">
      <div className="mx-auto mb-7 mt-1 w-fit">
        <AuthBrand />
      </div>
      <div>
        <Typography asChild variant="title" size="md">
          <h1 id="signin-title">{t("title")}</h1>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mt-2">
          <p>{t("description")}</p>
        </Typography>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMessage ? (
            <Alert variant="destructive">
              <AlertTitle>{t("title")}</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : null}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80" htmlFor="identifier">
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
            <label className="text-sm font-medium text-foreground/80" htmlFor="password">
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
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-foreground/90 underline-offset-4 hover:underline"
            >
              {t("link.forgetPassword")}
            </Link>
          </div>
          <Button type="submit" disabled={submitting} className="h-11 w-full">
            {t("form.submit")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary">
          {t("message.signup")}{" "}
          <Link href="/auth/sign-up" className="text-primary underline-offset-4 hover:underline">
            {t("link.signup")}
          </Link>
        </p>
      </div>
    </section>
  );
}

export function SignInPageFallback() {
  const t = useScopedI18n("(auth).login");

  return (
    <section aria-labelledby="signin-title-fallback" className="mx-auto w-full">
      <div className="mx-auto mb-7 mt-1 w-fit">
        <AuthBrand />
      </div>
      <div>
        <Typography asChild variant="title" size="md">
          <h1 id="signin-title-fallback">{t("title")}</h1>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mt-2">
          <p>{t("description")}</p>
        </Typography>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">{t("form.email")}</label>
            <Input type="email" disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">{t("form.password")}</label>
            <Input type="password" disabled />
          </div>
          <Button disabled className="h-11 w-full">
            {t("form.submit")}
          </Button>
        </div>
      </div>
    </section>
  );
}
