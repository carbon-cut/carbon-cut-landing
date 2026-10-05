import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as prettier from "prettier";

const source = resolve(
  process.env.BACKEND_OPENAPI_FILE ?? "../carbon-cut-backend/openapi/openapi.yaml"
);
const snapshot = resolve("openapi/backend.yaml");

const formatOptions = { ...(await prettier.resolveConfig(snapshot)), parser: "yaml" };
const [sourceContent, snapshotContent] = await Promise.all([
  prettier.format(readFileSync(source, "utf8"), formatOptions),
  prettier.format(readFileSync(snapshot, "utf8"), formatOptions),
]);

if (sourceContent !== snapshotContent) {
  console.error(
    "The frontend OpenAPI snapshot differs from the backend source. Run npm run api:sync."
  );
  process.exitCode = 1;
}
