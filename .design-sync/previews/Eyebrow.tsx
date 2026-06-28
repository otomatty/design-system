import { Eyebrow, Heading } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
    {children}
  </div>
);

export const SectionOpener = () => (
  <F>
    <Eyebrow>Design System</Eyebrow>
    <Heading level="display-md" as="h2">Built for dark surfaces</Heading>
  </F>
);
