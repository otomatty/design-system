import * as React from "react";
import { cn } from "../lib/cn";

type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger";
type BadgeVariant = "soft" | "solid" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color intent. @default "neutral" */
  tone?: BadgeTone;
  /** Fill style. @default "soft" */
  variant?: BadgeVariant;
  /** Render a small leading status dot. */
  dot?: boolean;
}

const soft: Record<BadgeTone, string> = {
  neutral: "bg-surface-2 text-ink-muted",
  primary: "bg-primary/15 text-primary-hover",
  success: "bg-semantic-success/15 text-semantic-success",
  warning: "bg-semantic-warning/15 text-semantic-warning",
  danger: "bg-semantic-danger/15 text-semantic-danger",
};

const solid: Record<BadgeTone, string> = {
  neutral: "bg-surface-4 text-ink",
  primary: "bg-primary text-on-primary",
  success: "bg-semantic-success text-on-primary",
  warning: "bg-semantic-warning text-canvas",
  danger: "bg-semantic-danger text-on-primary",
};

const outline: Record<BadgeTone, string> = {
  neutral: "border border-hairline-strong text-ink-muted",
  primary: "border border-primary/40 text-primary-hover",
  success: "border border-semantic-success/40 text-semantic-success",
  warning: "border border-semantic-warning/40 text-semantic-warning",
  danger: "border border-semantic-danger/40 text-semantic-danger",
};

const dotColor: Record<BadgeTone, string> = {
  neutral: "bg-ink-subtle",
  primary: "bg-primary",
  success: "bg-semantic-success",
  warning: "bg-semantic-warning",
  danger: "bg-semantic-danger",
};

/** Small status pill. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", variant = "soft", dot, className, children, ...props },
  ref
) {
  const styles = variant === "solid" ? solid : variant === "outline" ? outline : soft;
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 text-caption font-medium",
        styles[tone],
        className
      )}
      {...props}
    >
      {dot ? <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[tone])} /> : null}
      {children}
    </span>
  );
});
