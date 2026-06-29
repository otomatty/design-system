import { Tooltip, Button, Text } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
    {children}
  </div>
);

// Tooltips reveal on hover/focus, so a static card shows the triggers plus a
// caption rather than the floating bubble (hover state can't be captured).
export const Triggers = () => (
  <F>
    <div style={{ display: "flex", gap: 12 }}>
      <Tooltip content="Lavender focus ring on hover"><Button variant="secondary" size="sm">Hover me</Button></Tooltip>
      <Tooltip content="Appears below" side="bottom"><Button variant="secondary" size="sm">Bottom</Button></Tooltip>
      <Tooltip content="Appears to the right" side="right"><Button variant="secondary" size="sm">Right</Button></Tooltip>
    </div>
    <Text size="caption" tone="subtle">Hover or focus a trigger to reveal its tooltip.</Text>
  </F>
);
