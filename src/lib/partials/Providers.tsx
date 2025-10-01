"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { worker } from "@/mocks/worker";

const Providers = ({ children }: { children: ReactNode }) => {
  
  useEffect(() => {
    worker.start();
  }, []);
  
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
