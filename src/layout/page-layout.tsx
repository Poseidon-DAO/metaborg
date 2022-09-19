import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import { Header } from "components/common";
import { Footer } from "components/common";

import { useEffect, type ReactNode } from "react";
import { type NextPage } from "next";
import { PageContainer } from "components/common";
import { useMoralis } from "react-moralis";

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
  const { isAuthenticated, isWeb3Enabled, enableWeb3 } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled) {
      enableWeb3();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

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
