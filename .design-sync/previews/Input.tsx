import { Input } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, width: 320, maxWidth: "100%" }}>
    {children}
  </div>
);

export const Default = () => (
  <F>
    <Input placeholder="you@company.com" defaultValue="" />
  </F>
);

export const WithValue = () => (
  <F>
    <Input defaultValue="ada@company.com" />
  </F>
);

export const Invalid = () => (
  <F>
    <Input defaultValue="not-an-email" invalid />
  </F>
);

export const Disabled = () => (
  <F>
    <Input placeholder="Disabled" disabled />
  </F>
);
