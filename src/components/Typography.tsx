import * as React from "react";
import { cn } from "../lib/cn";

type HeadingLevel = "display-xl" | "display-lg" | "display-md" | "headline" | "card-title";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Type scale token. @default "display-md" */
  level?: HeadingLevel;
  /** Element to render. @default "h2" */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const headingScale: Record<HeadingLevel, string> = {
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  headline: "text-headline",
  "card-title": "text-card-title",
};

/** Display / headline type. Uses the display font and negative tracking. */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = "display-md", as: Tag = "h2", className, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cn("font-display text-ink", headingScale[level], className)}
      {...props}
    />
  );
});

type TextSize = "subhead" | "body-lg" | "body" | "body-sm" | "caption";
type TextTone = "default" | "muted" | "subtle" | "tertiary" | "primary" | "success" | "danger";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Type scale token. @default "body" */
  size?: TextSize;
  /** Ink tone. @default "default" */
  tone?: TextTone;
  /** Render a different element (e.g. "span", "div"). @default "p" */
  as?: React.ElementType;
}

const textSize: Record<TextSize, string> = {
  subhead: "text-subhead",
  "body-lg": "text-body-lg",
  body: "text-body",
  "body-sm": "text-body-sm",
  caption: "text-caption",
};

const textTone: Record<TextTone, string> = {
  default: "text-ink",
  muted: "text-ink-muted",
  subtle: "text-ink-subtle",
  tertiary: "text-ink-tertiary",
  primary: "text-primary",
  success: "text-semantic-success",
  danger: "text-semantic-danger",
};

/** Body copy. */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { size = "body", tone = "default", as: Tag = "p", className, ...props },
  ref
) {
  return (
    <Tag ref={ref} className={cn("font-sans", textSize[size], textTone[tone], className)} {...props} />
  );
});

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/** Section eyebrow — small, positive-tracked taxonomy label. */
export const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(function Eyebrow(
  { className, ...props },
  ref
) {
  return (
    <p ref={ref} className={cn("font-sans text-eyebrow uppercase text-ink-subtle", className)} {...props} />
  );
});

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {}

/** Inline monospace code token. */
export const Code = React.forwardRef<HTMLElement, CodeProps>(function Code(
  { className, ...props },
  ref
) {
  return (
    <code
      ref={ref}
      className={cn(
        "rounded-sm border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-mono text-ink-muted",
        className
      )}
      {...props}
    />
  );
});
