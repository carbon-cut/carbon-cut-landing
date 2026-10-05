# Optional split type checks

These TypeScript configs scope checks to parts of the frontend. They were used when a full check consumed too much memory. No package script or CI workflow currently invokes them; the root `tsconfig.json` remains the full project check.

Run a focused check with, for example:

```bash
npx tsc -p config/typecheck/tsconfig.collectivity-check.json --noEmit
```

The household configs cover retired code and are kept only for checking that legacy surface when needed. TypeScript still follows imports from the selected files, so these configs do not isolate every dependency.
