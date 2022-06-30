import { type ReactNode } from "react";
import { type NextPage } from "next";
import { Container } from "@chakra-ui/react";

interface IPageContainerProps {
  children?: ReactNode;
}

const PageContainer: NextPage<IPageContainerProps> = ({ children }) => {
  return <Container maxW={["90%", "container.lg"]}>{children}</Container>;
};

export { PageContainer };
