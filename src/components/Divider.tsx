import * as React from "react";
import { cn } from "../lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** Optional centered label (horizontal only). */
  label?: React.ReactNode;
}

/** Hairline rule. */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = "horizontal", label, className, ...props },
  ref
) {
  if (orientation === "vertical") {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="vertical"
        className={cn("mx-2 h-full w-px self-stretch bg-hairline", className)}
        {...props}
      />
    );
  }
  if (label) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex items-center gap-sm", className)}
        {...props}
      >
        <span className="h-px flex-1 bg-hairline" />
        <span className="text-caption text-ink-subtle">{label}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
    );
  }
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full bg-hairline", className)}
      {...props}
    />
  );
});
