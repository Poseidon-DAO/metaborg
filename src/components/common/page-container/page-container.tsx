import { Container } from "@chakra-ui/react";

import { type ReactNode } from "react";
import { type NextPage } from "next";

interface IPageContainerProps {
  children?: ReactNode;
}

const PageContainer: NextPage<IPageContainerProps> = ({ children }) => {
  return <Container maxW={["90%", "container.lg"]}>{children}</Container>;
};

export { PageContainer };
