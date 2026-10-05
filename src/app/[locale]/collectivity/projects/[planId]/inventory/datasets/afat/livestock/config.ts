import type { InventoryTableColumn, InventoryTableRow } from "../../../types";
import { livestock } from "../../../InventorySchema/afat/config";

type LabelFunc = (...args: [string, ...any]) => string;

export function buildLivestockRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return livestock.keys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: "",
  }));
}

export function buildLivestockManureManagementRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return livestock.manureManagementAnimalKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: "%",
  }));
}

export function buildLivestockManureManagementColumns(
  labelFunc: LabelFunc
): InventoryTableColumn[] {
  return livestock.manureManagementSystemKeys.map((key) => ({
    key,
    label: labelFunc(`manureManagement.systems.${key}`),
    unit: "%",
  }));
}

export function buildPoultryManureManagementRows(labelFunc: LabelFunc): InventoryTableRow[] {
  return livestock.poultryManureManagementAnimalKeys.map((key) => ({
    key,
    label: labelFunc(`rows.${key}`),
    unit: "%",
  }));
}

export function buildPoultryManureManagementColumns(labelFunc: LabelFunc): InventoryTableColumn[] {
  return livestock.poultryManureManagementSystemKeys.map((key) => ({
    key,
    label: labelFunc(`poultryManureManagement.systems.${key}`),
    unit: "%",
  }));
}
