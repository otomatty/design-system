import { Avatar } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

export const Sizes = () => (
  <F>
    <Avatar name="Ada Lovelace" size="xs" />
    <Avatar name="Ada Lovelace" size="sm" />
    <Avatar name="Ada Lovelace" size="md" />
    <Avatar name="Ada Lovelace" size="lg" />
  </F>
);

export const Initials = () => (
  <F>
    <Avatar name="Grace Hopper" />
    <Avatar name="Linus Torvalds" />
    <Avatar name="Margaret Hamilton" />
  </F>
);

export const Placeholder = () => (
  <F>
    <Avatar />
    <Avatar size="lg" />
  </F>
);
