import * as React from "react";
import { cn } from "../lib/cn";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Helper text rendered below the control. */
  hint?: React.ReactNode;
  /** Error message; when set, replaces the hint and is styled as danger. */
  error?: React.ReactNode;
  /** Mark the label with a required asterisk. */
  required?: boolean;
  /** `htmlFor` target — pass the same id to the control inside. */
  htmlFor?: string;
}

/**
 * Form field scaffold: label, control slot (children), and hint/error text.
 * Pairs with `Input`, `Select`, `Textarea`, etc.
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, hint, error, required, htmlFor, className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("flex flex-col gap-xs", className)} {...props}>
      {label ? (
        <label htmlFor={htmlFor} className="text-body-sm font-medium text-ink-muted">
          {label}
          {required ? <span className="ml-0.5 text-semantic-danger">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="text-caption text-semantic-danger">{error}</p>
      ) : hint ? (
        <p className="text-caption text-ink-subtle">{hint}</p>
      ) : null}
    </div>
  );
});
