import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The design system adds custom `text-*` font-size tokens (text-display-xl,
// text-body, text-button, …). Without registering them, tailwind-merge treats
// any unknown `text-*` class as a text *color* and collapses size + color into
// one group — so `cn("text-ink", "text-display-xl")` would drop the color, and
// `cn("text-button", "text-on-primary")` would drop the size. Registering the
// tokens in the `font-size` group keeps size and color independent.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-lg",
            "display-md",
            "headline",
            "card-title",
            "subhead",
            "body-lg",
            "body",
            "body-sm",
            "caption",
            "button",
            "eyebrow",
            "mono",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names, resolving Tailwind conflicts last-wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
