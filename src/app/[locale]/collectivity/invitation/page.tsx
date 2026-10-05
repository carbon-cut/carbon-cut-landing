import { getServerSession } from "@/lib/auth/session";
import InvitationContent from "./invitation-content";

export default async function CollectivityInvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; claimId?: string }>;
}) {
  const params = await searchParams;
  const claimId = Number(params.claimId);
  const session = await getServerSession();
  return (
    <InvitationContent
      token={params.token?.trim() || null}
      claimId={Number.isSafeInteger(claimId) && claimId > 0 ? claimId : null}
      authenticated={session.authenticated}
    />
  );
}
