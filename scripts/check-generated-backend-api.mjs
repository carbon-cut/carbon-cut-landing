import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import * as prettier from "prettier";

const schema = resolve("openapi/backend.yaml");
const currentTypes = resolve("src/generated/backend-api.ts");
const temporaryDirectory = mkdtempSync(join(tmpdir(), "carbon-cut-api-check-"));
const generatedTypes = join(temporaryDirectory, "backend-api.ts");

try {
  execFileSync(resolve("node_modules/.bin/openapi-typescript"), [schema, "-o", generatedTypes], {
    stdio: "inherit",
  });

  const formattedTypes = await prettier.format(readFileSync(generatedTypes, "utf8"), {
    ...(await prettier.resolveConfig(currentTypes)),
    filepath: currentTypes,
  });

  if (formattedTypes !== readFileSync(currentTypes, "utf8")) {
    console.error("Generated API types are out of date. Run npm run api:generate.");
    process.exitCode = 1;
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
