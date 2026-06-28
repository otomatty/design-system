import { Spinner } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", gap: 20, alignItems: "center" }}>
    {children}
  </div>
);

export const Sizes = () => (
  <F>
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </F>
);
