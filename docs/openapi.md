# Backend OpenAPI types

The backend owns the source contract in `carbon-cut-backend/openapi/openapi.yaml`. This repository commits a copy at `openapi/backend.yaml` so local type generation does not require another checkout. CI checks the copy against the backend repository. `src/generated/backend-api.ts` contains request and response types generated from that copy. Do not edit either frontend file by hand.

Run `npm run api:sync` from this repository after changing the backend contract. The command copies the sibling backend source and generates types. Set `BACKEND_OPENAPI_FILE` to the YAML path when the backend checkout is elsewhere. Run `npm run api:check` to verify generated types match the committed copy; CI runs this check.

Run `npm run api:check:source` to compare the committed copy with the sibling backend source. Frontend CI runs on pushes to `main` and `develop` and on pull requests targeting either branch. It checks the backend branch with the same name as the push branch or pull request target. The matching backend contract must reach that branch before the frontend check can pass.

Because the backend repository is private, configure a **frontend repository Actions secret** named `BACKEND_CONTRACT_READ_TOKEN` with read-only `Contents` access to `carbon-cut/carbon-cut-backend`. A value in `.env.local` is only available to local processes and does not configure GitHub Actions.

Current coverage is limited to collectivity project list, initialization, setup edit, current inventory read, and inventory draft save. The existing Next.js API routes remain the browser boundary. Feature code retains its own TanStack Query keys, fetchers, and form schemas. Use generated operation types for covered network payloads, and add more operations to the backend contract only after checking the actual route and response mapper.
