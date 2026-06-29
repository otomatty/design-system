import * as React from "react";
import { cn } from "../lib/cn";

type ProgressTone = "primary" | "success";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value, 0–`max`. */
  value?: number;
  max?: number;
  tone?: ProgressTone;
}

const toneFill: Record<ProgressTone, string> = {
  primary: "bg-primary",
  success: "bg-semantic-success",
};

/** Determinate progress bar. */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = 0, max = 100, tone = "primary", className, ...props },
  ref
) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Number.isFinite(value) ? Math.min(safeMax, Math.max(0, value)) : 0;
  const pct = (safeValue / safeMax) * 100;
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      className={cn("h-1.5 w-full overflow-hidden rounded-pill bg-surface-3", className)}
      {...props}
    >
      <div
        className={cn("h-full rounded-pill transition-[width] duration-300 ease-out", toneFill[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
});
