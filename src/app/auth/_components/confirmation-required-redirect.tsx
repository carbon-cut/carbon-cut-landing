"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useScopedI18n } from "@/locales/client";

export default function ConfirmationRequiredRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useScopedI18n("(auth).common");
  const nextParams = new URLSearchParams();
  const email = searchParams.get("email") ?? "";
  const returnTo = searchParams.get("returnTo") ?? "";

  if (email) nextParams.set("email", email);
  if (returnTo) nextParams.set("returnTo", returnTo);

  const target = `/auth/confirm-email${nextParams.toString() ? `?${nextParams.toString()}` : ""}`;

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <main id="content" className="px-4 py-32 text-center">
      <p className="text-sm text-secondary">
        <Link href={target} className="font-semibold text-foreground underline underline-offset-4">
          {t("cta.continueEmailConfirmation")}
        </Link>
      </p>
    </main>
  );
}
