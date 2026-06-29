import * as React from "react";
import { cn } from "../lib/cn";

type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials / placeholder if absent or it fails. */
  src?: string;
  /** Alt text and initials source. */
  name?: string;
  size?: AvatarSize;
}

const sizes: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-caption",
  sm: "h-8 w-8 text-caption",
  md: "h-10 w-10 text-body-sm",
  lg: "h-12 w-12 text-body",
};

function initials(name?: string): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Circular user avatar with image or initials fallback. */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name, size = "md", className, ...props },
  ref
) {
  const [failed, setFailed] = React.useState(false);
  // Reset the failure state when the src changes so a later valid URL can load
  // (e.g. a recycled list row that first showed a broken/placeholder image).
  React.useEffect(() => {
    setFailed(false);
  }, [src]);
  const showImage = src && !failed;
  // In the initials/placeholder fallback the visible glyph is aria-hidden, so
  // surface the name on the wrapper itself for screen readers (the <img> alt
  // carries it while the image is shown). Decorative when there's no name.
  const fallbackLabel = !showImage && name ? { role: "img", "aria-label": name } : {};
  return (
    <span
      ref={ref}
      {...fallbackLabel}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-hairline bg-surface-3 font-medium text-ink-muted",
        sizes[size],
        className
      )}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={name ?? ""}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : name ? (
        <span aria-hidden>{initials(name)}</span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="currentColor" aria-hidden>
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5z" />
        </svg>
      )}
    </span>
  );
});

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max avatars to show before collapsing into a "+N" tile. */
  max?: number;
}

/** Overlapping cluster of avatars. */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { max, className, children, ...props },
  ref
) {
  const items = React.Children.toArray(children);
  const shown = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - shown.length : 0;
  return (
    <div ref={ref} className={cn("flex items-center -space-x-2", className)} {...props}>
      {shown.map((child, i) => (
        <span key={i} className="rounded-full ring-2 ring-canvas">
          {child}
        </span>
      ))}
      {overflow > 0 ? (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-3 text-caption font-medium text-ink-subtle ring-2 ring-canvas">
          +{overflow}
        </span>
      ) : null}
    </div>
  );
});
