import { Box } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

const AccountInfo: NextPage = () => {
  return (
    <Box>
      <ConnectButton />
    </Box>
  );
};

export { AccountInfo };
