import { DropShell } from "layout";
import { Header, Footer } from "components/drop";

import type { NextPage } from "next";

const Drop: NextPage = () => {
  return (
    <DropShell header={<Header />} footer={<Footer />}>
      <div></div>
    </DropShell>
  );
};

export default Drop;
