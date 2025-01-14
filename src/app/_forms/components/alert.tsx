import { Info, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  variant: "note";
  title: string;
  description: string;
}

export function FormAlert({ variant, title, description }: Props) {
  const { Icon, color } = (() => {
    switch (variant) {
      case "note":
        return { Icon: Info, color: "#EDC25E80" };
      default:
        return { Icon: Terminal, color: "#ffffff00" };
    }
  })();
  return (
    <Alert
      className="mb-3 p-5 "
      variant={"destructive"}
      style={{ backgroundColor: color }}
    >
      <Icon className=" h-6 w-6 inline-block" />
      <div>
        <AlertTitle className="inline-block">{title}</AlertTitle>
        <AlertDescription className="inline-block pl-2">
          {description}
        </AlertDescription>
      </div>
    </Alert>
  );
}
