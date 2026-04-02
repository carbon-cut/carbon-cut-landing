"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth/auth-context";
import { isMockBackendEnabled } from "@/mocks/config";
import { worker } from "@/mocks/worker";

const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (!isMockBackendEnabled()) {
      return;
    }

    worker.start({
      serviceWorker: {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mockServiceWorker.js`,
      },
    });
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
