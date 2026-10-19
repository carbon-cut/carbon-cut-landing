import React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ResetPasswordPageContent,
  ResetPasswordPageFallback,
} from "@/app/[locale]/auth/_components/reset-password-content";

export const metadata: Metadata = { referrer: "no-referrer" };

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordPageFallback />}>
      <ResetPasswordPageContent />
    </Suspense>
  );
}
