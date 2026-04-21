import { Suspense } from "react";
import Link from "next/link";
import ConfirmationRequiredRedirect from "@/app/auth/_components/confirmation-required-redirect";
import { useScopedServerI18n } from "@/locales/server";

export default function ConfirmationRequiredPage() {
  const t = useScopedServerI18n("(auth).common");
  return (
    <Suspense
      fallback={
        <main id="content" className="px-4 py-32 text-center">
          <p className="text-sm text-secondary">
            <Link
              href="/auth/confirm-email"
              className="font-semibold text-foreground underline underline-offset-4"
            >
              {t("cta.continueEmailConfirmation")}
            </Link>
          </p>
        </main>
      }
    >
      <ConfirmationRequiredRedirect />
    </Suspense>
  );
}
