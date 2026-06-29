import * as React from "react";
import { cn } from "../lib/cn";

type ToastTone = "neutral" | "success" | "warning" | "danger";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: ToastTone;
  /** Auto-dismiss after ms. @default 4000. Pass 0 to keep it until dismissed. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Access the imperative toast API. Must be used under `ToastProvider`. */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}

const toneBar: Record<ToastTone, string> = {
  neutral: "bg-ink-subtle",
  success: "bg-semantic-success",
  warning: "bg-semantic-warning",
  danger: "bg-semantic-danger",
};

export interface ToastProviderProps {
  children: React.ReactNode;
}

/** Mounts the toast viewport and provides the `useToast` API. */
export function ToastProvider({ children }: ToastProviderProps) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const dismiss = React.useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (opts: ToastOptions) => {
      const id = ++idRef.current;
      setItems((prev) => [...prev, { ...opts, id }]);
      const duration = opts.duration ?? 4000;
      if (duration > 0) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-sm"
      >
        {items.map((t) => (
          <div
            key={t.id}
            role={t.tone === "danger" || t.tone === "warning" ? "alert" : "status"}
            className="ds-edge-highlight pointer-events-auto flex animate-ds-slide-up gap-sm overflow-hidden rounded-lg border border-hairline-strong bg-surface-2 p-sm shadow-2xl"
          >
            <span className={cn("w-0.5 shrink-0 rounded-full", toneBar[t.tone ?? "neutral"])} />
            <div className="min-w-0 flex-1">
              <p className="text-body-sm font-medium text-ink">{t.title}</p>
              {t.description ? (
                <p className="mt-0.5 text-caption text-ink-subtle">{t.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => dismiss(t.id)}
              className="-m-1 h-fit shrink-0 rounded p-1 text-ink-subtle transition-colors hover:bg-surface-3 hover:text-ink"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                <path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
