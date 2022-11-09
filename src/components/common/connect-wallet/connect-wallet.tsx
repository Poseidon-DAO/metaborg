import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import { ConnectModal } from "components/common";

import type { NextPage } from "next";
import { useAccount, useConnect } from "wagmi";

const ConnectWallet: NextPage = () => {
  const { connector } = useAccount();
  const { connect } = useConnect();
  const [opened, setOpened] = useState(false);

  function onModalOpen() {
    setOpened(true);
  }

  function onModalClose() {
    setOpened(false);
  }

  function handleConnect() {
    connect({ connector });
  }

  return (
    <Box>
      <Button onClick={handleConnect} size={["lg", "xl"]}>
        Connect
      </Button>

      {opened && <ConnectModal onClose={onModalClose} />}
    </Box>
  );
};

export { ConnectWallet };
