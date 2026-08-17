import { loadEnvConfig } from "@next/env";
import { createServer } from "@mswjs/http-middleware";

loadEnvConfig(process.cwd());

async function start() {
  const { handlers } = await import("./handlers");
  const strapiUrl = new URL(process.env.BACKEND_URL ?? "http://localhost:1337");
  const port = Number(strapiUrl.port || (strapiUrl.protocol === "https:" ? 443 : 80));

  const server = createServer(...handlers);

  server.listen(port, strapiUrl.hostname, () => {
    console.log(`Mock Strapi listening on ${strapiUrl.origin}`);
  });

  function close() {
    server.close(() => process.exit(0));
  }

  process.once("SIGINT", close);
  process.once("SIGTERM", close);
}

void start();
