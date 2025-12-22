"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { worker } from "@/mocks/worker";

const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    worker.start({
      serviceWorker: {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mockServiceWorker.js`,
      },
    });
  }, []);

  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
