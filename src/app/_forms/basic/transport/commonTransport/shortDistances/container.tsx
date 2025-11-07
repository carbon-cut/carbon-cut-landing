import { Button } from "@/components/ui/button";
import { useScopedI18n } from "@/locales/client";
import { Plus, X } from "lucide-react";
import React, { useMemo } from "react";
import { UseFieldArrayRemove } from "react-hook-form";

type Props = {
  remove: UseFieldArrayRemove;
  children?: React.ReactNode;
  id: string;
  idx: number;
  section: 'bus' | 'covoiturage' | 'metro' | 'train';
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
        case "train":
        return {bg: "bg-green-50 border-green-200", text:'text-[#00A261]', }
      default:
        return {bg: "", text:'', }
    }
  }

  const style = Style()


  return (
    <li key={id} className="space-y-2">
      <div
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm items-end">
          {children}
        </div>
      </div>
    </li>
  );
}

type TransportType = "bus" | "metro" | "covoiturage" | 'train';

const Title = ({
  type,
  append,
}: {
  type: TransportType;
  append: (type: unknown) => void;
}) => {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.titles"
  );

  const data = useMemo<{ title: string; icon: string }>(() => {
    switch (type) {
      case "metro":
        return {
          title: t("metro"),
          icon: "🚇",
        };
        case "train":
        return {
          title: t("train"),
          icon: "🚇",
        };
      case "covoiturage":
        return {
          title: t("covoiturage"),
          icon: "🚗",
        };
      case "bus":
        return {
          title: t("bus"),
          icon: "🚌",
        };
    }
  }, [type]);

  const addTransportEntry = () => {
    switch (type) {
      case "bus":
        return {
          busType: undefined,
          distance: null,
          nbPeople: null,
          frequency: null,
        };

      case "metro":
        return {
          distance: null,
          nbPeople: null,
          frequency: null,
        };
      case "covoiturage":
        return {
          distance: null,
          people: null,
          frequency: null,
          make: null,
          engine: undefined,
        };
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <span className="text-xl mb-2">{data.icon}</span> {data.title}
      </h4>
      <Button
        type="button"
        onClick={() => {
          append(addTransportEntry());
        }}
        variant="outline"
        size="sm"
        className="border-[#00A261] text-[#00A261] hover:bg-[#ECFDF5] h-8 px-2"
      >
        <Plus className="w-3 h-3 mr-1" />
        <span className="text-xs">{t("add")}</span>
      </Button>
    </div>
  );
};

export {Container, Title};