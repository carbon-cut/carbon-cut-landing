import { beforeAll, describe, expect, it } from "vitest";
import {
  AUTH_ACCESS_COOKIE,
  AUTH_REFRESH_COOKIE,
  AUTH_USER_COOKIE,
} from "../../src/lib/auth/constants";
import { CookieJar, ensureIntegrationServicesAvailable, fetchFrontend } from "./auth-helpers";

const integrationCollectivityUser = {
  email:
    process.env.INTEGRATION_COLLECTIVITY_EMAIL ??
    process.env.INTEGRATION_COLLECTIVITY_NEW_EMAIL ??
    "collectivity.new@example.com",
  password: process.env.INTEGRATION_COLLECTIVITY_PASSWORD ?? "123123",
};

type CollectivitySetupPayload = {
  name: string;
  slug: string;
  country: string;
  territory: string;
  referenceYear: number;
  inventoryYears: number[];
  applicability: {
    airport: boolean;
    port: boolean;
    agriculture: boolean;
  };
};

type CollectivitySetupResponse = {
  data: {
    project: {
      id: string;
      slug: string;
      name: string;
      territory: string;
      country: string;
      referenceYear: number;
      inventoryYears: number[];
      currentInventoryId: string;
    };
    currentInventory: {
      projectId: string;
      setupPayload: CollectivitySetupPayload;
      status: "draft";
      inventoryInput: null;
    };
  };
};

describe.sequential("collectivity integration", () => {
  beforeAll(async () => {
    await ensureIntegrationServicesAvailable();
  });

  it("creates a project, reloads setup from backend, and opens inventory", async () => {
    const signInResult = await signInCollectivity(
      integrationCollectivityUser.email,
      integrationCollectivityUser.password
    );
    const jar = signInResult.jar;
    const slug = `it-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const payload: CollectivitySetupPayload = {
      name: `Integration ${slug}`,
      slug,
      country: "TUN",
      territory: `Territory ${slug}`,
      referenceYear: 2023,
      inventoryYears: [2021, 2023],
      applicability: {
        airport: false,
        port: true,
        agriculture: false,
      },
    };

    const createResponse = await fetchFrontend(
      "/api/collectivity/setup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
      jar
    );

    expect(createResponse.status).toBe(200);
    const created = (await createResponse.json()) as CollectivitySetupResponse;
    expect(created.data.project).toEqual(
      expect.objectContaining({
        slug: payload.slug,
        name: payload.name,
        territory: payload.territory,
        country: payload.country,
        referenceYear: payload.referenceYear,
        inventoryYears: payload.inventoryYears,
      })
    );
    expect(created.data.currentInventory).toEqual(
      expect.objectContaining({
        projectId: created.data.project.id,
      })
    );
    expect(created.data.currentInventory.setupPayload).toEqual(payload);
    expect(created.data.currentInventory.status).toBe("draft");
    expect(created.data.currentInventory.inventoryInput).toBeNull();

    const reloadResponse = await fetchFrontend(
      `/api/collectivity/setup?planId=${encodeURIComponent(payload.slug)}`,
      undefined,
      jar
    );

    expect(reloadResponse.status).toBe(200);
    const reloaded = (await reloadResponse.json()) as CollectivitySetupResponse;
    expect(reloaded.data.project.slug).toBe(payload.slug);
    expect(reloaded.data.currentInventory.setupPayload).toEqual(payload);

    const setupPageResponse = await fetchFrontend(
      `/collectivity/${payload.slug}/setup`,
      undefined,
      jar
    );
    expect(setupPageResponse.status).toBe(200);
    expect(setupPageResponse.headers.get("content-type")).toContain("text/html");
    const setupHtml = await setupPageResponse.text();
    expect(setupHtml).toContain(payload.name);
    expect(setupHtml).toContain(payload.slug);
    expect(setupHtml).toContain(payload.territory);

    const inventoryPageResponse = await fetchFrontend(
      `/collectivity/${payload.slug}/inventory`,
      undefined,
      jar
    );
    expect(inventoryPageResponse.status).toBe(200);
    expect(inventoryPageResponse.headers.get("content-type")).toContain("text/html");
    const inventoryHtml = await inventoryPageResponse.text();
    expect(inventoryHtml).toContain("Inventaire");
  });
});

async function signInCollectivity(identifier: string, password: string) {
  const jar = new CookieJar();
  const response = await fetchFrontend(
    "/api/auth/sign-in",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    },
    jar
  );

  expect(response.status).toBe(200);
  const body = (await response.json()) as {
    authenticated: boolean;
    user: { email: string; allowedProducts?: string[] };
  };

  expect(body.authenticated).toBe(true);
  expect(body.user.email).toBe(identifier);
  expect(jar.has(AUTH_ACCESS_COOKIE)).toBe(true);
  expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(true);
  expect(jar.has(AUTH_USER_COOKIE)).toBe(true);

  return {
    jar,
    user: body.user,
  };
}
