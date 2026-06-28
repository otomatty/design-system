import type { Config } from "tailwindcss";
import { colors, radius, spacing, fontSize, fontFamily } from "./tokens";

/**
 * Tailwind preset for the design system.
 *
 * Colors resolve to `--ds-*` CSS custom properties (defined in `styles.css`)
 * so the palette can be themed at runtime; spacing / radius / typography are
 * baked from the token source. Consume it from a host app's tailwind config:
 *
 *   import preset from "@otomatty/design-system/preset";
 *   export default { presets: [preset], content: [...] };
 */
const cssVarColors = Object.fromEntries(
  Object.keys(colors).map((name) => [name, `var(--ds-${name})`])
) as Record<keyof typeof colors, string>;

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: cssVarColors,
      borderRadius: { ...radius },
      spacing: { ...spacing },
      fontFamily: { ...fontFamily },
      fontSize: { ...fontSize },
      maxWidth: {
        content: "1280px",
      },
      ringColor: {
        DEFAULT: "var(--ds-primary-focus)",
      },
      keyframes: {
        "ds-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "ds-scale-in": {
          from: { opacity: "0", transform: "translateY(4px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "ds-slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "ds-spin": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "ds-fade-in": "ds-fade-in 150ms ease-out",
        "ds-scale-in": "ds-scale-in 160ms cubic-bezier(0.16, 1, 0.3, 1)",
        "ds-slide-up": "ds-slide-up 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "ds-spin": "ds-spin 0.7s linear infinite",
      },
    },
  },
};

export default preset;
