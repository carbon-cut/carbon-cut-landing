"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues, type Resolver } from "react-hook-form";

import { createInventorySchema, type InventorySchemaContext } from "./InventorySchema";
import type { InventoryFormValues } from "./context/inventory-context";

export function useInventoryForm(
  defaultValues: DefaultValues<InventoryFormValues>,
  schemaContext: InventorySchemaContext
) {
  return useForm<InventoryFormValues>({
    resolver: zodResolver(createInventorySchema(schemaContext)) as Resolver<InventoryFormValues>,
    defaultValues,
    mode: "onChange",
    shouldUnregister: false,
  });
}
