import { Box } from "@chakra-ui/react";

import { PageContainer } from "components/common";

import { type ReactNode } from "react";
import { type NextPage } from "next";
interface IDropLayoutProps {
  children?: ReactNode;
}

const DropLayout: NextPage<IDropLayoutProps> = ({ children }) => {
  return (
    <Box position="relative">
      <PageContainer>
        <Box minH={["60vh", "80vh"]} py={[8, 32]}>
          {children}
        </Box>
      </PageContainer>
    </Box>
  );
};

export { DropLayout };
