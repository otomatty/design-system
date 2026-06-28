import * as React from "react";
import { cn } from "../lib/cn";

type AlertTone = "info" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  /** Bold leading title. */
  title?: React.ReactNode;
  /** Leading icon override; a default per-tone glyph is used otherwise. */
  icon?: React.ReactNode;
  /** Show a close button; calls `onDismiss` when clicked. */
  onDismiss?: () => void;
}

const toneStyles: Record<AlertTone, { wrap: string; icon: string }> = {
  info: { wrap: "border-primary/30 bg-primary/10", icon: "text-primary-hover" },
  success: { wrap: "border-semantic-success/30 bg-semantic-success/10", icon: "text-semantic-success" },
  warning: { wrap: "border-semantic-warning/30 bg-semantic-warning/10", icon: "text-semantic-warning" },
  danger: { wrap: "border-semantic-danger/30 bg-semantic-danger/10", icon: "text-semantic-danger" },
};

const glyphs: Record<AlertTone, React.ReactNode> = {
  info: <path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  success: <path d="M7 12l3.5 3.5L17 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  warning: <path d="M12 8v5m0 3h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  danger: <path d="M15 9l-6 6m0-6l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
};

/** Inline contextual banner. */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = "info", title, icon, onDismiss, className, children, ...props },
  ref
) {
  const styles = toneStyles[tone];
  return (
    <div
      ref={ref}
      role="alert"
      className={cn("flex gap-sm rounded-md border p-sm", styles.wrap, className)}
      {...props}
    >
      <span className={cn("mt-0.5 shrink-0", styles.icon)}>
        {icon ?? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            {glyphs[tone]}
          </svg>
        )}
      </span>
      <div className="min-w-0 flex-1">
        {title ? <p className="text-body-sm font-medium text-ink">{title}</p> : null}
        {children ? <div className="text-body-sm text-ink-muted">{children}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="-m-1 shrink-0 rounded p-1 text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
            <path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
});
