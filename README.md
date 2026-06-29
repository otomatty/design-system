# @otomatty/design-system

A dark-canvas, Linear-inspired React design system. A four-step surface ladder,
a single lavender-blue accent, hairline borders, and negative-tracked display
type — shipped as a Tailwind preset plus ~30 compiled React components.

## Install

```bash
pnpm add @otomatty/design-system
```

Peer deps: `react` and `react-dom` (>=18).

## Setup

1. Import the compiled stylesheet once, near your app root:

   ```ts
   import "@otomatty/design-system/styles.css";
   ```

   It carries the design tokens (`--ds-*` custom properties), the `@font-face`
   declarations (Inter + JetBrains Mono, bundled), and the component utilities.
   The stylesheet sets `body` to the dark canvas surface. **If your app can't
   style `body`** (embedded widget, partial mount), wrap your subtree in
   `<div className="ds-root">` instead — it applies the canvas background, ink
   text color, and base font. Without the dark surface, the near-white component
   text is unreadable.

2. Extend your Tailwind config with the preset so your own layout markup can use
   the same token vocabulary (`bg-surface-1`, `text-ink`, `rounded-lg`, …):

   ```ts
   // tailwind.config.ts
   import preset from "@otomatty/design-system/preset";

   export default {
     presets: [preset],
     content: ["./src/**/*.{ts,tsx}", "./node_modules/@otomatty/design-system/dist/**/*.js"],
   };
   ```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, Badge } from "@otomatty/design-system";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ship it</CardTitle>
        <Badge tone="success" dot>Live</Badge>
      </CardHeader>
    </Card>
  );
}
```

## Design language

- **Surface ladder** — `canvas` (#010102) → `surface-1` → `surface-2` →
  `surface-3` → `surface-4`. Hierarchy is carried by lift + hairline borders,
  not shadow.
- **One accent** — lavender-blue `primary` (#5e6ad2), reserved for the primary
  CTA, focus rings, and the brand mark. No second chromatic color.
- **Type** — `display-*` tokens use the display font with aggressive negative
  tracking; body holds at `body` (16px). Mono is JetBrains Mono.

See `dist/styles.css` for the full token vocabulary, or import the tokens
directly: `import { tokens } from "@otomatty/design-system/tokens"`.

## Components

Actions (`Button`, `IconButton`) · Forms (`Field`, `Input`, `Textarea`,
`Select`, `Checkbox`, `Radio`, `Switch`) · Typography (`Heading`, `Text`,
`Eyebrow`, `Code`) · Data display (`Badge`, `Avatar`, `AvatarGroup`, `Card`,
`Divider`, `Table`, `Skeleton`) · Feedback (`Alert`, `Spinner`, `Progress`,
`Tooltip`, `Toast`) · Navigation (`Tabs`, `Pagination`, `Breadcrumb`, `Navbar`,
`Footer`) · Overlays (`Accordion`, `Dialog`, `DropdownMenu`).

## Development

```bash
pnpm install
pnpm build      # → dist/ (JS, types, styles.css, fonts)
pnpm typecheck
```

## License

MIT
