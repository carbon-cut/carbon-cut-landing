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

  it("preserves collectivity returnTo when sign-up redirects to confirmation-required", async () => {
    const SignUpPage = (await import("@/app/[locale]/auth/(shell)/sign-up/page")).default;
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === "returnTo") return "/collectivity/projects/start";
      return null;
    });
    mockPostAuth.mockResolvedValue({
      ok: true,
      data: {
        user: { email: "collectivity-user@example.com" },
        confirmation_required: true,
        confirmation_email_sent: true,
      },
    });

    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText("Nom complet"), {
      target: { value: "Collectivity User" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "collectivity-user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByLabelText("Confirmez le mot de passe"), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Créer un compte" }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        "/auth/confirmation-required?email=collectivity-user%40example.com&returnTo=%2Fcollectivity%2Fstart"
      );
    });
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

  it("shows resend success on the confirm-email page", async () => {
    const ConfirmEmailPage = (await import("@/app/[locale]/auth/(compact)/confirm-email/page"))
      .default;
    mockPostAuth.mockResolvedValue({
      ok: true,
      data: { email: "pending@example.com", sent: true },
    });

    render(<ConfirmEmailPage />);

    expect(screen.queryByLabelText("E-mail")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Renvoyer l'e-mail" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Si le compte existe et n'est pas confirme, un nouvel e-mail a ete envoye."
        )
      ).toBeInTheDocument();
    });
  });

  it("shows invalid token on the confirm-email page", async () => {
    const ConfirmEmailPage = (await import("@/app/[locale]/auth/(compact)/confirm-email/page"))
      .default;
    mockPostAuth.mockResolvedValue({
      ok: false,
      status: 400,
      error: authError("AUTH_INVALID_EMAIL_CONFIRMATION_TOKEN"),
    });
    mockGetErrorCode.mockReturnValue("AUTH_INVALID_EMAIL_CONFIRMATION_TOKEN");

    render(<ConfirmEmailPage />);

    fireEvent.change(screen.getByLabelText("Code de confirmation"), {
      target: { value: "bad-code" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirmer l'e-mail" }));

    await waitFor(() => {
      expect(screen.getByText("Le code de confirmation est invalide.")).toBeInTheDocument();
    });
  });

  it("preserves collectivity returnTo on the confirm-email sign-in link", async () => {
    const ConfirmEmailPage = (await import("@/app/[locale]/auth/(compact)/confirm-email/page"))
      .default;
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === "email") return "pending@example.com";
      if (key === "returnTo") return "/collectivity/projects/start";
      return null;
    });

    render(<ConfirmEmailPage />);

    expect(screen.getByRole("link", { name: "Se connecter" })).toHaveAttribute(
      "href",
      "/auth/sign-in?returnTo=%2Fcollectivity%2Fstart"
    );
  });
});
