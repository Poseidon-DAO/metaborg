import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { ConnectModal } from "components/drop/connect-modal";

import type { NextPage } from "next";

const ConnectWallet: NextPage = () => {
  const [opened, setOpened] = useState(false);

  function onModalOpen() {
    setOpened(true);
  }

  function onModalClose() {
    setOpened(false);
  }

  return (
    <Box>
      <Button onClick={onModalOpen} size={["lg", "xl"]}>
        Get Started
      </Button>

      {opened && <ConnectModal onClose={onModalClose} />}
    </Box>
  );
};

export { ConnectWallet };
