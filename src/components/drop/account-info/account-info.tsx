import { useState } from "react";
import { useMoralis } from "react-moralis";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Button, Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";

import { DisconnectModal } from "components/drop/disconnect-modal";
import { formatPublicKey } from "utils/account";

import type { NextPage } from "next";

const AccountInfo: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useMoralis();

  function onModalOpen() {
    setOpened(true);
  }

  function onModalClose() {
    setOpened(false);
  }

  return (
    <>
      <Flex justifyContent="flex-end">
        <Button
          size={["sm", "lg"]}
          rightIcon={<Icon as={MdKeyboardArrowDown} w={[5, 10]} h={[5, 10]} />}
          onClick={onModalOpen}
        >
          {formatPublicKey(user?.get("ethAddress"))}
        </Button>

        {opened && <DisconnectModal opened={opened} onClose={onModalClose} />}
      </Flex>
    </>
  );
};

export { AccountInfo };
