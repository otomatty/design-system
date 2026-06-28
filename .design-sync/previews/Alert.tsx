import { Alert } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12, width: 420, maxWidth: "100%" }}>
    {children}
  </div>
);

export const Tones = () => (
  <F>
    <Alert tone="info" title="Heads up">Your trial ends in 5 days.</Alert>
    <Alert tone="success" title="Deployed">Build #1283 is live in production.</Alert>
    <Alert tone="warning" title="Approaching limit">You've used 80% of your seats.</Alert>
    <Alert tone="danger" title="Build failed">Could not reach the deploy server.</Alert>
  </F>
);

export const Dismissable = () => (
  <F>
    <Alert tone="info" title="New version available" onDismiss={() => {}}>
      Refresh to get the latest changes.
    </Alert>
  </F>
);

export const TitleOnly = () => (
  <F>
    <Alert tone="success" title="Saved" />
  </F>
);
