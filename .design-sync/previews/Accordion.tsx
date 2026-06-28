import { Accordion, AccordionItem } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, width: 440, maxWidth: "100%" }}>{children}</div>
);

export const Single = () => (
  <F>
    <Accordion defaultValue="a">
      <AccordionItem value="a" title="What is the surface ladder?">
        Four lift levels above the canvas carry hierarchy using hairline borders instead of shadow.
      </AccordionItem>
      <AccordionItem value="b" title="How is the accent used?">
        Lavender is reserved for the primary CTA, focus rings, and the brand mark — never as a fill.
      </AccordionItem>
      <AccordionItem value="c" title="Can I theme the tokens?">
        Yes — every color is a CSS custom property, so you can re-map the palette at runtime.
      </AccordionItem>
    </Accordion>
  </F>
);

export const Multiple = () => (
  <F>
    <Accordion multiple defaultValue={["a", "b"]}>
      <AccordionItem value="a" title="First section">Open by default.</AccordionItem>
      <AccordionItem value="b" title="Second section">Also open — multiple allows several at once.</AccordionItem>
    </Accordion>
  </F>
);
