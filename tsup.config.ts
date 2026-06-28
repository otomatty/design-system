import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    preset: "src/preset.ts",
    tokens: "src/tokens.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ["react", "react-dom", "react/jsx-runtime"],
  target: "es2020",
});
