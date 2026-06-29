import * as React from "react";
import { cn } from "../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape preset. @default "line" */
  shape?: "line" | "circle" | "block";
}

const shapes = {
  line: "h-3.5 w-full rounded-sm",
  circle: "h-10 w-10 rounded-full",
  block: "h-24 w-full rounded-lg",
};

/** Loading placeholder with a subtle pulse. */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { shape = "line", className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("animate-pulse bg-surface-3", shapes[shape], className)}
      {...props}
    />
  );
});
