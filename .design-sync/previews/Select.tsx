import { Select } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, width: 280, maxWidth: "100%" }}>
    {children}
  </div>
);

export const Default = () => (
  <F>
    <Select defaultValue="11–50">
      <option>1–10</option>
      <option>11–50</option>
      <option>51–200</option>
      <option>200+</option>
    </Select>
  </F>
);

export const Disabled = () => (
  <F>
    <Select disabled defaultValue="1–10">
      <option>1–10</option>
    </Select>
  </F>
);
