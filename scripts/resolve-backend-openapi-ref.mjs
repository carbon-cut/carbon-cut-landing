import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const repository = "carbon-cut/carbon-cut-backend";
const token = process.env.BACKEND_CONTRACT_READ_TOKEN;
const output = process.env.GITHUB_OUTPUT;

if (!token || !output) {
  throw new Error("Backend read token and GITHUB_OUTPUT are required");
}

const request = async (path) => {
  const response = await fetch(`https://api.github.com/repos/${repository}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub API returned ${response.status} for ${path}`);
  return response.json();
};

const validateRef = (ref) => {
  if (!/^[A-Za-z0-9._/-]+$/.test(ref) || ref.startsWith("-") || ref.includes("..")) {
    throw new Error(`Invalid backend branch name: ${ref}`);
  }
  return ref;
};

const overrideFile = resolve("openapi/backend-ref.txt");
const override =
  process.env.MANUAL_BACKEND_REF?.trim() ||
  (existsSync(overrideFile) ? readFileSync(overrideFile, "utf8").trim() : "");
const frontendRef = process.env.FRONTEND_REF?.trim();
const baseRef = process.env.BASE_REF?.trim();

let selected;

if (override) {
  selected = validateRef(override);
  if (!(await request(`/branches/${encodeURIComponent(selected)}`))) {
    throw new Error(`Configured backend branch does not exist: ${selected}`);
  }
} else if (
  frontendRef &&
  (await request(`/branches/${encodeURIComponent(validateRef(frontendRef))}`))
) {
  selected = frontendRef;
} else if (baseRef && (await request(`/branches/${encodeURIComponent(validateRef(baseRef))}`))) {
  selected = baseRef;
} else {
  const details = await request("");
  selected = details?.default_branch;
  if (!selected) throw new Error("Cannot determine the backend default branch");
}

appendFileSync(output, `ref=${selected}\n`);
console.log(`Checking backend OpenAPI from branch ${selected}`);
