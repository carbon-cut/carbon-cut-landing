import { redirect } from "next/navigation";

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

  redirect(`/auth/confirm-email${nextParams.toString() ? `?${nextParams.toString()}` : ""}`);
}
