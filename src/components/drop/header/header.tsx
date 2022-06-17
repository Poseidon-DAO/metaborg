import { type NextPage } from "next";
import { useMoralis } from "react-moralis";
import { Flex, Box } from "@chakra-ui/react";

import { AccountInfo } from "components/drop/account-info";
import { Logo, PageContainer } from "components/common";

const Header: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  return (
    <Box py={4} borderBottom="2px solid" borderColor="brand.red">
      <PageContainer>
        <Flex align="center" justify="space-between">
          <Box>
            <Logo />
          </Box>

          <Box>{isAuthenticated && <AccountInfo />}</Box>
        </Flex>
      </PageContainer>
    </Box>
  );
};

export { Header };
