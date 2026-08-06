import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type CollectivityBulletTone = "primary" | "muted" | "accent";

const bulletToneClassName: Record<CollectivityBulletTone, string> = {
  primary: "bg-primary",
  muted: "bg-foreground/70",
  accent: "bg-accent",
};

type CollectivityBulletListProps = {
  items: string[];
  tone?: CollectivityBulletTone;
  className?: string;
};

export default function CollectivityBulletList({
  items,
  tone = "primary",
  className,
}: CollectivityBulletListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={cn("mt-3 h-1.5 w-1.5 shrink-0 rounded-full", bulletToneClassName[tone])}
          />
          <Typography asChild variant="body" size="body">
            <span>{item}</span>
          </Typography>
        </li>
      ))}
    </ul>
  );
}
