import { Button } from "@otomatty/design-system";

const F = ({ children, col }: { children: any; col?: boolean }) => (
  <div
    className="ds-root"
    style={{ padding: 24, display: "flex", gap: 12, flexWrap: "wrap", flexDirection: col ? "column" : "row", alignItems: col ? "flex-start" : "center" }}
  >
    {children}
  </div>
);

export const Variants = () => (
  <F>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="inverse">Inverse</Button>
    <Button variant="danger">Danger</Button>
  </F>
);

export const Sizes = () => (
  <F>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </F>
);

export const WithIcons = () => (
  <F>
    <Button variant="primary" leftIcon={<span>＋</span>}>New issue</Button>
    <Button variant="secondary" rightIcon={<span>→</span>}>Continue</Button>
  </F>
);

export const States = () => (
  <F>
    <Button variant="primary">Default</Button>
    <Button variant="primary" disabled>Disabled</Button>
    <Button variant="secondary" disabled>Disabled</Button>
  </F>
);
