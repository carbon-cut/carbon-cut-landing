"use client";

import React from "react";
import { FormEvent, useState } from "react";
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

export function ResetPasswordPageContent() {
  const tReset = useScopedI18n("(auth).resetPassword");
  const tForgot = useScopedI18n("(auth).forgetPassword");
  const tCommon = useScopedI18n("(auth).common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetchSession } = useAuth();
  const [code, setCode] = useState(searchParams.get("code") ?? "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage(tForgot("error.passwordMismatch"));
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const result = await postAuth<{ authenticated: true; user: { email: string } }>(
      "/api/auth/reset-password",
      {
        code,
        password,
        passwordConfirmation,
      }
    );

    setSubmitting(false);

    if (!result.ok) {
      if (isUpstreamAuthError(result.error)) {
        setErrorMessage(tCommon("error.unavailable"));
        return;
      }

      const codeValue = getErrorCode(result.error);

      if (codeValue === "AUTH_INVALID_RESET_PASSWORD_CODE") {
        setErrorMessage(tForgot("error.invalidCode"));
        return;
      }

      if (codeValue === "AUTH_PASSWORD_CONFIRMATION_MISMATCH") {
        setErrorMessage(tForgot("error.passwordMismatch"));
        return;
      }

      setErrorMessage(result.error.error?.message ?? tReset("error.generic"));
      return;
    }

    await refetchSession();
    const returnTo = sanitizeReturnTo(searchParams.get("returnTo"));
    router.push(returnTo ?? "/form");
  }

  return (
    <section aria-labelledby="reset-title" className="mx-auto w-full">
      <div className="mx-auto mb-7 mt-1 w-fit">
        <AuthBrand />
      </div>
      <div>
        <Typography asChild variant="title" size="md">
          <h1 id="reset-title">{tReset("title")}</h1>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mt-2">
          <p>{tReset("description")}</p>
        </Typography>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMessage ? (
            <Alert variant="destructive">
              <AlertTitle>{tReset("title")}</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : null}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80" htmlFor="code">
              {tReset("form.code")}
            </label>
            <Input
              id="code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80" htmlFor="password">
              {tReset("form.password")}
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80" htmlFor="passwordConfirmation">
              {tReset("form.passwordConfirm")}
            </label>
            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={submitting} className="h-11 w-full">
            {tReset("form.submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}

export function ResetPasswordPageFallback() {
  const tReset = useScopedI18n("(auth).resetPassword");

  return (
    <section aria-labelledby="reset-title-fallback" className="mx-auto w-full">
      <div className="mx-auto mb-7 mt-1 w-fit">
        <AuthBrand />
      </div>
      <div>
        <Typography asChild variant="title" size="md">
          <h1 id="reset-title-fallback">{tReset("title")}</h1>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mt-2">
          <p>{tReset("description")}</p>
        </Typography>
      </div>
    </section>
  );
}
