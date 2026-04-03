import { logoutAndClearSession } from "@/lib/auth/session";
import { logoutResponse } from "@/lib/auth/response";

export async function POST() {
  await logoutAndClearSession();
  return logoutResponse();
}
