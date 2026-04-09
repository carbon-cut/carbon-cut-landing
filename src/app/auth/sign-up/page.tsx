"use client";

import React from "react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/app/auth/_components/auth-shell";
import { getErrorCode, isUpstreamAuthError, postAuth } from "@/app/auth/_components/auth-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScopedI18n } from "@/locales/client";

export default function SignUpPage() {
  const t = useScopedI18n("(auth).signup");
  const tCommon = useScopedI18n("(auth).common");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage(t("error.passwordMismatch"));
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const result = await postAuth<{
      user: { email: string };
      confirmation_required: true;
      confirmation_email_sent: true;
    }>("/api/auth/sign-up", {
      username,
      email,
      password,
    });

    setSubmitting(false);

    if (!result.ok) {
      if (isUpstreamAuthError(result.error)) {
        setErrorMessage(tCommon("error.unavailable"));
        return;
      }

      const code = getErrorCode(result.error);

      if (code === "AUTH_REGISTER_IDENTIFIER_TAKEN") {
        setErrorMessage(t("error.identifierTaken"));
        return;
      }

      if (code === "AUTH_REGISTER_DISABLED") {
        setErrorMessage(t("error.disabled"));
        return;
      }

      if (code === "AUTH_DEFAULT_ROLE_NOT_FOUND") {
        setErrorMessage(t("error.defaultRole"));
        return;
      }

      setErrorMessage(result.error.error?.message ?? t("error.generic"));
      return;
    }

    router.push(`/auth/confirmation-required?email=${encodeURIComponent(result.data.user.email)}`);
  }

  return (
    <AuthShell
      title={t("title")}
      description={t("description")}
      footer={
        <>
          {t("message.login")}{" "}
          <Link href="/auth/sign-in" className="text-foreground underline-offset-4 hover:underline">
            {t("link.login")}
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
          <label className="text-sm font-medium text-foreground" htmlFor="username">
            {t("form.username")}
          </label>
          <Input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="email">
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="password">
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="passwordConfirmation">
            {t("form.passwordConfirm")}
          </label>
          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={submitting} className="w-full">
          {t("form.submit")}
        </Button>
      </form>
    </AuthShell>
  );
}
