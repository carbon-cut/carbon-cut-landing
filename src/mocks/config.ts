export function isMockBackendEnabled() {
  return process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_ENABLE_MSW === "true";
}
