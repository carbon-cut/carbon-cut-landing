import Typography from "@/components/ui/typography";

type Props = {
  title: string;
  currentStep: number;
  totalSteps: number;
};

export default function PreAssessmentTitle({ title, currentStep, totalSteps }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Typography asChild variant="title" size="default" className="md:text-4xl font-semibold">
        <h1>{title}</h1>
      </Typography>
      <div className="flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={`step-dot-${index}`}
            className={
              index === currentStep
                ? "h-2 w-10 rounded-full bg-section-transport"
                : "h-2 w-2 rounded-full bg-section-transport/20"
            }
          />
        ))}
      </div>
    </div>
  );
}
