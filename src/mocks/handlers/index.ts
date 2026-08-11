import { authHandlers } from "./auth";
import { collectivityHandlers } from "./collectivity";
import { householdHandlers } from "./household";

export const handlers = [...authHandlers, ...collectivityHandlers, ...householdHandlers];
