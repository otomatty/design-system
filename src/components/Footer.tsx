import * as React from "react";
import { cn } from "../lib/cn";

export interface FooterColumn {
  heading: React.ReactNode;
  links: { label: React.ReactNode; href?: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand mark, rendered top-left. */
  brand?: React.ReactNode;
  /** Short blurb under the brand. */
  tagline?: React.ReactNode;
  /** Link columns. */
  columns?: FooterColumn[];
  /** Bottom bar content (e.g. copyright). */
  bottom?: React.ReactNode;
}

/** Dense link-grid footer on the canvas surface. */
export const Footer = React.forwardRef<HTMLElement, FooterProps>(function Footer(
  { brand, tagline, columns = [], bottom, className, ...props },
  ref
) {
  return (
    <footer ref={ref} className={cn("border-t border-hairline bg-canvas", className)} {...props}>
      <div className="mx-auto grid max-w-content grid-cols-2 gap-xl px-lg py-xxl md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="col-span-2 flex flex-col gap-sm md:col-span-1">
          {brand ? <div className="font-display text-card-title text-ink">{brand}</div> : null}
          {tagline ? <p className="max-w-[28ch] text-body-sm text-ink-subtle">{tagline}</p> : null}
        </div>
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-sm">
            <p className="text-caption font-medium uppercase tracking-wide text-ink-tertiary">{col.heading}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a
                    href={link.href ?? "#"}
                    className="text-body-sm text-ink-subtle transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {bottom ? (
        <div className="border-t border-hairline">
          <div className="mx-auto flex max-w-content items-center justify-between px-lg py-md text-caption text-ink-tertiary">
            {bottom}
          </div>
        </div>
      ) : null}
    </footer>
  );
});
