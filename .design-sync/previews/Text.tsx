import { Text } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
    {children}
  </div>
);

export const Sizes = () => (
  <F>
    <Text size="subhead">Subhead — a lead paragraph that introduces a section.</Text>
    <Text size="body-lg">Body large — comfortable reading size for intros.</Text>
    <Text size="body">Body — the default reading size for paragraphs.</Text>
    <Text size="body-sm">Body small — secondary copy and captions.</Text>
    <Text size="caption">Caption — meta information and footnotes.</Text>
  </F>
);

export const Tones = () => (
  <F>
    <Text tone="default">Default ink — primary copy.</Text>
    <Text tone="muted">Muted — secondary copy.</Text>
    <Text tone="subtle">Subtle — tertiary copy.</Text>
    <Text tone="primary">Primary — lavender emphasis.</Text>
    <Text tone="success">Success — positive status.</Text>
    <Text tone="danger">Danger — error status.</Text>
  </F>
);
