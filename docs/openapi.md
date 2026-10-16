# Backend OpenAPI types

The backend owns the source contract in `carbon-cut-backend/openapi/openapi.yaml`. This repository commits a copy at `openapi/backend.yaml` so local type generation does not require another checkout. CI checks the copy against the backend repository. `src/generated/backend-api.ts` contains request and response types generated from that copy. Do not edit either frontend file by hand.

Run `npm run api:sync` from this repository after changing the backend contract. The command copies the sibling backend source and generates types. Set `BACKEND_OPENAPI_FILE` to the YAML path when the backend checkout is elsewhere. Run `npm run api:check` to verify generated types match the committed copy; CI runs this check.

Run `npm run api:check:source` to compare the committed copy with the sibling backend source. Frontend CI runs on pushes to `main` and `develop` and on pull requests targeting either branch. For a pull request from an `integrate/<feature>` branch, CI prefers the backend branch with that same name and falls back to the backend target branch if the paired branch has been removed. Create and push the paired backend branch before opening the frontend pull request. Merge the backend pull request first; after the frontend change lands, default-branch CI checks against the backend target branch.

The same CI job checks that this repository's cross-repository coordination skill matches the copy on the selected backend branch. Run `npm run skills:check-cross-repo` locally, setting `CROSS_REPO_SKILL_FILE` when the backend checkout is not at the sibling default path.

Because the backend repository is private, configure a **frontend repository Actions secret** named `BACKEND_CONTRACT_READ_TOKEN` with read-only `Contents` access to `carbon-cut/carbon-cut-backend`. A value in `.env.local` is only available to local processes and does not configure GitHub Actions.

Current coverage is limited to collectivity project list, initialization, setup edit, current inventory read, and inventory draft save. The existing Next.js API routes remain the browser boundary. Feature code retains its own TanStack Query keys, fetchers, and form schemas. Use generated operation types for covered network payloads, and add more operations to the backend contract only after checking the actual route and response mapper.
