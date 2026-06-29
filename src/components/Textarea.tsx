import * as React from "react";
import { cn } from "../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Multi-line text field. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "min-h-[88px] w-full rounded-md border bg-surface-1 px-sm py-xs text-body-sm text-ink " +
          "placeholder:text-ink-tertiary transition-colors resize-y " +
          "focus:outline-none focus:ring-2 focus:ring-primary-focus/50 " +
          "disabled:cursor-not-allowed disabled:opacity-50",
        invalid
          ? "border-semantic-danger focus:border-semantic-danger focus:ring-semantic-danger/40"
          : "border-hairline focus:border-hairline-strong",
        className
      )}
      {...props}
    />
  );
});
