import type { Config } from "tailwindcss";
import preset from "./src/preset";

/**
 * Config used to compile the design system's own stylesheet (dist/styles.css).
 *
 * The `safelist` ships the full token-utility vocabulary even when a class isn't
 * used by a component, so designs built against the bound `styles.css` (which is
 * NOT recompiled with this preset) can use the documented token classes and have
 * them resolve. Kept in sync with `.design-sync/conventions.md`.
 */
const tokenColors =
  "canvas|surface-1|surface-2|surface-3|surface-4|hairline|hairline-strong|hairline-tertiary|" +
  "ink|ink-muted|ink-subtle|ink-tertiary|primary|primary-hover|primary-focus|on-primary|brand-secure|" +
  "semantic-success|semantic-warning|semantic-danger|semantic-info|inverse-canvas|inverse-surface-1|inverse-surface-2|inverse-ink";
const tokenText =
  "display-xl|display-lg|display-md|headline|card-title|subhead|body-lg|body|body-sm|caption|button|eyebrow|mono";
const tokenSpace = "xxs|xs|sm|md|lg|xl|xxl|section";
const tokenRadius = "none|xs|sm|md|lg|xl|xxl|pill|full";

export default {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  safelist: [
    { pattern: new RegExp(`^bg-(${tokenColors})$`), variants: ["hover", "focus"] },
    { pattern: new RegExp(`^text-(${tokenColors})$`) },
    { pattern: new RegExp(`^border-(${tokenColors})$`) },
    { pattern: new RegExp(`^ring-(${tokenColors})$`) },
    { pattern: new RegExp(`^text-(${tokenText})$`) },
    { pattern: new RegExp(`^font-(display|sans|mono)$`) },
    { pattern: new RegExp(`^rounded-(${tokenRadius})$`) },
    { pattern: new RegExp(`^(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y)-(${tokenSpace})$`) },
  ],
} satisfies Config;
