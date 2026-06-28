import * as React from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "inverse" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` is the lavender CTA; use it scarcely. */
  variant?: ButtonVariant;
  /** Control height / padding. @default "md" */
  size?: ButtonSize;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  rightIcon?: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-xs whitespace-nowrap rounded-md font-sans " +
  "text-button font-medium transition-colors duration-150 select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-focus",
  secondary:
    "bg-surface-1 text-ink border border-hairline hover:bg-surface-2 hover:border-hairline-strong active:bg-surface-3",
  tertiary: "bg-transparent text-ink-muted hover:bg-surface-1 hover:text-ink active:bg-surface-2",
  inverse:
    "bg-inverse-canvas text-inverse-ink hover:bg-inverse-surface-1 active:bg-inverse-surface-2",
  danger: "bg-semantic-danger text-on-primary hover:opacity-90 active:opacity-100",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-sm text-caption",
  md: "h-9 px-md",
  lg: "h-11 px-lg text-body-sm",
};

/**
 * Primary interactive control. Reserve `variant="primary"` (lavender) for the
 * single most important action on a surface; everything else is `secondary` or
 * `tertiary`.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", fullWidth, leftIcon, rightIcon, className, children, type, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {leftIcon ? <span className="-ml-0.5 inline-flex shrink-0">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="-mr-0.5 inline-flex shrink-0">{rightIcon}</span> : null}
    </button>
  );
});
