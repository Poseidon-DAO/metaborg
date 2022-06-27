import { type ReactNode } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import { Header } from "components/drop/header";

interface IHeaderProviderProps {
  children: ReactNode;
}

const navigationForRoute: Record<
  string,
  { header: ReactNode; footer: ReactNode }
> = {
  "/": {
    header: <Header />,
    footer: null,
  },
  "/landing": {
    header: null,
    footer: null,
  },
};

const HeaderProvider: NextPage<IHeaderProviderProps> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <Box>
      {/* header */}
      {navigationForRoute[asPath] && navigationForRoute[asPath].header}

      {/* content */}
      {children}

      {/* footer */}
      {navigationForRoute[asPath] && navigationForRoute[asPath].footer}
    </Box>
  );
};

export { HeaderProvider };
