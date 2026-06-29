import {
  Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter,
  Button, Field, Input,
} from "@otomatty/design-system";

// Rendered inline (cardMode: single) so the open dialog stays inside the card.
const Stage = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ position: "relative", minHeight: 380, padding: 0, overflow: "hidden" }}>
    {children}
  </div>
);

export const Confirmation = () => (
  <Stage>
    <Dialog open onClose={() => {}} size="sm">
      <DialogHeader>
        <DialogTitle>Delete project?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogHeader>
      <DialogBody>
        The project and all of its issues will be permanently removed from your workspace.
      </DialogBody>
      <DialogFooter>
        <Button variant="tertiary" size="sm">Cancel</Button>
        <Button variant="danger" size="sm">Delete</Button>
      </DialogFooter>
    </Dialog>
  </Stage>
);

export const FormDialog = () => (
  <Stage>
    <Dialog open onClose={() => {}} size="md">
      <DialogHeader>
        <DialogTitle>Invite teammate</DialogTitle>
        <DialogDescription>They'll get an email invitation.</DialogDescription>
      </DialogHeader>
      <DialogBody>
        <Field label="Email" htmlFor="d-email">
          <Input id="d-email" placeholder="teammate@company.com" />
        </Field>
      </DialogBody>
      <DialogFooter>
        <Button variant="tertiary" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Send invite</Button>
      </DialogFooter>
    </Dialog>
  </Stage>
);
