import { Avatar, AvatarGroup } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24 }}>{children}</div>
);

export const Stacked = () => (
  <F>
    <AvatarGroup>
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Grace Hopper" size="sm" />
      <Avatar name="Linus Torvalds" size="sm" />
    </AvatarGroup>
  </F>
);

export const WithOverflow = () => (
  <F>
    <AvatarGroup max={3}>
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Grace Hopper" size="sm" />
      <Avatar name="Linus Torvalds" size="sm" />
      <Avatar name="Margaret Hamilton" size="sm" />
      <Avatar name="Ken Thompson" size="sm" />
    </AvatarGroup>
  </F>
);
