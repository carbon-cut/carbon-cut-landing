/** An expiry hint for navigation, not proof of authentication. */
export function isAccessTokenCurrent(token: string) {
  try {
    const encoded = token.split(".")[1];
    const payload = JSON.parse(atob(encoded.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
