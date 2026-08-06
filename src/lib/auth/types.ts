export type AuthUser = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
};

export type AuthSessionResponse = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};

export type RegistrationPendingResponse = {
  user: AuthUser;
  confirmation_required: true;
  confirmation_email_sent: true;
};

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

export function isAuthSessionResponse(value: unknown): value is AuthSessionResponse {
  if (!value || typeof value !== "object") return false;

  const session = value as Partial<AuthSessionResponse>;
  return Boolean(session.access_token && session.refresh_token && session.user?.email);
}

export function isRegistrationPendingResponse(
  value: unknown
): value is RegistrationPendingResponse {
  if (!value || typeof value !== "object") return false;

  const response = value as Partial<RegistrationPendingResponse>;
  return response.confirmation_required === true && response.confirmation_email_sent === true;
}
