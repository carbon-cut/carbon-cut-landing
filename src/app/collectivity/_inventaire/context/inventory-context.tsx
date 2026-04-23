"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { InventoryYear } from "../types";

type InventoryContextValue = {
  years: InventoryYear[];
};

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({
  years,
  children,
}: {
  years: InventoryYear[];
  children: ReactNode;
}) {
  return <InventoryContext.Provider value={{ years }}>{children}</InventoryContext.Provider>;
}

export function useInventoryContext() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useInventoryContext must be used within an InventoryProvider");
  }

  return context;
}
