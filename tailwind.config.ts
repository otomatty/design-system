import type { Config } from "tailwindcss";
import preset from "./src/preset";

/** Config used to compile the design system's own stylesheet (dist/styles.css). */
export default {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
} satisfies Config;
