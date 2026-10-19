import Link from "next/link";
import type { ReactNode } from "react";
import Typography from "@/components/ui/typography";

type NavItemProps = {
  href: string;
  children: ReactNode;
  selected?: boolean;
  tabIndex?: number;
  onClick?: () => void;
};

export default function NavItem({
  href,
  children,
  selected = false,
  tabIndex,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      tabIndex={tabIndex}
      onClick={onClick}
      aria-current={selected ? "page" : undefined}
      className="flex items-center justify-center gap-2 self-center rounded-md px-2 py-1 text-subtext-color hover:text-default-font focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
    >
      <Typography variant={selected ? "bodyBold" : "bodySubframe"}>{children}</Typography>
    </Link>
  );
}
