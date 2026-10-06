This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tests

Frontend-only tests stay under the default test command:

```bash
npm run test
```

Real frontend/Strapi integration tests run separately:

```bash
npm run test:integration
```

The command verifies the backend's configured test database, starts Strapi with `NODE_ENV=test`, starts Next.js with MSW disabled, waits for both, runs the integration suite and the Chromium browser recovery check, and stops only those two server processes. PostgreSQL and the existing test database remain running. Default factors are not seeded or checked by this command.

The backend must be checked out next to the frontend at `../carbon-cut-backend`, or `INTEGRATION_BACKEND_DIR` must point to it. Its `.env` must contain a complete `DATABASE_TEST_*` connection. The backend owns database verification and refuses to start test mode with a missing or matching normal database name.

Required env vars for the integration suite:

```bash
AUTH_TEST_SUPPORT_KEY=your-test-support-secret
```

The key must match the backend's `AUTH_TEST_SUPPORT_KEY`. The runner uses ports 3001 (frontend) and 1338 (backend) by default; set `INTEGRATION_FRONTEND_PORT` and `INTEGRATION_BACKEND_PORT` to change them. It fails if either port is already occupied.

Install the Playwright browser once with `npx playwright install chromium`. The recovery browser test creates and cleans up its own auth user through the backend test-support HTTP surface. The collectivity project-creation integration test is skipped because project creation now depends on subscriptions; cover that flow with subscription tests.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
