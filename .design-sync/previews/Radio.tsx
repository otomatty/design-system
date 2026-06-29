import { Radio } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
    {children}
  </div>
);

export const Group = () => (
  <F>
    <Radio name="billing" label="Monthly billing" defaultChecked />
    <Radio name="billing" label="Annual billing (save 20%)" />
    <Radio name="billing" label="Pay as you go" />
  </F>
);

export const Disabled = () => (
  <F>
    <Radio name="plan2" label="Available" defaultChecked />
    <Radio name="plan2" label="Unavailable" disabled />
  </F>
);
