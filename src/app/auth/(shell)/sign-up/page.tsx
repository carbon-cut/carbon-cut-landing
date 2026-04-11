"use client";

import React from "react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getErrorCode, isUpstreamAuthError, postAuth } from "@/app/auth/_components/auth-api";
import AuthBrand from "@/app/auth/_components/auth-brand";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { Lightbulb, Rocket, Zap } from "lucide-react";

export default function SignUpPage() {
  const t = useScopedI18n("(auth).signup");
  const tCommon = useScopedI18n("(auth).common");
  const router = useRouter();
  const highlights = t("highlights.items") as { title: string; description: string }[];
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
    <section aria-labelledby="signup-title">
      <div className="mx-auto my-3 block w-fit md:hidden">
        <AuthBrand />
      </div>
      <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,28rem)] md:gap-10">
        <aside aria-label={t("highlights.ariaLabel")} className="mx-auto hidden md:block md:py-0">
          <div className="mx-auto mb-16 w-fit">
            <AuthBrand />
          </div>
          <div className="space-y-10 px-12">
            {highlights.map((highlight, index) => {
              const Icon = [Lightbulb, Rocket, Zap][index] ?? Lightbulb;
              return (
                <article key={highlight.title} className="grid grid-cols-[1.5rem_1fr] gap-4">
                  <Icon className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <Typography asChild variant="subtitle" size="md" className="text-primary">
                      <h2>{highlight.title}</h2>
                    </Typography>
                    <Typography asChild variant="description" size="sm" className="mt-2 max-w-sm">
                      <p>{highlight.description}</p>
                    </Typography>
                  </div>
                </article>
              );
            })}
          </div>
        </aside>

        <div className="rounded-2xl border-0 border-border/40 bg-card p-5 md:border md:p-8 md:shadow-lg">
          <Typography asChild variant="title" size="md">
            <h1 id="signup-title">{t("title")}</h1>
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
              <label className="text-sm font-medium text-foreground/80" htmlFor="username">
                {t("form.fullName")}
              </label>
              <Input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80" htmlFor="passwordConfirmation">
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
            <Button type="submit" disabled={submitting} className="mt-3 h-11 w-full">
              {t("form.submit")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary">
            {t("message.login")}{" "}
            <Link href="/auth/sign-in" className="text-primary underline-offset-4 hover:underline">
              {t("link.login")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
