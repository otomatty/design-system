/**
 * Design tokens for the Linear-inspired dark-canvas design system.
 *
 * These are the raw values. They are emitted as CSS custom properties in
 * `styles.css` (`--ds-*`) and mapped to Tailwind utility names in `preset.ts`,
 * so components reference them as semantic classes (`bg-surface-1`, `text-ink`).
 */

export const colors = {
  // Surface ladder — canvas is the deepest dark, then four lifts.
  canvas: "#010102",
  "surface-1": "#08090b",
  "surface-2": "#101216",
  "surface-3": "#181a1f",
  "surface-4": "#202329",

  // Hairline borders.
  hairline: "#23252a",
  "hairline-strong": "#33363d",
  "hairline-tertiary": "#1b1d21",

  // Text / ink.
  ink: "#f7f8f8",
  "ink-muted": "#d0d6e0",
  "ink-subtle": "#8a8f98",
  "ink-tertiary": "#62666d",

  // Brand — lavender-blue accent (used scarcely).
  primary: "#5e6ad2",
  "primary-hover": "#828fff",
  "primary-focus": "#5e69d1",
  "on-primary": "#ffffff",
  "brand-secure": "#7a7fad",

  // Semantic.
  "semantic-success": "#27a644",
  "semantic-warning": "#f2994a",
  "semantic-danger": "#eb5757",
  "semantic-info": "#5e6ad2",

  // Inverse (white-on-dark surfaces).
  "inverse-canvas": "#ffffff",
  "inverse-surface-1": "#f4f5f8",
  "inverse-surface-2": "#e7e9ef",
  "inverse-ink": "#010102",
} as const;

export const radius = {
  none: "0px",
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  xxl: "24px",
  pill: "9999px",
  full: "9999px",
} as const;

export const spacing = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  section: "96px",
} as const;

type FontSizeValue = [string, { lineHeight?: string; letterSpacing?: string; fontWeight?: string }];

/** fontSize tuples: [size, { lineHeight, letterSpacing }] — Tailwind fontSize shape. */
export const fontSize: Record<string, FontSizeValue> = {
  "display-xl": ["80px", { lineHeight: "1.05", letterSpacing: "-3px", fontWeight: "600" }],
  "display-lg": ["56px", { lineHeight: "1.10", letterSpacing: "-1.8px", fontWeight: "600" }],
  "display-md": ["40px", { lineHeight: "1.15", letterSpacing: "-1px", fontWeight: "600" }],
  headline: ["28px", { lineHeight: "1.20", letterSpacing: "-0.6px", fontWeight: "600" }],
  "card-title": ["22px", { lineHeight: "1.25", letterSpacing: "-0.4px", fontWeight: "500" }],
  subhead: ["20px", { lineHeight: "1.40", letterSpacing: "-0.2px" }],
  "body-lg": ["18px", { lineHeight: "1.50", letterSpacing: "-0.1px" }],
  body: ["16px", { lineHeight: "1.50", letterSpacing: "-0.05px" }],
  "body-sm": ["14px", { lineHeight: "1.50", letterSpacing: "0px" }],
  caption: ["12px", { lineHeight: "1.40", letterSpacing: "0px" }],
  button: ["14px", { lineHeight: "1.20", letterSpacing: "0px", fontWeight: "500" }],
  eyebrow: ["13px", { lineHeight: "1.30", letterSpacing: "0.4px", fontWeight: "500" }],
  mono: ["13px", { lineHeight: "1.50", letterSpacing: "0px" }],
};

export const fontFamily: Record<string, string[]> = {
  display: ["InterVariable", "Inter", "-apple-system", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
  sans: ["InterVariable", "Inter", "-apple-system", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
  mono: ["JetBrains Mono Variable", "JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
};

export const tokens = { colors, radius, spacing, fontSize, fontFamily };

export default tokens;
