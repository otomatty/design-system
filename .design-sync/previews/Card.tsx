import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Button, Badge, Heading, Text,
} from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
    {children}
  </div>
);

export const Feature = () => (
  <F>
    <Card style={{ width: 280 }}>
      <CardHeader>
        <CardTitle>Surface ladder</CardTitle>
        <CardDescription>Hierarchy without shadow.</CardDescription>
      </CardHeader>
      <CardContent>Four lifts above the canvas carry depth using hairline borders alone.</CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Learn more</Button>
      </CardFooter>
    </Card>
  </F>
);

export const Pricing = () => (
  <F>
    <Card style={{ width: 280 }}>
      <CardHeader>
        <CardTitle>Starter</CardTitle>
        <CardDescription>For small teams.</CardDescription>
      </CardHeader>
      <CardContent>
        <Heading level="display-md">$8<Text as="span" tone="subtle" size="body"> / mo</Text></Heading>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm" fullWidth>Choose plan</Button>
      </CardFooter>
    </Card>
    <Card elevation="2" style={{ width: 280 }}>
      <CardHeader>
        <CardTitle>Pro <Badge tone="primary">Popular</Badge></CardTitle>
        <CardDescription>For growing teams.</CardDescription>
      </CardHeader>
      <CardContent>
        <Heading level="display-md">$16<Text as="span" tone="subtle" size="body"> / mo</Text></Heading>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm" fullWidth>Choose plan</Button>
      </CardFooter>
    </Card>
  </F>
);

export const Elevations = () => (
  <F>
    <Card elevation="1" style={{ width: 150, height: 80 }}><CardContent>surface-1</CardContent></Card>
    <Card elevation="2" style={{ width: 150, height: 80 }}><CardContent>surface-2</CardContent></Card>
    <Card elevation="3" style={{ width: 150, height: 80 }}><CardContent>surface-3</CardContent></Card>
  </F>
);
