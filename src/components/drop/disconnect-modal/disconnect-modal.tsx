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

import { getDefaultToastConfig } from "utils/toast";
import { formatPublicKey } from "utils/account";

import type { NextPage } from "next";
import { useAccount, useDisconnect } from "wagmi";
interface IDisconnectModalProps {
  opened: boolean;
  onClose: () => void;
}

const DisconnectModal: NextPage<IDisconnectModalProps> = ({
  opened,
  onClose,
}) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(address || "");

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
        <ModalContent p={[0, 2]} w="85%">
          <ModalCloseButton borderRadius={50} />
          <ModalBody my={4}>
            <Box textAlign="center" mb={[2, 4]}>
              <Avatar mb={[2, 4]} size={["lg", "xl"]} bg="brand.red" />

              <Text size="lg" fontWeight="bold">
                {formatPublicKey(address!)}
              </Text>
            </Box>

            <Flex justifyContent="space-between">
              <Button
                w="48%"
                h={"55px"}
                flexDir="column"
                onClick={onCopy}
                variant="ghost"
                isActive
              >
                <Icon as={MdContentCopy} w={[3, 4]} h={[3, 4]} mb={1} />
                <Text fontSize="md">Copy Address</Text>
              </Button>

              <Button
                w="48%"
                h={"55px"}
                flexDir="column"
                onClick={() => disconnect()}
                variant="ghost"
                isActive
              >
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
