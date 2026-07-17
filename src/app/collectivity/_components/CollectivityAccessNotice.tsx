import Link from "next/link";

import AuthBrand from "@/app/auth/_components/auth-brand";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useScopedServerI18n } from "@/locales/server";

type CollectivityAccessNoticeProps = {
  returnHref: string;
  status?: number;
};

export default function CollectivityAccessNotice({
  returnHref,
  status,
}: CollectivityAccessNoticeProps) {
  const t = useScopedServerI18n("(pages).collectivityDashboard");
  const isAuthenticationIssue = status === 401;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-10 md:px-6">
      <section className="w-full max-w-2xl rounded-[2rem] border border-border bg-card px-5 py-6 shadow-[0_20px_60px_rgba(9,35,31,0.06)] md:px-8 md:py-8">
        <div className="mx-auto mb-7 w-fit">
          <AuthBrand />
        </div>

        <div className="text-center">
          <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
            <p>{t("accessNotice.eyebrow") as string}</p>
          </Typography>
          <Typography asChild variant="title" size="md" className="mt-3">
            <h1>
              {isAuthenticationIssue
                ? (t("accessNotice.authTitle") as string)
                : (t("accessNotice.unavailableTitle") as string)}
            </h1>
          </Typography>
          <Typography asChild variant="description" size="md" className="mt-3">
            <p>
              {isAuthenticationIssue
                ? (t("accessNotice.authDescription") as string)
                : (t("accessNotice.unavailableDescription") as string)}
            </p>
          </Typography>
        </div>

        <Alert className="mt-6">
          <AlertTitle>{t("accessNotice.alertTitle") as string}</AlertTitle>
          <AlertDescription>
            {isAuthenticationIssue
              ? (t("accessNotice.authAlertDescription") as string)
              : (t("accessNotice.unavailableAlertDescription") as string)}
          </AlertDescription>
        </Alert>

        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href={returnHref}>{t("accessNotice.returnAction") as string}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
