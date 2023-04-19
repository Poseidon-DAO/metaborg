import { Flex, Box } from "@chakra-ui/react";

import { useAccount } from "wagmi";
import { AccountInfo } from "components/common/account-info";
import { Logo, PageContainer, ConnectMetamask } from "components/common";

import type { NextPage } from "next";

const Header: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <Box py={4} borderBottom="2px solid" borderColor="brand.red">
      <PageContainer>
        <Flex align="center" justify="space-between">
          <Box>
            <Logo />
          </Box>

          <Box>{isConnected ? <AccountInfo /> : <ConnectMetamask />}</Box>
        </Flex>
      </PageContainer>
    </Box>
  );
};

export { Header };
