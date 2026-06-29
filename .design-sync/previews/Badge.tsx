import { Badge } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

export const Tones = () => (
  <F>
    <Badge tone="neutral">Backlog</Badge>
    <Badge tone="primary">In review</Badge>
    <Badge tone="success">Shipped</Badge>
    <Badge tone="warning">Beta</Badge>
    <Badge tone="danger">Blocked</Badge>
  </F>
);

export const WithDot = () => (
  <F>
    <Badge tone="success" dot>Live</Badge>
    <Badge tone="primary" dot>In progress</Badge>
    <Badge tone="neutral" dot>Idle</Badge>
    <Badge tone="danger" dot>Down</Badge>
  </F>
);

export const Variants = () => (
  <F>
    <Badge tone="primary" variant="soft">Soft</Badge>
    <Badge tone="primary" variant="solid">Solid</Badge>
    <Badge tone="primary" variant="outline">Outline</Badge>
  </F>
);
