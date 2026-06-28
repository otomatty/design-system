import { Footer } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 0 }}>{children}</div>
);

export const FourColumn = () => (
  <F>
    <Footer
      brand="◆ Lumen"
      tagline="A dark-canvas design system inspired by Linear's marketing surface."
      columns={[
        { heading: "Product", links: [{ label: "Features" }, { label: "Pricing" }, { label: "Changelog" }] },
        { heading: "Company", links: [{ label: "About" }, { label: "Careers" }, { label: "Contact" }] },
        { heading: "Resources", links: [{ label: "Docs" }, { label: "Guides" }, { label: "API" }] },
      ]}
      bottom={<><span>© 2026 Lumen</span><span>Built on a dark canvas.</span></>}
    />
  </F>
);
