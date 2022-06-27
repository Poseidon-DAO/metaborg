import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  useToast,
  useClipboard,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Avatar,
} from "@chakra-ui/react";
import { MdLogout, MdContentCopy } from "react-icons/md";

import { getDefaultToastConfig } from "utils/toast-utils";
import { formatPublicKey } from "utils/account-utils";

import type { NextPage } from "next";
interface IDisconnectModalProps {
  opened: boolean;
  onClose: () => void;
}

const DisconnectModal: NextPage<IDisconnectModalProps> = ({
  opened,
  onClose,
}) => {
  const { user, logout } = useMoralis();
  const toast = useToast();
  const account = user?.get("ethAddress");
  const { hasCopied, onCopy } = useClipboard(account || "");

  useEffect(() => {
    if (hasCopied) {
      toast(
        getDefaultToastConfig({
          title: "",
          description: "Address copied",
          status: "success",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCopied]);

  return (
    <Box>
      <Modal isOpen={opened} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton borderRadius={50} />
          <ModalBody my={4}>
            <Box textAlign="center" mb={4}>
              <Avatar mb={2} size="xl" bg="brand.red" />

              <Text size="lg" fontWeight="bold">
                {formatPublicKey(account)}
              </Text>
            </Box>

            <Flex justifyContent="space-between">
              <Button w="48%" flexDir="column" onClick={onCopy}>
                <Icon as={MdContentCopy} w={4} h={4} mb={1} />
                <Text fontSize="md">Copy Address</Text>
              </Button>

              <Button w="48%" flexDir="column" onClick={logout}>
                <Icon as={MdLogout} w={4} h={4} mb={1} />
                <Text fontSize="md">Disconnect</Text>
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export { DisconnectModal };
