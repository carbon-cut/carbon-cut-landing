import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve(
  process.env.BACKEND_OPENAPI_FILE ?? "../carbon-cut-backend/openapi/openapi.yaml"
);
const snapshot = resolve("openapi/backend.yaml");

if (!readFileSync(source).equals(readFileSync(snapshot))) {
  console.error(
    "The frontend OpenAPI snapshot differs from the backend source. Run npm run api:sync."
  );
  process.exitCode = 1;
}
