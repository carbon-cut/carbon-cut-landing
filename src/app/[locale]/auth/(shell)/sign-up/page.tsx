"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getErrorCode,
  isUpstreamAuthError,
  postRegistration,
} from "@/app/[locale]/auth/_components/auth-api";
import AuthBrand from "@/app/[locale]/auth/_components/auth-brand";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { sanitizeReturnTo } from "@/lib/auth/redirect";
import { useScopedI18n } from "@/locales/client";
import {
  getAuthConfirmationRequiredRoute,
  getAuthSignInRoute,
  getHomeRoute,
} from "@/lib/routing/routes";
import { Lightbulb, Rocket, Zap } from "lucide-react";

export default function SignUpPage() {
  const t = useScopedI18n("(auth).signup");
  const tCommon = useScopedI18n("(auth).common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupSchema = z
    .object({
      firstName: z.string().trim().min(1, t("error.firstNameRequired")),
      lastName: z.string().trim().min(1, t("error.lastNameRequired")),
      email: z.string().email(),
      organisation: z.string(),
      password: z.string().min(1),
      passwordConfirmation: z.string().min(1),
    })
    .refine((values) => values.password === values.passwordConfirmation, {
      path: ["passwordConfirmation"],
      message: t("error.passwordMismatch"),
    });
  type SignupValues = z.infer<typeof signupSchema>;
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organisation: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const highlights = Array.from({ length: 3 }).map((_, i) => ({
    title: t(`highlights.items.${i}.title` as Parameters<typeof t>[0]),
    description: t(`highlights.items.${i}.description` as Parameters<typeof t>[0]),
  }));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(values: SignupValues) {
    setErrorMessage(null);

    const result = await postRegistration({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email,
      organisation: values.organisation.trim() || null,
      password: values.password,
    });

    if (!result.ok) {
      if (isUpstreamAuthError(result.error)) {
        setErrorMessage(tCommon("error.unavailable"));
        return;
      }

      const code = getErrorCode(result.error);

      if (code === "AUTH_EMAIL_TAKEN") {
        setErrorMessage(t("error.emailTaken"));
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

      setErrorMessage(t("error.generic"));
      return;
    }

    const returnTo = sanitizeReturnTo(searchParams.get("returnTo"));

    if ("authenticated" in result.data) {
      router.replace(returnTo ?? getHomeRoute());
      return;
    }

    const nextParams = new URLSearchParams({ email: result.data.user.email });

    if (returnTo) {
      nextParams.set("returnTo", returnTo);
    }

    router.replace(getAuthConfirmationRequiredRoute(nextParams));
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

          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-4">
            {errorMessage ? (
              <Alert variant="destructive">
                <AlertTitle>{t("title")}</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            ) : null}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80" htmlFor="firstName">
                {t("form.firstName")}
              </label>
              <Input
                id="firstName"
                autoComplete="given-name"
                required
                aria-invalid={Boolean(form.formState.errors.firstName)}
                {...form.register("firstName")}
              />
              {form.formState.errors.firstName ? (
                <Typography asChild variant="description" size="sm" className="text-destructive">
                  <p role="alert">{form.formState.errors.firstName.message}</p>
                </Typography>
              ) : null}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80" htmlFor="lastName">
                {t("form.lastName")}
              </label>
              <Input
                id="lastName"
                autoComplete="family-name"
                required
                aria-invalid={Boolean(form.formState.errors.lastName)}
                {...form.register("lastName")}
              />
              {form.formState.errors.lastName ? (
                <Typography asChild variant="description" size="sm" className="text-destructive">
                  <p role="alert">{form.formState.errors.lastName.message}</p>
                </Typography>
              ) : null}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80" htmlFor="email">
                {t("form.email")}
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...form.register("email")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80" htmlFor="organisation">
                {t("form.organisation")}
              </label>
              <Input
                id="organisation"
                autoComplete="organization"
                {...form.register("organisation")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80" htmlFor="password">
                {t("form.password")}
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                {...form.register("password")}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground/80"
                htmlFor="passwordConfirmation"
              >
                {t("form.passwordConfirm")}
              </label>
              <Input
                id="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                required
                {...form.register("passwordConfirmation")}
              />
              {form.formState.errors.passwordConfirmation ? (
                <Typography asChild variant="description" size="sm" className="text-destructive">
                  <p role="alert">{form.formState.errors.passwordConfirmation.message}</p>
                </Typography>
              ) : null}
            </div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-3 h-11 w-full"
            >
              {t("form.submit")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary">
            {t("message.login")}{" "}
            <Link
              href={getAuthSignInRoute(sanitizeReturnTo(searchParams.get("returnTo")))}
              className="text-primary underline-offset-4 hover:underline"
            >
              {t("link.login")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
