import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button } from "@mantine/core";
import { Wallet } from "tabler-icons-react";

import { ConnectModal } from "components/drop/ConnectModal";

import type { NextPage } from "next";

const ConnectWallet: NextPage = () => {
  const { isAuthenticated } = useMoralis();
  const [opened, setOpened] = useState(false);

  function onModalClose() {
    setOpened(false);
  }

  if (isAuthenticated) {
    return <div>USER WITH ACC: 0x1232312333242</div>;
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpened(true)}
        leftIcon={<Wallet />}
      >
        Connect Wallet
      </Button>

      {opened && <ConnectModal onClose={onModalClose} />}
    </>
  );
};

export { ConnectWallet };
