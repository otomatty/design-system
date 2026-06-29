import { Breadcrumb } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24 }}>{children}</div>
);

export const Trail = () => (
  <F>
    <Breadcrumb
      items={[
        { label: "Workspace", href: "#" },
        { label: "Issues", href: "#" },
        { label: "LUM-220" },
      ]}
    />
  </F>
);

export const TwoLevel = () => (
  <F>
    <Breadcrumb items={[{ label: "Docs", href: "#" }, { label: "Components" }]} />
  </F>
);
