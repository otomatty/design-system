import * as React from "react";
import { cn } from "../lib/cn";

type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip text/content. */
  content: React.ReactNode;
  /** Preferred side. @default "top" */
  side?: TooltipSide;
  /** Trigger element (must accept a ref / mouse + focus handlers). */
  children: React.ReactElement;
  /** Open-delay in ms. @default 150 */
  delay?: number;
}

const sidePos: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
  left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
  right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
};

/** Lightweight hover/focus tooltip. CSS-positioned, no portal. */
export function Tooltip({ content, side = "top", children, delay = 150 }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  React.useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 w-max max-w-xs rounded-md border border-hairline-strong bg-surface-3 px-2 py-1 text-caption text-ink shadow-lg transition-opacity duration-150",
          sidePos[side],
          open ? "opacity-100" : "opacity-0"
        )}
      >
        {content}
      </span>
    </span>
  );
}
