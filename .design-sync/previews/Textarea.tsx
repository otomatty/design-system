import { Textarea } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, width: 360, maxWidth: "100%" }}>
    {children}
  </div>
);

export const Default = () => (
  <F>
    <Textarea placeholder="Tell us more…" />
  </F>
);

export const WithValue = () => (
  <F>
    <Textarea defaultValue={"We're migrating from a legacy kit and want\nevery design to map onto real components."} />
  </F>
);

export const Invalid = () => (
  <F>
    <Textarea defaultValue="Too short" invalid />
  </F>
);
