import type { InventoryFormValues } from "./context/inventory-context";

export function buildInventoryDraftInput(values: InventoryFormValues) {
  const { years: _years, ...inventoryInput } = values;

  return inventoryInput;
}
