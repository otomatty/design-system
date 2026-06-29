import { IconButton } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
    {children}
  </div>
);

const Gear = (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
    <path d="M8 5.5A2.5 2.5 0 108 10.5 2.5 2.5 0 008 5.5zm6-.4l-1.2-.3a4.9 4.9 0 00-.4-1l.7-1a.5.5 0 00-.1-.7l-1-1a.5.5 0 00-.7-.1l-1 .7a4.9 4.9 0 00-1-.4L9 .8a.5.5 0 00-.5-.4H7.5a.5.5 0 00-.5.4l-.3 1.2a4.9 4.9 0 00-1 .4l-1-.7a.5.5 0 00-.7.1l-1 1a.5.5 0 00-.1.7l.7 1a4.9 4.9 0 00-.4 1l-1.2.3a.5.5 0 00-.4.5v1a.5.5 0 00.4.5l1.2.3a4.9 4.9 0 00.4 1l-.7 1a.5.5 0 00.1.7l1 1a.5.5 0 00.7.1l1-.7a4.9 4.9 0 001 .4l.3 1.2a.5.5 0 00.5.4h1a.5.5 0 00.5-.4l.3-1.2a4.9 4.9 0 001-.4l1 .7a.5.5 0 00.7-.1l1-1a.5.5 0 00.1-.7l-.7-1a4.9 4.9 0 00.4-1l1.2-.3a.5.5 0 00.4-.5v-1a.5.5 0 00-.4-.5z" />
  </svg>
);

export const Variants = () => (
  <F>
    <IconButton aria-label="settings" variant="ghost">{Gear}</IconButton>
    <IconButton aria-label="settings" variant="secondary">{Gear}</IconButton>
    <IconButton aria-label="settings" variant="primary">{Gear}</IconButton>
  </F>
);

export const Sizes = () => (
  <F>
    <IconButton aria-label="settings" variant="secondary" size="sm">{Gear}</IconButton>
    <IconButton aria-label="settings" variant="secondary" size="md">{Gear}</IconButton>
    <IconButton aria-label="settings" variant="secondary" size="lg">{Gear}</IconButton>
  </F>
);
