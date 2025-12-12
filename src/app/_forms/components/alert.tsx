import { Info, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  variant: "note";
  title: string;
  description: string;
}

export function FormAlert({ variant, title, description }: Props) {
  return (
    <Alert
      className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 flex gap-3"
      variant={"destructive"}
      //style={{ backgroundColor: color }}
    >
      <Icon />
      <p className="text-sm text-yellow-800">
        <AlertTitle className="inline-block font-semibold">{title}</AlertTitle>
        <AlertDescription className="inline-block pl-1">{description}</AlertDescription>
      </p>
    </Alert>
  );
}

function Icon() {
  return (
    <div className="flex-shrink-0 mt-0.5">
      <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
