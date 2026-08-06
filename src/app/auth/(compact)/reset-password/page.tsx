import React from "react";
import { Suspense } from "react";
import {
  ResetPasswordPageContent,
  ResetPasswordPageFallback,
} from "@/app/auth/_components/reset-password-content";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordPageFallback />}>
      <ResetPasswordPageContent />
    </Suspense>
  );
}
