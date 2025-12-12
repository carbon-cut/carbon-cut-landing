import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
const worker = isBrowser ? setupWorker(...handlers) : { start: () => Promise.resolve() };
export { worker };
