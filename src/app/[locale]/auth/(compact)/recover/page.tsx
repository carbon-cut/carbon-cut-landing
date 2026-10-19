"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { recoverBrowserSession } from "@/lib/auth/browser-request";
import { sanitizeReturnTo } from "@/lib/auth/redirect";
import { useAuth } from "@/lib/auth/auth-context";
import { getAuthSignInRoute } from "@/lib/routing/routes";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/components/ui/button";

export default function RecoverPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetchSession, signOut } = useAuth();
  const t = useScopedI18n("(auth).common");
  const [unavailable, setUnavailable] = useState(false);
  const returnTo = sanitizeReturnTo(searchParams.get("returnTo")) ?? "/";

  useEffect(() => {
    let active = true;
    void recoverBrowserSession()
      .then(async (result) => {
        if (!active) return;
        if (result === "recovered") {
          await refetchSession();
          router.replace(returnTo);
        } else if (result === "expired") {
          await signOut();
          const destination = new URL(getAuthSignInRoute(returnTo), window.location.origin);
          destination.searchParams.set("reason", "expired");
          router.replace(destination.pathname + destination.search);
        } else {
          setUnavailable(true);
        }
      })
      .catch(() => {
        if (active) setUnavailable(true);
      });
    return () => {
      active = false;
    };
  }, [refetchSession, returnTo, router, signOut]);

  return unavailable ? (
    <div className="space-y-4">
      <p>{t("error.unavailable")}</p>
      <Button onClick={() => window.location.reload()}>{t("cta.retry")}</Button>
    </div>
  ) : (
    <p>{t("message.loading")}</p>
  );
}
