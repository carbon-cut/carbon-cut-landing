// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AuthErrorPayload } from "@/lib/auth/types";

const {
  mockPush,
  mockSearchParamsGet,
  mockPostAuth,
  mockGetErrorCode,
  mockIsUpstreamAuthError,
  mockRefetchSession,
} = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockSearchParamsGet: vi.fn((key: string) => {
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

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockSearchParamsGet,
  }),
}));

vi.mock("@/app/auth/_components/auth-api", () => ({
  postAuth: mockPostAuth,
  getErrorCode: mockGetErrorCode,
  isUpstreamAuthError: mockIsUpstreamAuthError,
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
    mockPush.mockReset();
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

  it("shows invalid credentials on the sign-in page", async () => {
    const SignInPage = (await import("@/app/auth/sign-in/page")).default;
    mockPostAuth.mockResolvedValue({
      ok: false,
      status: 401,
      error: authError("AUTH_INVALID_CREDENTIALS"),
    });
    mockGetErrorCode.mockReturnValue("AUTH_INVALID_CREDENTIALS");

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "demo@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Connexion" }));

    await waitFor(() => {
      expect(screen.getByText("Identifiants invalides.")).toBeInTheDocument();
    });
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("shows service unavailable on the sign-in page for upstream failures", async () => {
    const SignInPage = (await import("@/app/auth/sign-in/page")).default;
    mockPostAuth.mockResolvedValue({
      ok: false,
      status: 503,
      error: authError("AUTH_UPSTREAM_UNAVAILABLE"),
    });
    mockIsUpstreamAuthError.mockReturnValue(true);

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "demo@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Connexion" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Le service d'authentification est indisponible pour le moment. Veuillez reessayer plus tard."
        )
      ).toBeInTheDocument();
    });
  });

  it("redirects sign-in to confirmation-required when email confirmation is needed", async () => {
    const SignInPage = (await import("@/app/auth/sign-in/page")).default;
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === "returnTo") return "/form";
      return null;
    });
    mockPostAuth.mockResolvedValue({
      ok: false,
      status: 403,
      error: authError("AUTH_EMAIL_CONFIRMATION_REQUIRED"),
    });
    mockGetErrorCode.mockReturnValue("AUTH_EMAIL_CONFIRMATION_REQUIRED");

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "pending@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Connexion" }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        "/auth/confirmation-required?email=pending%40example.com&returnTo=%2Fform"
      );
    });
  });

  it("shows forgot-password success without backend", async () => {
    const ForgotPasswordPage = (await import("@/app/auth/forgot-password/page")).default;
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
    const ForgotPasswordPage = (await import("@/app/auth/forgot-password/page")).default;
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
    const ConfirmEmailPage = (await import("@/app/auth/confirm-email/page")).default;
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
    const ConfirmEmailPage = (await import("@/app/auth/confirm-email/page")).default;
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
});
