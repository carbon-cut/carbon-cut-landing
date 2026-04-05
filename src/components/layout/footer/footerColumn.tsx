import Link from "next/link";
import { LucideIcon } from "lucide-react";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type FooterItem = {
  title: string;
  url: string;
  Icon?: LucideIcon;
  external?: boolean;
};

type FooterColumnProps = {
  title: string;
  items: FooterItem[];
  headingLevel?: "h1" | "h2";
  ariaLabel?: string;
  className?: string;
};

function FooterColumn({
  title,
  items,
  headingLevel = "h1",
  ariaLabel,
  className = "",
}: FooterColumnProps) {
  const HeadingTag = headingLevel;
  const itemClassName =
    "flex items-center gap-2 rounded-md px-2 py-1 text-base text-card-primary-muted/80 transition-colors duration-200 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card-primary";

  return (
    <nav className={cn("flex flex-col self-start", className)} aria-label={ariaLabel ?? title}>
      <Typography
        asChild
        variant="default"
        size="md"
        className="mb-2 text-primary-foreground font-semibold tracking-tight"
      >
        <HeadingTag>{title}</HeadingTag>
      </Typography>
      <div className="grid grid-cols-1 gap-2">
        {items.map((item) => {
          const content = (
            <>
              {item.Icon ? (
                <item.Icon className="h-5 w-5 text-section-transport/80" aria-hidden />
              ) : null}
              <span>{item.title}</span>
            </>
          );

          if (item.external) {
            return (
              <a
                key={item.title}
                className={itemClassName}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.title}
              className={itemClassName}
              href={item.url}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export type { FooterItem, FooterColumnProps };
export default FooterColumn;
