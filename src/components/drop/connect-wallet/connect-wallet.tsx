import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button } from "@chakra-ui/react";
// import { Wallet } from "tabler-icons-react";

import { ConnectModal } from "components/drop/ConnectModal";

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
    <>
      <Button variant="outline" onClick={onModalOpen}>
        Connect Wallet
      </Button>

      {opened && <ConnectModal onClose={onModalClose} />}
    </>
  );
};

export { ConnectWallet };
