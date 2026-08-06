import React from "react";
import { Suspense } from "react";
import { SignInPageContent, SignInPageFallback } from "@/app/auth/_components/sign-in-content";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInPageFallback />}>
      <SignInPageContent />
    </Suspense>
  );
}
