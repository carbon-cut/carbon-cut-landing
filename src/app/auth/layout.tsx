import type { ReactNode } from "react";

import { redirectAuthenticatedUserFromAuth } from "@/lib/auth/access";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  await redirectAuthenticatedUserFromAuth();

  return children;
}
