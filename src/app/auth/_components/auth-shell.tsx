import React, { type ReactNode } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthShell({ title, description, children, footer }: AuthShellProps) {
  const t = useScopedI18n("(auth).common");

  return (
    <main
      id="content"
      className="min-h-screen bg-[linear-gradient(180deg,hsl(var(--surface-warm))_0%,#ffffff_100%)] px-4 py-24"
    >
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <div className="space-y-3 text-center">
          <Typography asChild variant="title" size="xl">
            <h1>{title}</h1>
          </Typography>
          <Typography asChild variant="description" size="sm">
            <p>{description}</p>
          </Typography>
        </div>
        <Card className="border-primary/10 shadow-lg">
          <CardHeader className="space-y-2 p-6 pb-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">{children}</CardContent>
        </Card>
        {footer ? (
          <div className="text-center text-sm text-secondary">{footer}</div>
        ) : (
          <div className="text-center text-sm text-secondary">
            <Link className="text-primary underline-offset-4 hover:underline" href="/">
              {t("cta.backHome")}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
