import * as React from "react";
import { cn } from "../lib/cn";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand mark / wordmark, rendered at the left. */
  brand?: React.ReactNode;
  /** Center nav links. */
  links?: React.ReactNode;
  /** Right-aligned actions (e.g. sign-in + CTA). */
  actions?: React.ReactNode;
  /** Stick to the top of the viewport. @default true */
  sticky?: boolean;
}

/** Top navigation bar — dark, 56px tall, with a hairline bottom border. */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { brand, links, actions, sticky = true, className, ...props },
  ref
) {
  return (
    <header
      ref={ref}
      className={cn(
        "z-40 w-full border-b border-hairline bg-canvas/80 backdrop-blur-md",
        sticky && "sticky top-0",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-md px-lg">
        <div className="flex items-center gap-xl">
          {brand ? <div className="flex items-center font-display text-card-title text-ink">{brand}</div> : null}
          {links ? <nav className="hidden items-center gap-lg text-body-sm text-ink-subtle md:flex">{links}</nav> : null}
        </div>
        {actions ? <div className="flex items-center gap-sm">{actions}</div> : null}
      </div>
    </header>
  );
});

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

/** A navbar link with hover + active treatment. */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { active, className, ...props },
  ref
) {
  return (
    <a
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn(
        "transition-colors hover:text-ink",
        active ? "text-ink" : "text-ink-subtle",
        className
      )}
      {...props}
    />
  );
});
