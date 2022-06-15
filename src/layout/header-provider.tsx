import { type ReactNode } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import { Header } from "components/drop/header";
import { Footer } from "components/drop/footer";

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
    header: <div style={{ background: "red" }}>HEADER 2</div>,
    footer: <div>FOOTER 2</div>,
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
