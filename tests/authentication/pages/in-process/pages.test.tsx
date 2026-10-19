// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AuthErrorPayload } from "@/lib/auth/types";

const {
  mockReplace,
  mockSearchParamsGet,
  mockPostAuth,
  mockGetErrorCode,
  mockIsUpstreamAuthError,
  mockRefetchSession,
} = vi.hoisted(() => ({
  mockReplace: vi.fn(),
  mockSearchParamsGet: vi.fn((key: string): string | null => {
    if (key === "email") return "pending@example.com";
    if (key === "returnTo") return "/form";
    return null;
  }),
  mockPostAuth: vi.fn(),
  mockGetErrorCode: vi.fn(),
  mockIsUpstreamAuthError: vi.fn(() => false),
  mockRefetchSession: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/app/[locale]/auth/_components/auth-brand", () => ({
  default: () => <div>AuthBrand</div>,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: mockReplace,
  }),
  useSearchParams: () => ({
    get: mockSearchParamsGet,
  }),
}));

vi.mock("@/app/[locale]/auth/_components/auth-api", () => ({
  postAuth: mockPostAuth,
  getErrorCode: mockGetErrorCode,
  isUpstreamAuthError: mockIsUpstreamAuthError,
}));

vi.mock("@/locales/client", () => ({
  useScopedI18n: () => (key: string) => key,
}));

vi.mock("@/lib/auth/auth-context", () => ({
  useAuth: () => ({
    refetchSession: mockRefetchSession,
    signOut: vi.fn(),
    status: "unauthenticated",
    user: null,
  }),
}));

function authError(code: string, message = "error"): AuthErrorPayload {
  return {
    error: {
      status: 400,
      message,
      details: {
        code,
      },
    },
  };
}

describe("auth pages", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockSearchParamsGet.mockReset();
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === "email") return "pending@example.com";
      if (key === "returnTo") return "/form";
      return null;
    });
    mockPostAuth.mockReset();
    mockGetErrorCode.mockReset();
    mockIsUpstreamAuthError.mockReset();
    mockIsUpstreamAuthError.mockReturnValue(false);
    mockRefetchSession.mockReset();
  });

  it("shows forgot-password success without backend", async () => {
    const ForgotPasswordPage = (await import("@/app/[locale]/auth/(compact)/forgot-password/page"))
      .default;
    mockPostAuth.mockResolvedValue({
      ok: true,
      data: { ok: true },
    });

    render(<ForgotPasswordPage />);

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "demo@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));

    await waitFor(() => {
      expect(screen.getByText("Consultez votre messagerie")).toBeInTheDocument();
    });
  });

  it("shows forgot-password unavailable instead of fake success on upstream failure", async () => {
    const ForgotPasswordPage = (await import("@/app/[locale]/auth/(compact)/forgot-password/page"))
      .default;
    mockPostAuth.mockResolvedValue({
      ok: false,
      status: 503,
      error: authError("AUTH_UPSTREAM_UNAVAILABLE"),
    });
    mockIsUpstreamAuthError.mockReturnValue(true);

    render(<ForgotPasswordPage />);

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "demo@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Le service d'authentification est indisponible pour le moment. Veuillez reessayer plus tard."
        )
      ).toBeInTheDocument();
    });
    expect(screen.queryByText("Consultez votre messagerie")).not.toBeInTheDocument();
  });
});
