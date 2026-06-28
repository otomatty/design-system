import * as React from "react";
import { cn } from "../lib/cn";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Wrap in a bordered, rounded surface. @default true */
  bordered?: boolean;
}

/** Data table styled for the dark surface system. Compose with the subparts. */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { bordered = true, className, children, ...props },
  ref
) {
  const table = (
    <table ref={ref} className={cn("w-full border-collapse text-body-sm", className)} {...props}>
      {children}
    </table>
  );
  if (!bordered) return table;
  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-hairline">{table}</div>
  );
});

export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-surface-1", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-hairline", className)} {...props} />;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Add hover highlight (for interactive rows). */
  interactive?: boolean;
}

export function TableRow({ interactive, className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(interactive && "cursor-pointer transition-colors hover:bg-surface-1", className)}
      {...props}
    />
  );
}

export function TableHeaderCell({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "border-b border-hairline px-md py-2.5 text-left text-caption font-medium uppercase tracking-wide text-ink-subtle",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-md py-2.5 text-ink-muted", className)} {...props} />;
}
