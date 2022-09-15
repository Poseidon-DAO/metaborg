import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import { Header } from "components/drop/header";
import { Footer } from "components/drop/footer";

import { type ReactNode } from "react";
import { type NextPage } from "next";
import { PageContainer } from "components/common";

interface IPageLayoutProps {
  children: ReactNode;
}

const navigationForRoute: Record<
  string,
  { header: ReactNode; footer: ReactNode }
> = {
  "/issue1": {
    header: <Header />,
    footer: <Footer />,
  },
  "/five-stars": {
    header: null,
    footer: <Footer />,
  },
};

const PageLayout: NextPage<IPageLayoutProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <Box position="relative">
      {navigationForRoute[pathname] && navigationForRoute[pathname].header}

      <PageContainer>
        <Box minH={["60vh", "100vh"]}>{children}</Box>
      </PageContainer>

      {navigationForRoute[pathname] && navigationForRoute[pathname].footer}
    </Box>
  );
};

export { PageLayout };
