import * as React from "react";
import { Pagination } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24 }}>{children}</div>
);

export const Middle = () => {
  const [page, setPage] = React.useState(3);
  return (
    <F>
      <Pagination page={page} count={12} onPageChange={setPage} />
    </F>
  );
};

export const FirstPage = () => {
  const [page, setPage] = React.useState(1);
  return (
    <F>
      <Pagination page={page} count={8} onPageChange={setPage} />
    </F>
  );
};

export const Few = () => {
  const [page, setPage] = React.useState(2);
  return (
    <F>
      <Pagination page={page} count={4} onPageChange={setPage} />
    </F>
  );
};
