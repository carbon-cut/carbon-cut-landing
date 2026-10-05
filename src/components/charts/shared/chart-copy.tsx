import Typography from "@/components/ui/typography/typography";

type ChartCopyProps = {
  children: React.ReactNode;
  id?: string;
};

export function ChartTitle({ children, id }: ChartCopyProps) {
  return (
    <Typography asChild id={id} size="md" variant="title">
      <h2>{children}</h2>
    </Typography>
  );
}

export function ChartDescription({ children }: ChartCopyProps) {
  return (
    <Typography asChild size="xs" variant="description">
      <p>{children}</p>
    </Typography>
  );
}
