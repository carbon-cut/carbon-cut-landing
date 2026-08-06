"use client";

import React from "react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthBrand from "@/app/auth/_components/auth-brand";
import { isUpstreamAuthError, postAuth } from "@/app/auth/_components/auth-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

export default function ForgotPasswordPage() {
  const t = useScopedI18n("(auth).forgetPassword");
  const tCommon = useScopedI18n("(auth).common");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const result = await postAuth<{ ok: true }>("/api/auth/forgot-password", { email });

    setSubmitting(false);

    if (!result.ok && isUpstreamAuthError(result.error)) {
      setErrorMessage(tCommon("error.unavailable"));
      return;
    }

    setSubmitted(true);
  }

  return (
    <section aria-labelledby="forgot-title" className="mx-auto w-full">
      <div className="mx-auto mb-7 mt-1 w-fit">
        <AuthBrand />
      </div>
      <div>
        <Typography asChild variant="title" size="md">
          <h1 id="forgot-title">{t("title")}</h1>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mt-2">
          <p>{t("description")}</p>
        </Typography>

        <div className="mt-6 space-y-4">
          {errorMessage ? (
            <Alert variant="destructive">
              <AlertTitle>{t("title")}</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : null}
          {submitted ? (
            <Alert variant="success">
              <AlertTitle>{t("message.email")}</AlertTitle>
              <AlertDescription>{t("message.success")}</AlertDescription>
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80" htmlFor="email">
                {t("form.email")}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={submitting} className="h-11 w-full">
              {t("form.submit")}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-secondary">
          <Link href="/auth/sign-in" className="text-primary underline-offset-4 hover:underline">
            {t("link.login")}
          </Link>
        </p>
      </div>
    </section>
  );
}
