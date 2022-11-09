import { Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

const AccountInfo: NextPage = () => {
  return (
    <Flex justifyContent="flex-end">
      <ConnectButton />
    </Flex>
  );
};

export { AccountInfo };
