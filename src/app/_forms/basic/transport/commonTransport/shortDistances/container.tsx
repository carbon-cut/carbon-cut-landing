import { Button } from "@/components/ui/button";
import { useScopedI18n } from "@/locales/client";
import { X } from "lucide-react";
import React from "react";
import { UseFieldArrayRemove } from "react-hook-form";

type Props = {
  remove: UseFieldArrayRemove;
  children?: React.ReactNode;
  id: string;
  idx: number;
  section: 'bus' | 'covoiturage' | 'metro';
};

function Container({ remove, children, id, idx, section }: Props) {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.titles"
  );


  function Style() {
    switch (section) {
      case "bus":
        return {bg: "bg-orange-50 border-orange-200", text:'text-[#FF6034]', }
      case "covoiturage":
        return {bg: "bg-blue-50 border-blue-200", text:'text-[#004DC2]', }
      case "metro":
        return {bg: "bg-green-50 border-green-200", text:'text-[#00A261]', }
      default:
        return {bg: "", text:'', }
    }
  }

  const style = Style()


  return (
    <div className="space-y-2">
      <div
        key={id}
        className={style.bg +"border rounded p-3 space-y-2 " }
      >
        <div className="flex items-center justify-between mb-2">
          <span className={"text-xs font-semibold " + style.text}>
            {t("trip")} {idx + 1}
          </span>
          <Button
            type="button"
            onClick={() => remove(idx)}
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Container;
