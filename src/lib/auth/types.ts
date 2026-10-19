import type { components } from "@/generated/backend-api";

export type AuthUser = components["schemas"]["AuthUser"];
export type AuthSessionResponse = components["schemas"]["AuthSession"];
export type RegistrationPendingResponse = components["schemas"]["RegistrationPending"];

export type SessionState =
  | { authenticated: true; user: AuthUser }
  | { authenticated: false; user: null };

export type AuthErrorCode =
  | "AUTH_INVALID_CREDENTIALS"
  | "AUTH_EMAIL_CONFIRMATION_REQUIRED"
  | "AUTH_USER_BLOCKED"
  | "AUTH_PROVIDER_DISABLED"
  | "AUTH_REGISTER_DISABLED"
  | "AUTH_DEFAULT_ROLE_NOT_FOUND"
  | "AUTH_REGISTER_IDENTIFIER_TAKEN"
  | "AUTH_EMAIL_ALREADY_CONFIRMED"
  | "AUTH_INVALID_EMAIL_CONFIRMATION_TOKEN"
  | "AUTH_INVALID_REFRESH_TOKEN"
  | "AUTH_REFRESH_TOKEN_REVOKED"
  | "AUTH_REFRESH_TOKEN_EXPIRED"
  | "AUTH_PASSWORD_CONFIRMATION_MISMATCH"
  | "AUTH_INVALID_RESET_PASSWORD_CODE"
  | "AUTH_AUTHENTICATION_REQUIRED"
  | "AUTH_INVALID_CURRENT_PASSWORD"
  | "AUTH_PASSWORD_REUSE"
  | "AUTH_UPSTREAM_UNAVAILABLE"
  | "AUTH_UPSTREAM_INVALID_RESPONSE";

export type AuthErrorPayload = {
  data?: unknown;
  error?: {
    status?: number;
    name?: string;
    message?: string;
    details?: {
      code?: AuthErrorCode | string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
};

export type SignInRequest = {
  identifier: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  username: string;
  password: string;
};

export type ResendConfirmationRequest = {
  email: string;
};

export type EmailConfirmationRequest = {
  email: string;
  confirmation: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  code: string;
  password: string;
  passwordConfirmation: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

export function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") return false;

  const user = value as Partial<AuthUser>;
  return (
    typeof user.id === "number" &&
    typeof user.firstName === "string" &&
    user.firstName.trim().length > 0 &&
    typeof user.lastName === "string" &&
    user.lastName.trim().length > 0 &&
    typeof user.email === "string" &&
    typeof user.provider === "string" &&
    typeof user.confirmed === "boolean" &&
    typeof user.blocked === "boolean"
  );
}

export function isAuthSessionResponse(value: unknown): value is AuthSessionResponse {
  if (!value || typeof value !== "object") return false;

  const session = value as Partial<AuthSessionResponse>;
  return (
    typeof session.access_token === "string" &&
    session.access_token.length > 0 &&
    typeof session.refresh_token === "string" &&
    session.refresh_token.length > 0 &&
    isAuthUser(session.user)
  );
}

export function isRegistrationPendingResponse(
  value: unknown
): value is RegistrationPendingResponse {
  if (!value || typeof value !== "object") return false;

  const response = value as Partial<RegistrationPendingResponse>;
  return response.confirmation_required === true && response.confirmation_email_sent === true;
}
