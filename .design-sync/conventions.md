# Building with this design system

A dark-canvas, Linear-inspired React library. Components are compiled and
imported from the bundle; you compose them and lay them out with the Tailwind
token vocabulary below. There is **no provider to wrap** — components are
self-contained — but the system is **dark-only**, so the surface must be set.

## Setup — set the dark surface

The tokens, fonts, and component styles all live in the bound stylesheet; load
it once, and render content on the canvas surface:

- The stylesheet sets `body` to the canvas background and ink text. If you don't
  control `body`, wrap your subtree in **`<div className="ds-root">`** — it
  applies the canvas background, ink color, and base font. **Without the canvas
  surface, ink-colored text (near-white) is invisible.**
- Don't restyle component internals. Compose them; use the classes below only on
  your own layout wrappers.

```tsx
import { Button, Card, CardHeader, CardTitle, Badge } from "@otomatty/design-system";

<div className="ds-root">
  <div className="flex flex-col gap-md p-lg">
    <Card>
      <CardHeader>
        <CardTitle>Ship it</CardTitle>
        <Badge tone="success" dot>Live</Badge>
      </CardHeader>
    </Card>
    <Button variant="primary">Get started</Button>
  </div>
</div>
```

## The styling idiom — Tailwind tokens (use these exact names)

Style your own layout markup with these utility families. **Use only these token
names** — they are the design language; raw hex/px values break the system.

**Surface (`bg-*`)** — hierarchy by lift, not shadow:
`bg-canvas` · `bg-surface-1` · `bg-surface-2` · `bg-surface-3` · `bg-surface-4`

**Text (`text-*` color)**:
`text-ink` (primary) · `text-ink-muted` · `text-ink-subtle` · `text-ink-tertiary`
· `text-primary` (lavender emphasis) · `text-semantic-success` ·
`text-semantic-warning` · `text-semantic-danger`

**Borders (`border-*`)** — hairlines:
`border-hairline` · `border-hairline-strong` · `border-hairline-tertiary`

**Brand accent** — lavender, used *scarcely* (primary CTA, focus, brand mark):
`bg-primary` · `bg-primary-hover` · `text-on-primary` · `ring-primary-focus`.
Never use lavender as a section background or card fill.

**Type scale (`text-*` size)** — display uses negative tracking automatically:
`text-display-xl` · `text-display-lg` · `text-display-md` · `text-headline` ·
`text-card-title` · `text-subhead` · `text-body-lg` · `text-body` ·
`text-body-sm` · `text-caption` · `text-eyebrow` · `text-button` · `text-mono`

**Font family**: `font-display` · `font-sans` · `font-mono`

**Spacing (`p-*`, `px-*`, `gap-*`, …)** — 4px base, named steps:
`xxs` 4 · `xs` 8 · `sm` 12 · `md` 16 · `lg` 24 · `xl` 32 · `xxl` 48 · `section` 96
(e.g. `gap-md`, `px-lg`, `py-xl`).

**Radius (`rounded-*`)**: `rounded-xs` 4 · `rounded-sm` 6 · `rounded-md` 8
(buttons/inputs) · `rounded-lg` 12 (cards) · `rounded-xl` 16 (media panels) ·
`rounded-xxl` 24 · `rounded-pill` · `rounded-full`.

## Where the truth lives

- **`styles.css`** (and its `@import` of `_ds_bundle.css`) — the full token set
  as `--ds-*` custom properties and every component utility. Read it before
  styling.
- **`components/<group>/<Name>/<Name>.d.ts`** — the prop contract for each
  component. **`<Name>.prompt.md`** — usage notes and examples.

## Conventions

- Lavender is scarce: brand mark, primary CTA, focus ring, link emphasis — one
  accent only, no second chromatic color.
- Carry hierarchy with the surface ladder + hairline borders; avoid drop shadows.
- Pair `font-display` weight 600 with body weight 400.
- Reach for `rounded-md` (8px) on controls, `rounded-lg` (12px) on cards.
