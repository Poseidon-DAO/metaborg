import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import { Header } from "components/drop/header";
import { Footer } from "components/drop/footer";

import { type ReactNode } from "react";
import { type NextPage } from "next";
interface IHeaderProviderProps {
  children: ReactNode;
}

const navigationForRoute: Record<
  string,
  { header: ReactNode; footer: ReactNode }
> = {
  "/": {
    header: <Header />,
    footer: <Footer />,
  },
  "/landing": {
    header: null,
    footer: null,
  },
};

const HeaderProvider: NextPage<IHeaderProviderProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <Box>
      {navigationForRoute[pathname] && navigationForRoute[pathname].header}

      {children}

      {navigationForRoute[pathname] && navigationForRoute[pathname].footer}
    </Box>
  );
};

export { HeaderProvider };
