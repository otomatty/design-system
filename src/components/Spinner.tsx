import * as React from "react";
import { cn } from "../lib/cn";

type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** Accessible label. @default "Loading" */
  label?: string;
}

const sizes: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-[3px]",
};

/** Indeterminate loading spinner. */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = "md", label = "Loading", className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(
        "inline-block animate-ds-spin rounded-full border-hairline-strong border-t-primary",
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
