import * as React from "react";
import { cn } from "../lib/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/** Native select, styled to match the dark surface system. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className, children, ...props },
  ref
) {
  return (
    // The caller's layout class sizes the wrapper so the absolutely-positioned
    // chevron stays aligned to the control's right edge; the select fills it.
    <div className={cn("relative", className)}>
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-9 w-full appearance-none rounded-md border bg-surface-1 pl-sm pr-8 text-body-sm text-ink " +
            "transition-colors focus:outline-none focus:ring-2 focus:ring-primary-focus/50 " +
            "disabled:cursor-not-allowed disabled:opacity-50",
          invalid
            ? "border-semantic-danger focus:ring-semantic-danger/40"
            : "border-hairline focus:border-hairline-strong"
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-sm top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-subtle"
        fill="none"
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});
