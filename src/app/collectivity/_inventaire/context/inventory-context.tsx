"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { inventorySchema } from "../schema";
import type { InventoryYear } from "../types";

export type InventoryFormValues = z.infer<typeof inventorySchema>;

type InventoryContextValue = {
  years: InventoryYear[];
  mainForm: UseFormReturn<InventoryFormValues, any, undefined>;
};

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({
  years,
  mainForm,
  children,
}: {
  years: InventoryYear[];
  mainForm: UseFormReturn<InventoryFormValues, any, undefined>;
  children: ReactNode;
}) {
  return (
    <InventoryContext.Provider value={{ years, mainForm }}>{children}</InventoryContext.Provider>
  );
}

export function useInventoryContext() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useInventoryContext must be used within an InventoryProvider");
  }

  return context;
}
