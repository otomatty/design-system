import * as React from "react";
import { cn } from "../lib/cn";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
}

/** Toggle switch. Controlled via `checked` + `onChange`, like a checkbox. */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, id, disabled, ...props },
  ref
) {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex items-center gap-sm text-body-sm text-ink",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer absolute inset-0 cursor-[inherit] appearance-none rounded-pill border border-hairline-strong bg-surface-3 transition-colors checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50"
          {...props}
        />
        <span className="pointer-events-none absolute left-0.5 h-3.5 w-3.5 rounded-full bg-ink-muted transition-transform duration-150 peer-checked:translate-x-4 peer-checked:bg-on-primary" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
});
