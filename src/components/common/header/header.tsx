import { Flex, Box } from "@chakra-ui/react";

import { useAccount } from "wagmi";
import { useStore } from "store/store";
import { AccountInfo } from "components/common/account-info";
import { Logo, PageContainer, ConnectMetamask } from "components/common";

import type { NextPage } from "next";

const Header: NextPage = () => {
  const { isConnected } = useAccount();
  const token = useStore((state) => state.token);

  const showConnectMetamask = !!token || isConnected;

  return (
    <Box py={4} borderBottom="2px solid" borderColor="brand.red">
      <PageContainer>
        <Flex align="center" justify="space-between">
          <Box>
            <Logo />
          </Box>

          {showConnectMetamask && (
            <Box>{isConnected ? <AccountInfo /> : <ConnectMetamask />}</Box>
          )}
        </Flex>
      </PageContainer>
    </Box>
  );
};

export { Header };
