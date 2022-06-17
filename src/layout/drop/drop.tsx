import { type ReactNode } from "react";
import { type NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { PageContainer } from "components/common";

interface IDropLayoutProps {
  children?: ReactNode;
}

const DropLayout: NextPage<IDropLayoutProps> = ({ children }) => {
  return (
    <Box position="relative">
      <PageContainer>
        <Box minH="80vh" py={32}>
          {children}
        </Box>
      </PageContainer>
    </Box>
  );
};

export { DropLayout };
