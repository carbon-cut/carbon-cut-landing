import { FC, useRef } from "react";

import {
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const MenuList: FC<{
  options: Array<any>;
  onSelectOption: (ele: any) => void;
  selectedValue: string;
}> = (props) => {
  const { options, onSelectOption, selectedValue } = props;
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: options.length ?? options.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 26,
    overscan: 25,
  });
  return (
    <CommandList ref={parentRef}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer?.getVirtualItems()?.map((virtualRow) => {
          const element = options[virtualRow.index];
          return (
            <CommandItem
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              key={element.value}
              value={element.value}
              onSelect={() => onSelectOption(element)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  element.value === selectedValue ? "opacity-100" : "opacity-0",
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
