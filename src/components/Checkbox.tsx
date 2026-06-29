import * as React from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Label rendered to the right of the box. */
  label?: React.ReactNode;
}

/** Checkbox with a custom dark-surface indicator. */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, disabled, ...props },
  ref
) {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex items-center gap-xs text-body-sm text-ink",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 cursor-[inherit] appearance-none rounded-xs border border-hairline-strong bg-surface-1 transition-colors checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50"
          {...props}
        />
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="pointer-events-none relative h-3 w-3 scale-50 text-on-primary opacity-0 transition peer-checked:scale-100 peer-checked:opacity-100"
          fill="none"
        >
          <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
});
