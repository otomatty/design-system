import * as React from "react";
import { cn } from "../lib/cn";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  count: number;
  onPageChange: (page: number) => void;
  /** Sibling pages shown either side of the current page. @default 1 */
  siblings?: number;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(page: number, count: number, siblings: number): (number | "…")[] {
  const total = siblings * 2 + 5;
  if (count <= total) return range(1, count);
  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, count);
  const showLeftDots = left > 2;
  const showRightDots = right < count - 1;
  if (!showLeftDots && showRightDots) return [...range(1, 3 + siblings * 2), "…", count];
  if (showLeftDots && !showRightDots) return [1, "…", ...range(count - (2 + siblings * 2), count)];
  return [1, "…", ...range(left, right), "…", count];
}

const cellBase =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50";

/** Page navigation control. */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, count, onPageChange, siblings = 1, className, ...props },
  ref
) {
  const pages = buildPages(page, count, siblings);
  const go = (p: number) => p >= 1 && p <= count && p !== page && onPageChange(p);
  return (
    <nav ref={ref} aria-label="Pagination" className={cn("flex items-center gap-1", className)} {...props}>
      <button
        type="button"
        className={cn(cellBase, "text-ink-subtle hover:bg-surface-1 hover:text-ink disabled:pointer-events-none disabled:opacity-40")}
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`dots-${i}`} className="inline-flex h-8 min-w-8 items-center justify-center text-ink-tertiary">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => go(p)}
            className={cn(
              cellBase,
              p === page ? "bg-surface-3 font-medium text-ink" : "text-ink-subtle hover:bg-surface-1 hover:text-ink"
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        className={cn(cellBase, "text-ink-subtle hover:bg-surface-1 hover:text-ink disabled:pointer-events-none disabled:opacity-40")}
        onClick={() => go(page + 1)}
        disabled={page >= count}
        aria-label="Next page"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
});
