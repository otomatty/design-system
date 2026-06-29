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
  /** Accessible name for the dialog when no `DialogTitle` is rendered. */
  "aria-label"?: string;
  /** Id of an element labelling the dialog. Overrides the auto-wired `DialogTitle`. */
  "aria-labelledby"?: string;
}

interface DialogContextValue {
  /** Default id a `DialogTitle` adopts when the consumer doesn't supply one. */
  titleId: string;
  /** Called by `DialogTitle` with its actual id; returns an unregister cleanup. */
  registerTitle: (id: string) => () => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

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

// Stack of currently-open dialog panels; the last entry is the topmost. Used so
// only the topmost dialog traps Tab / handles Escape when several are open.
const dialogStack: HTMLDivElement[] = [];

export function Dialog({
  open,
  onClose,
  children,
  size = "md",
  dismissable = true,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: DialogProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  // Keep the latest handler/flag in refs so the focus effect can depend on
  // `open` alone — an inline `onClose` changing identity on every parent render
  // must not re-run the effect and steal focus back to the first control.
  const onCloseRef = React.useRef(onClose);
  const dismissableRef = React.useRef(dismissable);
  onCloseRef.current = onClose;
  dismissableRef.current = dismissable;

  // Auto-wire the dialog's accessible name to a rendered DialogTitle. The title
  // reports its actual id (custom or the generated default) via context, so the
  // panel's aria-labelledby always resolves — and stays unset when no title is
  // mounted, avoiding a dangling reference.
  const titleId = React.useId();
  const [labelId, setLabelId] = React.useState<string | undefined>(undefined);
  const ctx = React.useMemo<DialogContextValue>(
    () => ({
      titleId,
      registerTitle: (id: string) => {
        setLabelId(id);
        return () => setLabelId((cur) => (cur === id ? undefined : cur));
      },
    }),
    [titleId]
  );
  const labelledBy = ariaLabelledby ?? labelId;

  React.useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    // Remember what had focus so it can be restored when the dialog closes
    // (for a nested dialog this is a control inside the parent dialog).
    const previouslyFocused = document.activeElement as HTMLElement | null;
    if (panel) dialogStack.push(panel);

    const isTopmost = () => dialogStack[dialogStack.length - 1] === panel;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

    const onKey = (e: KeyboardEvent) => {
      if (!isTopmost()) return;
      if (e.key === "Escape" && dismissableRef.current) {
        onCloseRef.current();
        return;
      }
      if (e.key === "Tab") {
        // Trap focus inside the panel.
        const items = focusables();
        if (items.length === 0) {
          e.preventDefault();
          panel?.focus();
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
    const initial = focusables()[0] ?? panel;
    initial?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
      if (panel) {
        const i = dialogStack.indexOf(panel);
        if (i !== -1) dialogStack.splice(i, 1);
      }
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={ctx}>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-md">
        <div
          className="absolute inset-0 animate-ds-fade-in bg-canvas/70 backdrop-blur-sm"
          onClick={dismissable ? onClose : undefined}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={labelledBy}
          tabIndex={-1}
          className={cn(
            "ds-edge-highlight relative w-full animate-ds-scale-in rounded-xl border border-hairline-strong bg-surface-2 shadow-2xl focus:outline-none",
            sizes[size]
          )}
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>
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

/** Dialog heading, rendered in the display font. Names the dialog for a11y. */
export function DialogTitle({ id, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const ctx = React.useContext(DialogContext);
  // Adopt the shared id when the consumer didn't supply one, and report the
  // actual id back so the panel's aria-labelledby matches this heading exactly.
  const headingId = id ?? ctx?.titleId;
  React.useEffect(() => {
    if (ctx && headingId) return ctx.registerTitle(headingId);
  }, [ctx, headingId]);
  return (
    <h2 id={headingId} className={cn("font-display text-headline text-ink", className)} {...props} />
  );
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
