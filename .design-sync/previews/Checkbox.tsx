import { Checkbox } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
    {children}
  </div>
);

export const States = () => (
  <F>
    <Checkbox label="Unchecked" />
    <Checkbox label="Checked" defaultChecked />
    <Checkbox label="Disabled" disabled />
    <Checkbox label="Disabled checked" disabled defaultChecked />
  </F>
);

export const Group = () => (
  <F>
    <Checkbox label="Email me product updates" defaultChecked />
    <Checkbox label="Notify me about security alerts" defaultChecked />
    <Checkbox label="Subscribe to the newsletter" />
  </F>
);
