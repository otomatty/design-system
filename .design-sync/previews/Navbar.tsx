import { Navbar, NavLink, Button } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 0 }}>{children}</div>
);

export const Marketing = () => (
  <F>
    <Navbar
      sticky={false}
      brand="◆ Lumen"
      links={
        <>
          <NavLink active href="#">Product</NavLink>
          <NavLink href="#">Pricing</NavLink>
          <NavLink href="#">Docs</NavLink>
          <NavLink href="#">Changelog</NavLink>
        </>
      }
      actions={
        <>
          <Button variant="tertiary" size="sm">Sign in</Button>
          <Button variant="primary" size="sm">Get started</Button>
        </>
      }
    />
  </F>
);
