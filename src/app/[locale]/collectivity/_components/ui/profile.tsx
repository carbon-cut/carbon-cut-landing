"use client";

import { CreditCard, Folder, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";
import Typography from "@/components/ui/typography";
import { useAuth } from "@/lib/auth/auth-context";
import {
  getAuthSignInRoute,
  getCollectivitySubscriptionRoute,
  getContactRoute,
} from "@/lib/routing/routes";
import { useScopedI18n } from "@/locales/client";
import { getCollectivityProjectsRoute } from "../../_lib/routing";

type ProfilePopoverContentProps = {
  userName: string;
  side?: "top" | "bottom";
  align?: "start" | "center" | "end";
};

type ProfileActionProps = {
  icon: ReactNode;
  children: ReactNode;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

function ProfileAction({ icon, children, href, onClick }: ProfileActionProps) {
  const className = "w-full justify-start rounded-sm";

  if (href) {
    return (
      <Button asChild variant="neutral-tertiary" size="medium" className={className} icon={icon}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="neutral-tertiary"
      size="medium"
      className={className}
      icon={icon}
      onClick={onClick}
    >
      <Typography variant="bodyBold">{children}</Typography>
    </Button>
  );
}

export function ProfilePopoverContent({
  userName,
  side = "top",
  align = "start",
}: ProfilePopoverContentProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const t = useScopedI18n("(pages).collectivityDashboard");
  const tAuth = useScopedI18n("root.header.userMenu");

  async function handleSignOut() {
    await signOut();
    router.push(getAuthSignInRoute());
  }

  return (
    <PopoverContent side={side} align={align} sideOffset={8} className="w-56 p-1">
      <div className="flex w-full flex-col items-start gap-0.5 px-3 py-2">
        <Typography variant="bodyBold" className="w-full truncate text-default-font">
          {user?.username || userName}
        </Typography>
        {user?.email && (
          <Typography variant="captionSubframe" className="w-full truncate text-subtext-color">
            {user.email}
          </Typography>
        )}
      </div>
      <div className="my-1 h-px w-full bg-border" />
      <ProfileAction
        href={getCollectivitySubscriptionRoute()}
        icon={<CreditCard aria-hidden="true" className="size-4" />}
      >
        {t("profilePopover.subscription")}
      </ProfileAction>
      <ProfileAction
        href={getCollectivityProjectsRoute()}
        icon={<Folder aria-hidden="true" className="size-4" />}
      >
        {t("profilePopover.projects")}
      </ProfileAction>
      <ProfileAction
        href={getContactRoute()}
        icon={<HelpCircle aria-hidden="true" className="size-4" />}
      >
        {t("profilePopover.help")}
      </ProfileAction>
      <div className="my-1 h-px w-full bg-border" />
      <ProfileAction
        icon={<LogOut aria-hidden="true" className="size-4" />}
        onClick={handleSignOut}
      >
        {tAuth("logout")}
      </ProfileAction>
    </PopoverContent>
  );
}
