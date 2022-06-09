import { ReactNode } from "react";
import { AppShell, Container, Footer, Header } from "@mantine/core";

import type { NextPage } from "next";

interface IDropShellProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

const DropShell: NextPage<IDropShellProps> = ({ children, header, footer }) => {
  return (
    <AppShell
      header={
        <Header height="auto">
          <Container sx={() => ({ border: "1px solid red" })}>
            {header}
          </Container>
        </Header>
      }
      footer={
        <Footer height="auto">
          <Container sx={() => ({ border: "1px solid red" })}>
            {footer}
          </Container>
        </Footer>
      }
    >
      <Container sx={() => ({ minHeight: "90vh", border: "1px solid red" })}>
        {children}
      </Container>
    </AppShell>
  );
};

export { DropShell };
