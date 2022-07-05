import { useMoralis } from "react-moralis";
import { Flex, Box } from "@chakra-ui/react";

import { AccountInfo } from "components/drop/account-info";
import { Logo, PageContainer } from "components/common";

import type { NextPage } from "next";
import { ConnectMetamask } from "../connect-metamask";

const Header: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  return (
    <Box py={4} borderBottom="2px solid" borderColor="brand.red">
      <PageContainer>
        <Flex align="center" justify="space-between">
          <Box>
            <Logo />
          </Box>

          <Box>{isAuthenticated ? <AccountInfo /> : <ConnectMetamask />}</Box>
        </Flex>
      </PageContainer>
    </Box>
  );
};

export { Header };
