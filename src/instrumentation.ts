import { isMockBackendEnabled } from "@/mocks/config";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && isMockBackendEnabled()) {
    const { server } = await import("./mocks/server");
    server.listen();
  }
}
