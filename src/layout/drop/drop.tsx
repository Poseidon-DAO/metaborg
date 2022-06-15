import { type ReactNode } from "react";
import { type NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { PageContainer } from "components/common";

interface IDropLayoutProps {
  children?: ReactNode;
}

const DropLayout: NextPage<IDropLayoutProps> = ({ children }) => {
  return (
    <Box>
      <PageContainer>
        <Box minH="100vh">{children}</Box>
      </PageContainer>
    </Box>
  );
};

export { DropLayout };
