// Copies the variable font files used by the design system into dist/fonts,
// where the compiled stylesheet references them via relative URLs.
import { mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const out = resolve(root, "dist/fonts");

const fonts = [
  {
    from: resolve(root, "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"),
    to: resolve(out, "inter-variable.woff2"),
  },
  {
    from: resolve(
      root,
      "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2"
    ),
    to: resolve(out, "jetbrains-mono-variable.woff2"),
  },
];

await mkdir(out, { recursive: true });
for (const { from, to } of fonts) {
  await copyFile(from, to);
  console.log(`copied ${to.replace(root + "/", "")}`);
}
