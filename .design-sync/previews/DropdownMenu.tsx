import {
  DropdownMenu, DropdownItem, DropdownLabel, DropdownSeparator, Button,
} from "@otomatty/design-system";

// cardMode: single — the menu is forced open below so it renders inside the card.
const Stage = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, minHeight: 300 }}>{children}</div>
);

export const AccountMenu = () => (
  <Stage>
    <DropdownMenu defaultOpen trigger={<Button variant="secondary" size="sm">Account ▾</Button>}>
      <DropdownLabel>Signed in as ada</DropdownLabel>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Keyboard shortcuts</DropdownItem>
      <DropdownSeparator />
      <DropdownItem destructive>Sign out</DropdownItem>
    </DropdownMenu>
  </Stage>
);
