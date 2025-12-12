import Link from "next/link";
import { LucideIcon } from "lucide-react";

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

  return (
    <nav className={`flex flex-col self-start ${className}`} aria-label={ariaLabel ?? title}>
      <HeadingTag className="text-primary-foreground scroll-m-20 text-xl font-sans tracking-tight lg:text-2xl md:mb-3 mb-1">
        {title}
      </HeadingTag>
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
                className="flex items-center gap-2 text-card-primary-muted/80 text-lg px-2 py-1"
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
              className="flex items-center gap-2 text-card-primary-muted/80 text-lg px-2 py-1"
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
