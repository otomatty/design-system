import { Code, Text } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 }}>
    {children}
  </div>
);

export const Inline = () => (
  <F>
    <Text>Install with <Code>pnpm add @otomatty/design-system</Code> to get started.</Text>
    <Text>Import the styles via <Code>import "@otomatty/design-system/styles.css"</Code>.</Text>
  </F>
);
