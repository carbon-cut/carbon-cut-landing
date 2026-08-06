"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import { AuthProvider } from "@/lib/auth/auth-context";
import { isMockBackendEnabled } from "@/mocks/config";
import { worker } from "@/mocks/worker";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

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

  useEffect(() => {
    try {
      broadcastQueryClient({
        queryClient,
        broadcastChannel: "carbon-cut",
      });
    } catch {
      // Cross-tab sync is best-effort only.
    }
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
