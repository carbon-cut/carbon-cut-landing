import { Clock, ShieldCheck } from "lucide-react";

type Props = {
  variant: "duration" | "sections" | "results";
  label?: string;
};

export default function PreAssessmentVisual({ variant, label }: Props) {
  const frameClassName = "flex h-24 w-28 items-center justify-center";

  if (variant === "sections") {
    return (
      <div className={frameClassName} aria-hidden="true">
        <div className="">
          <svg viewBox="0 0 300 250" className="h-44 mt-10">
            <g>
              <rect x="40" y="50" width="60" height="100" fill="#ff6034" opacity="0.2" rx="8" />
              <text
                x="70"
                y="110"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="#ff6034"
              >
                🚗
              </text>
            </g>
            <g>
              <rect x="120" y="40" width="60" height="110" fill="#fbbf24" opacity="0.2" rx="8" />
              <text
                x="150"
                y="105"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="#fbbf24"
              >
                ⚡
              </text>
            </g>
            <g>
              <rect x="200" y="60" width="60" height="90" fill="#10b981" opacity="0.2" rx="8" />
              <text
                x="230"
                y="115"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="#10b981"
              >
                🍃
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (variant === "results") {
    return (
      <div className={frameClassName} aria-hidden="true">
        <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-section-transport/20 bg-section-transport/10">
          <ShieldCheck className="h-10 w-10 text-section-transport" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2" aria-hidden="true">
      <div className={frameClassName}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-section-transport/20 bg-section-transport/10">
          <Clock className="h-10 w-10 text-section-transport" />
        </div>
      </div>
      {label ? <span className="text-xs font-semibold text-primary">{label}</span> : null}
    </div>
  );
}
