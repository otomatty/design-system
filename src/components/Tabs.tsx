import * as React from "react";
import { cn } from "../lib/cn";

type TabsVariant = "underline" | "pill";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  variant: TabsVariant;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled active tab value. */
  value?: string;
  /** Initial active tab (uncontrolled). */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
}

/** Tab group root. Compose with `TabList`, `Tab`, and `TabPanel`. */
export function Tabs({
  value,
  defaultValue,
  onValueChange,
  variant = "underline",
  className,
  children,
  ...props
}: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const active = value ?? internal;
  const setValue = React.useCallback(
    (v: string) => {
      if (value === undefined) setInternal(v);
      onValueChange?.(v);
    },
    [value, onValueChange]
  );
  const ctx = React.useMemo(() => ({ value: active, setValue, variant }), [active, setValue, variant]);
  return (
    <TabsContext.Provider value={ctx}>
      <div className={cn("flex flex-col gap-md", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function useTabs() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs subcomponents must be used within <Tabs>");
  return ctx;
}

/** Row of tab triggers. Place inside `Tabs`. */
export function TabList({ className, children, onKeyDown, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { variant } = useTabs();
  // WAI-ARIA tablist keyboard support: Left/Right move between tabs (with
  // automatic activation), Home/End jump to the ends. Tabs themselves carry a
  // roving tabIndex so only the active one is in the page tab order.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    // Let a consumer's handler fully override the built-in tab navigation.
    if (e.defaultPrevented) return;
    const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'));
    if (tabs.length === 0) return;
    const idx = tabs.indexOf(document.activeElement as HTMLElement);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    }
  };
  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        variant === "pill"
          ? "inline-flex gap-1 rounded-pill border border-hairline bg-surface-1 p-1"
          : "flex gap-1 border-b border-hairline",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

/** A single tab trigger; activates the panel with the matching `value`. */
export function Tab({ value, className, children, onClick, ...props }: TabProps) {
  const { value: active, setValue, variant } = useTabs();
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setValue(value);
      }}
      className={cn(
        "text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50",
        variant === "pill"
          ? cn(
              "rounded-pill px-sm py-1.5",
              selected ? "bg-surface-3 text-ink" : "text-ink-subtle hover:text-ink-muted"
            )
          : cn(
              "-mb-px border-b-2 px-sm pb-2.5 pt-1",
              selected
                ? "border-primary text-ink"
                : "border-transparent text-ink-subtle hover:text-ink-muted"
            ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

/** Content shown when its `value` matches the active tab. */
export function TabPanel({ value, className, children, ...props }: TabPanelProps) {
  const { value: active } = useTabs();
  if (active !== value) return null;
  return (
    <div role="tabpanel" className={cn("animate-ds-fade-in", className)} {...props}>
      {children}
    </div>
  );
}
