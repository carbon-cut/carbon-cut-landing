import { describe, expect, it } from "vitest";
import { NextRequest, type NextFetchEvent } from "next/server";
import middleware from "@/middleware";

const event = {} as NextFetchEvent;

describe("locale middleware", () => {
  it("selects a supported locale and redirects to the prefix-free URL", async () => {
    const request = new NextRequest("http://localhost/fr/collectivity?source=mail");

    const response = await middleware(request, event);

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("http://localhost/collectivity?source=mail");
    expect(response?.headers.get("set-cookie")).toContain("Next-Locale=fr");
  });

  it("strips an unsupported locale prefix without changing the current locale", async () => {
    const request = new NextRequest("http://localhost/es/collectivity?source=mail", {
      headers: { cookie: "Next-Locale=fr" },
    });

    const response = await middleware(request, event);

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("http://localhost/collectivity?source=mail");
    expect(response?.headers.get("set-cookie")).toBeNull();
  });

  it("selects English and uses it for the prefix-free route", async () => {
    const selection = await middleware(
      new NextRequest("http://localhost/en/collectivity?source=mail"),
      event
    );

    expect(selection?.status).toBe(307);
    expect(selection?.headers.get("location")).toBe("http://localhost/collectivity?source=mail");
    expect(selection?.headers.get("set-cookie")).toContain("Next-Locale=en");

    const page = await middleware(
      new NextRequest("http://localhost/collectivity", {
        headers: { cookie: "Next-Locale=en" },
      }),
      event
    );

    expect(page?.headers.get("x-middleware-rewrite")).toBe("http://localhost/en/collectivity");
  });

  it("serves a prefix-free route through the internal locale rewrite", async () => {
    const request = new NextRequest("http://localhost/collectivity");

    const response = await middleware(request, event);

    expect(response?.status).toBe(200);
    expect(response?.headers.get("location")).toBeNull();
    expect(response?.headers.get("x-middleware-rewrite")).toBe("http://localhost/fr/collectivity");
  });
});
