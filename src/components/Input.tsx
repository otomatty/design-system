import * as React from "react";
import { cn } from "../lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Render an error (danger) ring and border. */
  invalid?: boolean;
  /** Element rendered inside the field, before the input (e.g. an icon). */
  startAdornment?: React.ReactNode;
  /** Element rendered inside the field, after the input. */
  endAdornment?: React.ReactNode;
}

const fieldShell =
  "flex items-center gap-xs rounded-md border bg-surface-1 px-sm transition-colors " +
  "focus-within:border-hairline-strong focus-within:ring-2 focus-within:ring-primary-focus/50";

/** Single-line text field. Compose with `Field` for a label + helper text. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, startAdornment, endAdornment, className, disabled, ...props },
  ref
) {
  return (
    <div
      className={cn(
        fieldShell,
        "h-9",
        invalid
          ? "border-semantic-danger focus-within:border-semantic-danger focus-within:ring-semantic-danger/40"
          : "border-hairline",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {startAdornment ? <span className="shrink-0 text-ink-subtle">{startAdornment}</span> : null}
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className="w-full bg-transparent text-body-sm text-ink placeholder:text-ink-tertiary focus:outline-none disabled:cursor-not-allowed"
        {...props}
      />
      {endAdornment ? <span className="shrink-0 text-ink-subtle">{endAdornment}</span> : null}
    </div>
  );
});
