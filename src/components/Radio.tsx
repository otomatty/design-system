import * as React from "react";
import { cn } from "../lib/cn";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
}

/** Single radio option. Group several under a shared `name`. */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
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
          type="radio"
          disabled={disabled}
          className="peer absolute inset-0 cursor-[inherit] appearance-none rounded-full border border-hairline-strong bg-surface-1 transition-colors checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50"
          {...props}
        />
        <span className="pointer-events-none relative h-1.5 w-1.5 scale-0 rounded-full bg-primary transition peer-checked:scale-100" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
});
