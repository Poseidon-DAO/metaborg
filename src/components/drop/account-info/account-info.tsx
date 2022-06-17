import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

import { DisconnectModal } from "components/drop/disconnect-modal";

import type { NextPage } from "next";

const AccountInfo: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useMoralis();

  function onModalClose() {
    setOpened(false);
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpened(true)}
        // leftIcon={<Wallet />}
      >
        Account Info: {user?.get("ethAddress")}
      </Button>

      {opened && <DisconnectModal onClose={onModalClose} />}
    </>
  );
};

export { AccountInfo };
