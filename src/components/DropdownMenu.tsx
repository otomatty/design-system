import * as React from "react";
import { cn } from "../lib/cn";

export interface DropdownMenuProps {
  /** Element that toggles the menu. */
  trigger: React.ReactNode;
  children: React.ReactNode;
  /** Horizontal alignment of the panel relative to the trigger. @default "start" */
  align?: "start" | "end";
  /** Render the menu open on first mount (uncontrolled). */
  defaultOpen?: boolean;
  className?: string;
}

/** Click-to-open menu anchored to a trigger. Closes on outside click / Escape. */
export function DropdownMenu({ trigger, children, align = "start", defaultOpen = false, className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    // Move focus into the menu so it's reachable by keyboard / screen readers.
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => setOpen((o) => !o);
  // Compose the menu state onto the actual (focusable) trigger element so
  // assistive tech announces the popup + expanded state on the focused control,
  // not on a non-focusable wrapper. Falls back to a span for non-element triggers.
  const triggerNode = React.isValidElement(trigger) ? (
    React.cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
      "aria-haspopup": "menu",
      "aria-expanded": open,
      onClick: (e: React.MouseEvent) => {
        (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
        toggle();
      },
    })
  ) : (
    <span aria-haspopup="menu" aria-expanded={open} onClick={toggle}>
      {trigger}
    </span>
  );

  return (
    <div ref={rootRef} className="relative inline-flex">
      {triggerNode}
      {open ? (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            "ds-edge-highlight absolute top-full z-50 mt-1 min-w-[180px] animate-ds-scale-in rounded-md border border-hairline-strong bg-surface-2 p-1 shadow-xl",
            align === "end" ? "right-0" : "left-0",
            className
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Style as a destructive action. */
  destructive?: boolean;
  /** Leading icon. */
  icon?: React.ReactNode;
}

/** A selectable row in a `DropdownMenu`. */
export function DropdownItem({ destructive, icon, className, children, ...props }: DropdownItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center gap-sm rounded-sm px-2 py-1.5 text-left text-body-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        destructive
          ? "text-semantic-danger hover:bg-semantic-danger/10"
          : "text-ink-muted hover:bg-surface-3 hover:text-ink",
        className
      )}
      {...props}
    >
      {icon ? <span className="shrink-0 text-ink-subtle">{icon}</span> : null}
      {children}
    </button>
  );
}

/** Non-interactive section heading inside a `DropdownMenu`. */
export function DropdownLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-1 text-caption font-medium text-ink-tertiary", className)} {...props} />;
}

/** Hairline divider between groups of menu items. */
export function DropdownSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-1 h-px bg-hairline", className)} {...props} />;
}
