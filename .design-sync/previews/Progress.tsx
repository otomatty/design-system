import { Progress } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, width: 360, maxWidth: "100%" }}>
    {children}
  </div>
);

export const Values = () => (
  <F>
    <Progress value={20} />
    <Progress value={64} />
    <Progress value={92} />
  </F>
);

export const Tones = () => (
  <F>
    <Progress value={70} tone="primary" />
    <Progress value={100} tone="success" />
  </F>
);
