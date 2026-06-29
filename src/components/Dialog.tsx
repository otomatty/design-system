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
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Shared scroll-lock refcount so that closing one dialog while another is still
// open doesn't prematurely restore the body's overflow.
let scrollLockCount = 0;
let restoreOverflow = "";
function lockScroll() {
  if (scrollLockCount === 0) {
    restoreOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  scrollLockCount += 1;
}
function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) document.body.style.overflow = restoreOverflow;
}

export function Dialog({ open, onClose, children, size = "md", dismissable = true }: DialogProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    // Remember what had focus so it can be restored when the dialog closes.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissable) {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        // Trap focus inside the panel.
        const items = focusables();
        if (items.length === 0) {
          e.preventDefault();
          panelRef.current?.focus();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    lockScroll();

    // Move focus into the dialog on open (first focusable, else the panel).
    const initial = focusables()[0] ?? panelRef.current;
    initial?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
      previouslyFocused?.focus?.();
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
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          "ds-edge-highlight relative w-full animate-ds-scale-in rounded-xl border border-hairline-strong bg-surface-2 shadow-2xl focus:outline-none",
          sizes[size]
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Title + description region at the top of a `Dialog`. */
export function DialogHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1 p-lg pb-sm", className)} {...props}>
      {children}
    </div>
  );
}

/** Dialog heading, rendered in the display font. */
export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("font-display text-headline text-ink", className)} {...props} />;
}

/** Muted secondary line beneath a `DialogTitle`. */
export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body-sm text-ink-subtle", className)} {...props} />;
}

/** Main body content of a `Dialog`. */
export function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-lg py-sm text-body-sm text-ink-muted", className)} {...props} />;
}

/** Actions row at the bottom of a `Dialog`, separated by a hairline. */
export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-end gap-sm border-t border-hairline p-lg pt-md", className)}
      {...props}
    />
  );
}
