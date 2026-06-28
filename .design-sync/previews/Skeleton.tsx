import { Skeleton } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, width: 320, maxWidth: "100%" }}>
    {children}
  </div>
);

export const Shapes = () => (
  <F>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Skeleton shape="line" />
      <Skeleton shape="line" className="w-2/3" />
      <Skeleton shape="block" />
    </div>
  </F>
);

export const CardLoading = () => (
  <F>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Skeleton shape="circle" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <Skeleton shape="line" className="w-1/2" />
        <Skeleton shape="line" className="w-3/4" />
      </div>
    </div>
  </F>
);
