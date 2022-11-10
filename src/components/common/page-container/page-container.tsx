import { Container } from "@chakra-ui/react";

import { type ReactNode } from "react";
import { type NextPage } from "next";

interface IPageContainerProps {
  children?: ReactNode;
}

const PageContainer: NextPage<IPageContainerProps> = ({ children }) => {
  return (
    <Container paddingX={[0, "initial"]} maxW={["95%", "container.lg"]}>
      {children}
    </Container>
  );
};

export { PageContainer };
