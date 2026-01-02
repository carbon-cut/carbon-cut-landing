import { Car, Clock, Leaf, ShieldCheck, Zap } from "lucide-react";

type Props = {
  variant: "duration" | "sections" | "results";
  label?: string;
};

export default function PreAssessmentVisual({ variant, label }: Props) {
  if (variant === "sections") {
    return (
      <div className="flex min-h-[120px] w-full items-center justify-center" aria-hidden="true">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-section-transport/10">
            <Car className="h-5 w-5 text-section-transport" />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-section-transport/10">
            <Zap className="h-5 w-5 text-section-transport" />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-section-transport/10">
            <Leaf className="h-5 w-5 text-section-transport" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "results") {
    return (
      <div
        className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-section-transport/20 bg-section-transport/10"
        aria-hidden="true"
      >
        <ShieldCheck className="h-10 w-10 text-section-transport" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2" aria-hidden="true">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-section-transport/20 bg-section-transport/10">
        <Clock className="h-10 w-10 text-section-transport" />
      </div>
      {label ? <span className="text-xs font-semibold text-primary">{label}</span> : null}
    </div>
  );
}
