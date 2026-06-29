import { Heading } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
    {children}
  </div>
);

export const Scale = () => (
  <F>
    <Heading level="display-xl" as="h1">Display XL</Heading>
    <Heading level="display-lg" as="h2">Display LG</Heading>
    <Heading level="display-md" as="h3">Display MD</Heading>
    <Heading level="headline" as="h4">Headline</Heading>
    <Heading level="card-title" as="h5">Card title</Heading>
  </F>
);

export const Hero = () => (
  <F>
    <Heading level="display-lg" as="h1">Build on a dark canvas.</Heading>
  </F>
);
