import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";

import { mockSignIn } from "@/mocks/auth";
import {
  MOCK_SUBSCRIPTION_ID,
  resetMockCollectivitySubscription,
} from "@/mocks/collectivity-subscription";
import { collectivityHandlers } from "@/mocks/handlers/collectivity";

const origin = "http://localhost:1337";
const server = setupServer(...collectivityHandlers);

function authorizedHeaders() {
  const session = mockSignIn({ identifier: "subTest@example.com", password: "123" });
  return { Authorization: `Bearer ${session.access_token}` };
}

async function responseJson<T>(response: Response) {
  expect(response.ok).toBe(true);
  return (await response.json()) as T;
}

describe.sequential("collectivity subscription mock", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  beforeEach(() => resetMockCollectivitySubscription());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("returns the supported collectivity country codes without authentication", async () => {
    const response = await fetch(`${origin}/api/collectivity/countries`);
    await expect(response.json()).resolves.toEqual({
      data: [
        { code: "FRA", name: "France" },
        { code: "SEN", name: "Senegal" },
        { code: "TUN", name: "Tunisia" },
      ],
    });
  });

  it("authenticates the subscription demo user and serves its paid latest quote", async () => {
    const response = await fetch(`${origin}/api/collectivity/quotes/latest`, {
      headers: authorizedHeaders(),
    });
    const payload = await responseJson<{
      data: {
        status: string;
        subscriptionId: number;
        pricingSnapshot: { selection: { communeQuantity: number } };
      };
    }>(response);

    expect(payload.data.status).toBe("paid");
    expect(payload.data.subscriptionId).toBe(MOCK_SUBSCRIPTION_ID);
    expect(payload.data.pricingSnapshot.selection.communeQuantity).toBe(5);
  });

  it("serves the initial two approved, two denied, and three pending assignments", async () => {
    const response = await fetch(
      `${origin}/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}`,
      {
        headers: authorizedHeaders(),
      }
    );
    const payload = await responseJson<{
      data: {
        credits: { purchased: number; reserved: number; used: number; available: number };
        assignments: Array<{ status: string }>;
      };
    }>(response);

    expect(payload.data.credits).toEqual({ purchased: 5, reserved: 2, used: 0, available: 3 });
    expect(payload.data.assignments.filter((claim) => claim.status === "approved")).toHaveLength(2);
    expect(payload.data.assignments.filter((claim) => claim.status === "denied")).toHaveLength(2);
    expect(payload.data.assignments.filter((claim) => claim.status === "pending")).toHaveLength(3);
  });

  it("updates subscription state through approve, deny, direct assignment, self assignment, and revoke", async () => {
    const headers = authorizedHeaders();
    const post = (path: string, body?: unknown) =>
      fetch(`${origin}${path}`, {
        method: "POST",
        headers: {
          ...headers,
          ...(body ? { "Content-Type": "application/json" } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

    expect(
      (await post(`/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claims/505/approve`))
        .status
    ).toBe(200);
    expect(
      (await post(`/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claims/506/deny`)).status
    ).toBe(200);
    expect(
      (await post(`/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/self-claims`)).status
    ).toBe(200);
    const available = await fetch(`${origin}/api/collectivity/subscription-claims/available`, {
      headers,
    });
    await expect(available.json()).resolves.toEqual(
      expect.objectContaining({
        data: [expect.objectContaining({ source: "self_assignment" })],
      })
    );
    expect(
      (
        await post(`/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claims/direct`, {
          claimantUserId: 207,
        })
      ).status
    ).toBe(200);

    const fullResponse = await fetch(
      `${origin}/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}`,
      { headers }
    );
    const full = await responseJson<{ data: { credits: { available: number; reserved: number } } }>(
      fullResponse
    );
    expect(full.data.credits).toEqual(expect.objectContaining({ reserved: 5, available: 0 }));

    expect(
      (await post(`/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claims/501/revoke`))
        .status
    ).toBe(200);
    const reopenedResponse = await fetch(
      `${origin}/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}`,
      { headers }
    );
    const reopened = await responseJson<{
      data: { credits: { available: number; reserved: number } };
    }>(reopenedResponse);
    expect(reopened.data.credits).toEqual(expect.objectContaining({ reserved: 4, available: 1 }));
  });

  it("rotates and revokes invitation links", async () => {
    const headers = authorizedHeaders();
    const create = () =>
      fetch(`${origin}/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claim-link`, {
        method: "POST",
        headers,
      });

    const first = await responseJson<{ data: { token: string; expiresAt: string } }>(
      await create()
    );
    const second = await responseJson<{ data: { token: string; expiresAt: string } }>(
      await create()
    );
    expect(second.data.token).not.toBe(first.data.token);
    expect(new Date(second.data.expiresAt).getTime()).toBeGreaterThan(Date.now());

    const revokeResponse = await fetch(
      `${origin}/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claim-link`,
      { method: "DELETE", headers }
    );
    expect(revokeResponse.status).toBe(204);
  });

  it("returns a capacity error after all five places are reserved", async () => {
    const headers = authorizedHeaders();
    const post = (path: string) => fetch(`${origin}${path}`, { method: "POST", headers });

    await post(`/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claims/505/approve`);
    await post(`/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claims/506/approve`);
    await post(`/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/claims/507/approve`);

    const response = await post(
      `/api/collectivity/subscriptions/${MOCK_SUBSCRIPTION_ID}/self-claims`
    );
    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      data: null,
      error: {
        status: 409,
        message: "Subscription capacity is full",
        details: { code: "SUBSCRIPTION_CAPACITY_FULL" },
      },
    });
  });
});
