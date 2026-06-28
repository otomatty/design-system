import * as React from "react";
import { cn } from "../lib/cn";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

/** Hierarchical trail. The last item is rendered as the current page. */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, className, ...props },
  ref
) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex items-center gap-1.5 text-body-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <a href={item.href} className="text-ink-subtle transition-colors hover:text-ink">
                  {item.label}
                </a>
              ) : (
                <span className={last ? "text-ink" : "text-ink-subtle"} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last ? (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink-tertiary" fill="none" aria-hidden>
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
