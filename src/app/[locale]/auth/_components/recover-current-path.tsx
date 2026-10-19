"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { buildRecoveryRedirect } from "@/lib/auth/redirect";
import { useScopedI18n } from "@/locales/client";

export default function RecoverCurrentPath() {
  const router = useRouter();
  const t = useScopedI18n("(auth).common");

  useEffect(() => {
    router.replace(
      buildRecoveryRedirect(
        window.location.pathname + window.location.search + window.location.hash
      )
    );
  }, [router]);

  return <p>{t("message.loading")}</p>;
}
