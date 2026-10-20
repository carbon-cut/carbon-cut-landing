"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  getErrorCode,
  isUpstreamAuthError,
  postAuth,
} from "@/app/[locale]/auth/_components/auth-api";
import AuthBrand from "@/app/[locale]/auth/_components/auth-brand";
import { InventoryFieldInput } from "@/app/[locale]/collectivity/_components/fields";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/forms";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { sanitizeReturnTo } from "@/lib/auth/redirect";
import { useAuth } from "@/lib/auth/auth-context";
import { useScopedI18n } from "@/locales/client";
import {
  getAuthConfirmationRequiredRoute,
  getAuthForgotPasswordRoute,
  getAuthSignUpRoute,
  getHomeRoute,
} from "@/lib/routing/routes";

export function SignInPageContent() {
  const t = useScopedI18n("(auth).login");
  const tCommon = useScopedI18n("(auth).common");
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { refetchSession } = useAuth();
  const signInSchema = z.object({
    identifier: z
      .string()
      .trim()
      .min(1, "Required")
      .email(),
    password: z.string().min(1, "Required"),
  });
  type SignInValues = z.infer<typeof signInSchema>;
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: { identifier: "", password: "" },
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const returnTo = sanitizeReturnTo(searchParams.get("returnTo"));
  const signUpHref = getAuthSignUpRoute(returnTo);

  async function handleSubmit(values: SignInValues) {
    setErrorMessage(null);

    const result = await postAuth<{ authenticated: true; user: { email: string } }>(
      "/api/auth/sign-in",
      {
        identifier: values.identifier,
        password: values.password,
      }
    );

    if (!result.ok) {
      if (isUpstreamAuthError(result.error)) {
        setErrorMessage(tCommon("error.unavailable"));
        return;
      }

      const code = getErrorCode(result.error);

      if (code === "AUTH_EMAIL_CONFIRMATION_REQUIRED") {
        router.replace(
          getAuthConfirmationRequiredRoute(
            new URLSearchParams({
              email: values.identifier,
              ...(searchParams.get("returnTo")
                ? { returnTo: searchParams.get("returnTo") as string }
                : {}),
            })
          )
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

      setErrorMessage(t("error.generic"));
      return;
    }

    queryClient.clear();
    await refetchSession();
    router.replace(returnTo ?? getHomeRoute());
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

        {searchParams.get("reason") === "expired" ? (
          <Alert className="mt-4">
            <AlertDescription>{t("sessionExpired")}</AlertDescription>
          </Alert>
        ) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-4">
            {errorMessage ? (
              <Alert variant="destructive">
                <AlertTitle>{t("title")}</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            ) : null}
            <InventoryFieldInput
              form={form}
              name="identifier"
              label={t("form.email")}
              type="email"
              autoComplete="email"
              required
            />
            <InventoryFieldInput
              form={form}
              name="password"
              label={t("form.password")}
              type="password"
              autoComplete="current-password"
              required
            />
            <div className="flex justify-end">
              <Link
                href={getAuthForgotPasswordRoute()}
                className="text-sm text-foreground/90 underline-offset-4 hover:underline"
              >
                {t("link.forgetPassword")}
              </Link>
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting} className="h-11 w-full">
              {t("form.submit")}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-secondary">
          {t("message.signup")}{" "}
          <Link href={signUpHref} className="text-primary underline-offset-4 hover:underline">
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
