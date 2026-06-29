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

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

/**
 * Click-to-open menu anchored to a trigger, with full menu keyboard semantics:
 * Arrow Up/Down + Home/End move between items, Escape closes and returns focus
 * to the trigger, and Arrow Down on the trigger opens it. Closes on outside click.
 */
export function DropdownMenu({ trigger, children, align = "start", defaultOpen = false, className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const menuItems = React.useCallback(
    () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []),
    []
  );
  const closeAndFocusTrigger = React.useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    // Move focus to the first item so the menu is keyboard-operable.
    menuItems()[0]?.focus();
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, menuItems]);

  const toggle = () => setOpen((o) => !o);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeAndFocusTrigger();
      return;
    }
    if (e.key === "Tab") {
      setOpen(false);
      return;
    }
    const items = menuItems();
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1].focus();
    }
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };
  const setTriggerRef = (node: HTMLElement | null) => {
    triggerRef.current = node;
  };

  // Compose the menu state + keyboard handling onto the actual (focusable)
  // trigger element so assistive tech announces the popup/expanded state on the
  // focused control. Falls back to a span for non-element triggers.
  const triggerNode = React.isValidElement(trigger) ? (
    React.cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
      ref: mergeRefs(setTriggerRef, (trigger as unknown as { ref?: React.Ref<HTMLElement> }).ref),
      "aria-haspopup": "menu",
      "aria-expanded": open,
      onClick: (e: React.MouseEvent) => {
        (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
        toggle();
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        (trigger.props as { onKeyDown?: (e: React.KeyboardEvent) => void }).onKeyDown?.(e);
        onTriggerKeyDown(e);
      },
    })
  ) : (
    <span
      ref={setTriggerRef as React.Ref<HTMLSpanElement>}
      role="button"
      tabIndex={0}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        } else {
          onTriggerKeyDown(e);
        }
      }}
    >
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
          onKeyDown={onMenuKeyDown}
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
