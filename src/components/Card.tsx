import * as React from "react";
import { cn } from "../lib/cn";

type CardElevation = "1" | "2" | "3";
type CardRadius = "lg" | "xl";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Surface lift level. 1 = surface-1 (default card), 2 = featured. @default "1" */
  elevation?: CardElevation;
  /** Corner radius token. `lg` (12px) for cards, `xl` (16px) for media panels. @default "lg" */
  radius?: CardRadius;
  /** Add interactive hover lift + cursor. */
  interactive?: boolean;
  /** Apply the subtle top-edge highlight used on lifted panels. @default true */
  edge?: boolean;
}

const elevations: Record<CardElevation, string> = {
  "1": "bg-surface-1 border-hairline",
  "2": "bg-surface-2 border-hairline-strong",
  "3": "bg-surface-3 border-hairline-strong",
};

/**
 * Lifted surface panel. The workhorse container — feature cards, pricing cards,
 * testimonial cards, and product-screenshot frames are all `Card`s.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { elevation = "1", radius = "lg", interactive, edge = true, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "border",
        radius === "xl" ? "rounded-xl" : "rounded-lg",
        elevations[elevation],
        edge && "ds-edge-highlight",
        interactive &&
          "cursor-pointer transition-colors hover:bg-surface-2 hover:border-hairline-strong",
        className
      )}
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1 p-lg", className)} {...props} />;
  }
);

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3 ref={ref} className={cn("font-display text-card-title text-ink", className)} {...props} />
    );
  }
);

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-body-sm text-ink-subtle", className)} {...props} />;
});

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("px-lg pb-lg text-body-sm text-ink-muted", className)} {...props} />;
  }
);

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-sm border-t border-hairline px-lg py-md", className)}
        {...props}
      />
    );
  }
);
