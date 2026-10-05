import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const source = resolve(
  process.env.BACKEND_OPENAPI_FILE ?? "../carbon-cut-backend/openapi/openapi.yaml"
);
const destination = resolve("openapi/backend.yaml");

mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);
console.log(`Copied ${source} to ${destination}`);
