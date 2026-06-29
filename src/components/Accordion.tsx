import * as React from "react";
import { cn } from "../lib/cn";

interface AccordionContextValue {
  isOpen: (v: string) => boolean;
  toggle: (v: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Allow multiple panels open at once. @default false */
  multiple?: boolean;
  /** Initially open item value(s). */
  defaultValue?: string | string[];
}

/** Vertically stacked, collapsible sections. */
export function Accordion({ multiple, defaultValue, className, children, ...props }: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(() => {
    if (!defaultValue) return [];
    const initial = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    // In single mode, never start with more than one panel open.
    return multiple ? initial : initial.slice(0, 1);
  });
  const isOpen = React.useCallback((v: string) => open.includes(v), [open]);
  const toggle = React.useCallback(
    (v: string) => {
      setOpen((prev) =>
        prev.includes(v) ? prev.filter((x) => x !== v) : multiple ? [...prev, v] : [v]
      );
    },
    [multiple]
  );
  const ctx = React.useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);
  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn("divide-y divide-hairline border-y border-hairline", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** A single collapsible section within an `Accordion`. */
export function AccordionItem({ value, title, children, className }: AccordionItemProps) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within <Accordion>");
  const open = ctx.isOpen(value);
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => ctx.toggle(value)}
        className="flex w-full items-center justify-between gap-md py-md text-left text-body-sm font-medium text-ink transition-colors hover:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50"
      >
        <span>{title}</span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn("h-4 w-4 shrink-0 text-ink-subtle transition-transform duration-200", open && "rotate-180")}
          fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <div className="animate-ds-fade-in pb-md text-body-sm text-ink-muted">{children}</div>
      ) : null}
    </div>
  );
}
