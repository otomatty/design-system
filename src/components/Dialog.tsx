import * as React from "react";
import { cn } from "../lib/cn";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Max width of the panel. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Close when the backdrop is clicked. @default true */
  dismissable?: boolean;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

/**
 * Modal dialog. Renders a centered panel over a scrim. Controlled via `open`.
 * Closes on backdrop click and Escape.
 */
export function Dialog({ open, onClose, children, size = "md", dismissable = true }: DialogProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissable) onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, dismissable]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-md">
      <div
        className="absolute inset-0 animate-ds-fade-in bg-canvas/70 backdrop-blur-sm"
        onClick={dismissable ? onClose : undefined}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "ds-edge-highlight relative w-full animate-ds-scale-in rounded-xl border border-hairline-strong bg-surface-2 shadow-2xl",
          sizes[size]
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1 p-lg pb-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("font-display text-headline text-ink", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body-sm text-ink-subtle", className)} {...props} />;
}

export function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-lg py-sm text-body-sm text-ink-muted", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-end gap-sm border-t border-hairline p-lg pt-md", className)}
      {...props}
    />
  );
}
