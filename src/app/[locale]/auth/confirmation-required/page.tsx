import { redirect } from "next/navigation";
import { getAuthConfirmEmailRoute } from "@/lib/routing/routes";

export default async function ConfirmationRequiredPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const nextParams = new URLSearchParams();
  const email = typeof params.email === "string" ? params.email : "";
  const returnTo = typeof params.returnTo === "string" ? params.returnTo : "";

  if (email) nextParams.set("email", email);
  if (returnTo) nextParams.set("returnTo", returnTo);

  redirect(getAuthConfirmEmailRoute(nextParams));
}
