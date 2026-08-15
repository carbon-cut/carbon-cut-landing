import { cn } from "@/lib/utils";

type ChartContainerProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export default function ChartContainer({ children, className, ...props }: ChartContainerProps) {
  return (
    <section className={cn("rounded-lg border bg-card p-6 py-4 shadow-md", className)} {...props}>
      {children}
    </section>
  );
}
