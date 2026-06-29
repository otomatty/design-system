import { Divider, Text } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, width: 360, maxWidth: "100%" }}>{children}</div>
);

export const Horizontal = () => (
  <F>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Text size="body-sm">Above the rule</Text>
      <Divider />
      <Text size="body-sm">Below the rule</Text>
    </div>
  </F>
);

export const WithLabel = () => (
  <F>
    <Divider label="OR" />
  </F>
);
