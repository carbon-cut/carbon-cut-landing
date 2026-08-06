import type {
  AuthErrorCode,
  AuthErrorPayload,
  AuthSessionResponse,
  AuthUser,
  ChangePasswordRequest,
  EmailConfirmationRequest,
  ForgotPasswordRequest,
  RegistrationPendingResponse,
  ResetPasswordRequest,
  ResendConfirmationRequest,
  SignInRequest,
  SignUpRequest,
} from "@/lib/auth/types";

type MockUserRecord = AuthUser & {
  password: string;
  confirmationToken: string;
  resetCode: string;
};

const defaultPassword = "123";
const defaultConfirmationToken = "123456";
const defaultResetCode = "654321";

const users = new Map<string, MockUserRecord>();
const refreshTokens = new Map<string, string>();
const accessTokens = new Map<string, string>();
let nextUserId = 1000;

function buildError(status: number, message: string, code: AuthErrorCode): AuthErrorPayload {
  return {
    error: {
      status,
      name: "MockAuthError",
      message,
      details: {
        code,
      },
    },
  };
}

function makeSession(user: AuthUser): AuthSessionResponse {
  const access_token = `mock-access-${user.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const refresh_token = `mock-refresh-${user.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  refreshTokens.forEach((email, token) => {
    if (email === user.email) {
      refreshTokens.delete(token);
    }
  });

  accessTokens.forEach((email, token) => {
    if (email === user.email) {
      accessTokens.delete(token);
    }
  });

  refreshTokens.set(refresh_token, user.email);
  accessTokens.set(access_token, user.email);

  return {
    access_token,
    refresh_token,
    user,
  };
}

function publicUser(record: MockUserRecord): AuthUser {
  const {
    password: _password,
    confirmationToken: _confirmationToken,
    resetCode: _resetCode,
    ...user
  } = record;
  return user;
}

function requireUser(email: string) {
  return users.get(email.toLowerCase()) ?? null;
}

function ensureSeedUsers() {
  if (users.size > 0) return;

  const seed = [
    {
      id: 1,
      username: "demo-user",
      email: "demo@example.com",
      provider: "local",
      confirmed: true,
      blocked: false,
      password: defaultPassword,
      confirmationToken: defaultConfirmationToken,
      resetCode: defaultResetCode,
    },
    {
      id: 2,
      username: "pending-user",
      email: "pending@example.com",
      provider: "local",
      confirmed: false,
      blocked: false,
      password: defaultPassword,
      confirmationToken: defaultConfirmationToken,
      resetCode: defaultResetCode,
    },
    {
      id: 3,
      username: "blocked-user",
      email: "blocked@example.com",
      provider: "local",
      confirmed: true,
      blocked: true,
      password: defaultPassword,
      confirmationToken: defaultConfirmationToken,
      resetCode: defaultResetCode,
    },
  ] satisfies MockUserRecord[];

  seed.forEach((user) => users.set(user.email.toLowerCase(), user));
  nextUserId = 4;
}

ensureSeedUsers();

export class MockAuthError extends Error {
  status: number;
  body: AuthErrorPayload;

  constructor(status: number, message: string, code: AuthErrorCode) {
    super(message);
    this.name = "MockAuthError";
    this.status = status;
    this.body = buildError(status, message, code);
  }
}

export function mockSignIn(body: SignInRequest): AuthSessionResponse {
  const user = requireUser(body.identifier);

  if (!user || user.password !== body.password) {
    throw new MockAuthError(401, "Invalid credentials", "AUTH_INVALID_CREDENTIALS");
  }

  if (user.blocked) {
    throw new MockAuthError(403, "User account blocked", "AUTH_USER_BLOCKED");
  }

  if (!user.confirmed) {
    throw new MockAuthError(403, "Email confirmation required", "AUTH_EMAIL_CONFIRMATION_REQUIRED");
  }

  return makeSession(publicUser(user));
}

export function mockSignUp(body: SignUpRequest): RegistrationPendingResponse {
  const normalizedEmail = body.email.toLowerCase();
  const existingByEmail = requireUser(normalizedEmail);
  const existingByUsername = Array.from(users.values()).find(
    (user) => user.username === body.username
  );

  if (existingByEmail || existingByUsername) {
    throw new MockAuthError(
      400,
      "Email or username already taken",
      "AUTH_REGISTER_IDENTIFIER_TAKEN"
    );
  }

  const user: MockUserRecord = {
    id: nextUserId++,
    username: body.username,
    email: normalizedEmail,
    provider: "local",
    confirmed: false,
    blocked: false,
    password: body.password,
    confirmationToken: defaultConfirmationToken,
    resetCode: defaultResetCode,
  };

  users.set(normalizedEmail, user);

  return {
    user: publicUser(user),
    confirmation_required: true,
    confirmation_email_sent: true,
  };
}

export function mockResendConfirmation(body: ResendConfirmationRequest) {
  const user = requireUser(body.email);

  if (!user) {
    return { email: body.email, sent: true as const };
  }

  if (user.blocked) {
    throw new MockAuthError(403, "User account blocked", "AUTH_USER_BLOCKED");
  }

  if (user.confirmed) {
    throw new MockAuthError(400, "Email already confirmed", "AUTH_EMAIL_ALREADY_CONFIRMED");
  }

  user.confirmationToken = defaultConfirmationToken;
  return { email: user.email, sent: true as const };
}

export function mockConfirmEmail(body: EmailConfirmationRequest): AuthSessionResponse {
  const user = requireUser(body.email);

  if (!user || body.confirmation !== user.confirmationToken) {
    throw new MockAuthError(
      400,
      "Invalid email confirmation token",
      "AUTH_INVALID_EMAIL_CONFIRMATION_TOKEN"
    );
  }

  if (user.blocked) {
    throw new MockAuthError(403, "User account blocked", "AUTH_USER_BLOCKED");
  }

  user.confirmed = true;
  return makeSession(publicUser(user));
}

export function mockForgotPassword(body: ForgotPasswordRequest) {
  const user = requireUser(body.email);

  if (user && !user.blocked) {
    user.resetCode = defaultResetCode;
  }

  return { ok: true as const };
}

export function mockResetPassword(body: ResetPasswordRequest): AuthSessionResponse {
  const user = Array.from(users.values()).find((entry) => entry.resetCode === body.code);

  if (body.password !== body.passwordConfirmation) {
    throw new MockAuthError(400, "Passwords do not match", "AUTH_PASSWORD_CONFIRMATION_MISMATCH");
  }

  if (!user) {
    throw new MockAuthError(400, "Invalid reset password code", "AUTH_INVALID_RESET_PASSWORD_CODE");
  }

  user.password = body.password;
  return makeSession(publicUser(user));
}

export function mockRotateRefreshToken(refreshToken: string): AuthSessionResponse {
  const email = refreshTokens.get(refreshToken);

  if (!email) {
    throw new MockAuthError(401, "Invalid refresh token", "AUTH_INVALID_REFRESH_TOKEN");
  }

  const user = requireUser(email);

  if (!user) {
    throw new MockAuthError(401, "Refresh token revoked", "AUTH_REFRESH_TOKEN_REVOKED");
  }

  refreshTokens.delete(refreshToken);
  return makeSession(publicUser(user));
}

export function mockLogout(refreshToken: string) {
  refreshTokens.delete(refreshToken);
  return { ok: true as const };
}

export function mockChangePassword(
  accessToken: string,
  body: ChangePasswordRequest
): AuthSessionResponse {
  const email = accessTokens.get(accessToken);

  if (!email) {
    throw new MockAuthError(401, "Authentication required", "AUTH_AUTHENTICATION_REQUIRED");
  }

  const user = requireUser(email);

  if (!user) {
    throw new MockAuthError(401, "Authentication required", "AUTH_AUTHENTICATION_REQUIRED");
  }

  if (user.password !== body.currentPassword) {
    throw new MockAuthError(400, "Invalid current password", "AUTH_INVALID_CURRENT_PASSWORD");
  }

  if (body.password !== body.passwordConfirmation) {
    throw new MockAuthError(400, "Passwords do not match", "AUTH_PASSWORD_CONFIRMATION_MISMATCH");
  }

  if (body.password === body.currentPassword) {
    throw new MockAuthError(
      400,
      "New password must differ from current password",
      "AUTH_PASSWORD_REUSE"
    );
  }

  user.password = body.password;
  return makeSession(publicUser(user));
}
