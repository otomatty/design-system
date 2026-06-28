import { Switch } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
    {children}
  </div>
);

export const States = () => (
  <F>
    <Switch label="Off" />
    <Switch label="On" defaultChecked />
    <Switch label="Disabled" disabled />
  </F>
);

export const Settings = () => (
  <F>
    <Switch label="Enable dark canvas" defaultChecked />
    <Switch label="Reduce motion" />
    <Switch label="Beta features" defaultChecked />
  </F>
);
