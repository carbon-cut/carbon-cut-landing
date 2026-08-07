import React from "react";
import { Suspense } from "react";
import {
  ConfirmEmailPageContent,
  ConfirmEmailPageFallback,
} from "@/app/[locale]/auth/_components/confirm-email-content";

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={<ConfirmEmailPageFallback />}>
      <ConfirmEmailPageContent />
    </Suspense>
  );
}
