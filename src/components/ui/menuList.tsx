import { FC, useRef } from "react";

import { CommandItem, CommandList } from "@/components/ui/command";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const MenuList: FC<{
  options: Array<any>;
  onSelectOption: (ele: any) => void;
  selectedValue: string;
  bannedOptions?: Array<any>;
}> = (props) => {
  const { options, onSelectOption, selectedValue, bannedOptions = [] } = props;
  const parentRef = useRef<HTMLDivElement | null>(null);
  const bannedSet = new Set(bannedOptions);

  const rowVirtualizer = useVirtualizer({
    count: options.length ?? options.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 26,
    overscan: 25,
  });
  return (
    <CommandList ref={parentRef} className="max-w-60">
      <div
        className="w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          //width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer?.getVirtualItems()?.map((virtualRow) => {
          const element = options[virtualRow.index];
          const isBanned = bannedSet.has(element.value);
          return (
            <CommandItem
              className={cn(
                "h-fit w-full data-[disabled=true]:pointer-events-auto data-[disabled=true]:cursor-not-allowed",
                element.value === selectedValue ? "!bg-card-primary-foreground" : ""
              )}
              key={element.value}
              value={element.value}
              disabled={isBanned}
              aria-disabled={isBanned}
              onSelect={() => {
                if (isBanned) return;
                onSelectOption(element);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  element.value === selectedValue ? "opacity-100" : "opacity-0"
                )}
              />
              {element.label}
            </CommandItem>
          );
        })}
      </div>
    </CommandList>
  );
};
