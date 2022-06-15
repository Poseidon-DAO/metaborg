import { type NextPage } from "next";
import { useMoralis } from "react-moralis";
import { Flex, Box, Text } from "@chakra-ui/react";

import { ConnectWallet } from "components/drop/connect-wallet";
import { AccountInfo } from "components/drop/account-info";
import { PageContainer } from "components/common";

const Header: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  return (
    <Box borderBottom="1px solid" borderColor="brand.border">
      <PageContainer>
        <Flex align="center" justify="space-between" py={4}>
          <Text fontSize="4xl">Metaborg</Text>

          <Box>{isAuthenticated ? <AccountInfo /> : <ConnectWallet />}</Box>
        </Flex>
      </PageContainer>
    </Box>
  );
};

export { Header };
