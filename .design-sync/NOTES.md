# design-sync notes — @otomatty/design-system

Repo-specific facts for future syncs. Append as you learn more.

## Build & environment
- Package manager: **pnpm** (`pnpm-lock.yaml`). Node 22.
- `cfg.buildCmd` = `pnpm run build` → emits `dist/` (ESM+CJS+types), compiled
  `dist/styles.css`, and bundled fonts under `dist/fonts/`.
- esbuild's install script must be approved (`pnpm.onlyBuiltDependencies: ["esbuild"]`
  in package.json) or tsup can't bundle.
- Converter entry: `--entry ./dist/index.js`, `--node-modules ./node_modules`.

## Render check / Playwright
- Chromium is pre-installed at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- Playwright was made importable by symlinking the global install into the staged
  scripts: `ln -sfn /opt/node22/lib/node_modules/playwright .ds-sync/node_modules/playwright`
  (same for `playwright-core`), then running validate/capture with
  `DS_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.

## Styling / .ds-root (IMPORTANT)
- The DS is **dark-only**. The converter's preview HTML forces `body{background:#fff}`,
  so every authored preview wraps its content in `<div className="ds-root">` to get
  the canvas surface. Without it, ink-colored (near-white) text is invisible on white.
- `.ds-root` is defined as **plain CSS** (outside any `@layer`) in `src/styles.css`.
  Do NOT move it into `@layer base` — Tailwind purges class selectors there because
  `ds-root` never appears in the `content`-scanned `src/`, and previews go unstyled.
- `tailwind.config.ts` has a **safelist** shipping the full token-utility vocabulary
  (bg-surface-*, text-ink-*, rounded-*, spacing, type scale, etc.) so designs built
  against the bound `styles.css` (not recompiled with the preset) can use the classes
  named in `.design-sync/conventions.md`. Keep the safelist and conventions.md in sync.
- Fonts: the bundled variable Inter/JetBrains Mono are aliased under their common
  family names ("Inter", "JetBrains Mono") via `@font-face` so font-stack fallbacks
  resolve to the shipped files. SF Pro was dropped from the stacks (unshippable) to
  clear `[FONT_MISSING]`.

## Component coverage
- 56 PascalCase exports = top-level components + their subcomponents (CardHeader,
  TabList, DialogHeader, DropdownItem, Table* parts, NavLink, etc.).
- **32 authored previews** (all top-level components), all cells graded `good`.
- **24 on the floor card by design**: subcomponents (composed/graded via their
  parent's preview) + `Toast`. `Toast` is interaction-driven (needs `ToastProvider`
  + an imperative `useToast()` call), so it can't render statically — authorable
  later only with a wrapper that fires a toast on mount.
- `DropdownMenu` gained a `defaultOpen` prop so its preview can render the open menu.
- `Tooltip` previews show the triggers + a caption; the hover/focus bubble can't be
  captured statically.
- Overlay/wide overrides in `cfg.overrides`: Dialog/DropdownMenu = `cardMode: single`
  (+ viewport); Navbar/Footer/Table/Pagination = `cardMode: column`.

## Known render warns
- None flagged. Validate's "1 missing token below threshold" is benign (a `var(--*)`
  used in component CSS without a matching shipped property, under the warn floor).

## Upload status (first sync)
- The upload to claude.ai/design was **NOT performed**: this web session lacks
  design-system authorization (`/design-login` needs an interactive terminal).
  The full `ds-bundle/` was built and verified locally and is ready to upload.
- No `projectId` recorded yet — a future sync with design auth creates the project
  (incremental path) and records the pin.

## Re-sync risks (watch-list)
- If `.ds-sync/node_modules/playwright` symlink is missing on a fresh clone, recreate
  it (see Render check above) — it's gitignored.
- The safelist must keep covering every class enumerated in conventions.md; if a new
  token family is documented, add it to both.
- `Toast` and all subcomponents stay floor-carded unless deliberately authored.
- Brand fonts are open substitutes (Inter / JetBrains Mono) for Linear's proprietary
  faces — intentional, recorded; not a defect to "fix".
