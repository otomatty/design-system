import { Field, Input, Select, Textarea } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18, width: 320, maxWidth: "100%" }}>
    {children}
  </div>
);

export const WithHint = () => (
  <F>
    <Field label="Work email" hint="We'll never share it." htmlFor="f-email" required>
      <Input id="f-email" placeholder="you@company.com" />
    </Field>
  </F>
);

export const WithError = () => (
  <F>
    <Field label="Work email" error="Enter a valid email address." htmlFor="f-email2">
      <Input id="f-email2" defaultValue="not-an-email" invalid />
    </Field>
  </F>
);

export const Composed = () => (
  <F>
    <Field label="Team size" htmlFor="f-team">
      <Select id="f-team"><option>1–10</option><option>11–50</option><option>51–200</option></Select>
    </Field>
    <Field label="Notes" hint="Optional." htmlFor="f-notes">
      <Textarea id="f-notes" placeholder="Tell us more…" />
    </Field>
  </F>
);
