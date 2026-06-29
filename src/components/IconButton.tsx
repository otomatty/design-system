import * as React from "react";
import { cn } from "../lib/cn";

type IconButtonVariant = "ghost" | "secondary" | "primary";
type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label — required since there's no visible text. */
  "aria-label": string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const variants: Record<IconButtonVariant, string> = {
  ghost: "text-ink-subtle hover:bg-surface-1 hover:text-ink",
  secondary: "border border-hairline bg-surface-1 text-ink-muted hover:bg-surface-2 hover:text-ink",
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
};

const sizes: Record<IconButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

/** Square button for a single icon. */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = "ghost", size = "md", className, type, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
