import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "caption",
            "caption-bold",
            "body",
            "body-bold",
            "heading-1",
            "heading-2",
            "heading-3",
          ],
        },
      ],
      "text-color": [{ text: ["default-font", "subtext-color"] }],
    },
  },
});

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn };
