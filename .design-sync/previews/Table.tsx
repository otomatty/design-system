import {
  Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell, Badge,
} from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24 }}>{children}</div>
);

export const IssueList = () => (
  <F>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Issue</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Assignee</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow interactive>
          <TableCell className="text-ink">LUM-218 · Fix focus ring</TableCell>
          <TableCell><Badge tone="success" dot>Done</Badge></TableCell>
          <TableCell>Ada</TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell className="text-ink">LUM-219 · Surface ladder</TableCell>
          <TableCell><Badge tone="primary" dot>In progress</Badge></TableCell>
          <TableCell>Grace</TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell className="text-ink">LUM-220 · Dark scrollbars</TableCell>
          <TableCell><Badge tone="neutral" dot>Backlog</Badge></TableCell>
          <TableCell>Linus</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </F>
);
