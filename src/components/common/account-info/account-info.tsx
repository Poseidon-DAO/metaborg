import { useState } from "react";
import { useMoralis } from "react-moralis";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Button, Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";

import { DisconnectModal } from "components/common";
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
          size={["sm", "md"]}
          rightIcon={<Icon as={MdKeyboardArrowDown} w={[5, 7]} h={[5, 7]} />}
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
