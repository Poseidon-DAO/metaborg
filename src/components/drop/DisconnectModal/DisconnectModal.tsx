import { useMoralis } from "react-moralis";
import { Avatar, Button, Center, Modal } from "@chakra-ui/react";

import type { NextPage } from "next";

interface IDisconnectModalProps {
  onClose?: () => void;
}

const DisconnectModal: NextPage<IDisconnectModalProps> = ({ onClose }) => {
  const { logout } = useMoralis();

  return (
    <Modal isOpen onClose={() => onClose?.()} size="auto">
      <Center>
        <Avatar color="cyan" borderRadius={50} size="xl">
          ML
        </Avatar>
      </Center>

      <Center>
        <Button>Copy Address</Button>
        <Button onClick={logout}>Disconnect</Button>
      </Center>
    </Modal>
  );
};

export { DisconnectModal };
