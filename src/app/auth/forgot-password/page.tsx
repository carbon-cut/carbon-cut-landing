"use client";

import React from "react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthShell from "@/app/auth/_components/auth-shell";
import { isUpstreamAuthError, postAuth } from "@/app/auth/_components/auth-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <AuthShell
      title={t("title")}
      description={t("description")}
      footer={
        <Link href="/auth/sign-in" className="text-primary underline-offset-4 hover:underline">
          {t("link.login")}
        </Link>
      }
    >
      <div className="space-y-4">
        {errorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>{t("title")}</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}
        {submitted ? (
          <Alert>
            <AlertTitle>{t("message.email")}</AlertTitle>
            <AlertDescription>{t("message.success")}</AlertDescription>
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary" htmlFor="email">
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
          <Button type="submit" disabled={submitting} className="w-full">
            {t("form.submit")}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}
