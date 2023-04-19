import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Center,
  Grid,
  GridItem,
  Text,
  useToast,
  useBreakpointValue,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

import { Image } from "components/common";
import { getDefaultToastConfig } from "utils/toast";

import type { NextPage } from "next";

import metamaskLogo from "../../../../public/assets/metamask-logo.png";
import walletConnectLogo from "../../../../public/assets/wallet-connect.png";
import { useAccount, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

interface IConnectModalProps {
  onClose?: () => void;
}

const ConnectModal: NextPage<IConnectModalProps> = ({ onClose }) => {
  const connectMetamask = useConnect({
    connector: new MetaMaskConnector(),
  });

  const connectWalletConnect = useConnect({
    connector: new WalletConnectConnector({
      options: { qrcode: true },
    }),
  });
  const { isConnected } = useAccount();

  const metamaskImageSize = useBreakpointValue({ base: 70, lg: 100 });
  const walletConnectImageSize = useBreakpointValue({ base: 70, lg: 80 });
  const toast = useToast();

  async function onMetamaskConnect() {
    if (isConnected) return;

    if (typeof window.ethereum === "undefined") {
      return toast(
        getDefaultToastConfig({
          icon: (
            <Image
              width={30}
              height={30}
              src={metamaskLogo}
              alt="metamask logo"
              priority
            />
          ),
        })
      );
    }

    try {
      connectMetamask.connect();

      onModalClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function onWalletConnectConnect() {
    if (isConnected) return;

    try {
      connectWalletConnect.connect();
    } catch (error) {
      console.error(error);
    }
  }

  function onModalClose() {
    if (onClose) onClose();
  }

  return (
    <Modal isOpen onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent w="85%">
        <ModalHeader>Connect</ModalHeader>
        <ModalCloseButton borderRadius={50} />

        <ModalBody pb={8}>
          <Grid templateColumns="1fr auto 1fr" columnGap={2}>
            <GridItem onClick={onMetamaskConnect}>
              <Center py={4} px={2}>
                <Tooltip
                  label="Already connected with Metamask"
                  isDisabled={!isConnected}
                  placement="top-start"
                  shouldWrapChildren
                  hasArrow
                >
                  <IconButton
                    w={120}
                    h={120}
                    variant="ghost"
                    aria-label="Metamask"
                    disabled={isConnected}
                    icon={
                      <Image
                        width={metamaskImageSize}
                        height={metamaskImageSize}
                        src={metamaskLogo}
                        alt="metamask logo"
                        priority
                      />
                    }
                  />
                </Tooltip>
              </Center>
              <Text textAlign="center">
                Connect with <br /> Metamask
              </Text>
            </GridItem>

            <Box h="100%" w="1px" bg="brand.red"></Box>

            <GridItem onClick={onWalletConnectConnect}>
              <Center py={4} px={2}>
                <Tooltip
                  label="Already connected with WalletConnect"
                  placement="top-end"
                  shouldWrapChildren
                  hasArrow
                >
                  <IconButton
                    w={120}
                    h={120}
                    variant="ghost"
                    aria-label="Wallet connect"
                    icon={
                      <Image
                        width={walletConnectImageSize}
                        height={walletConnectImageSize}
                        src={walletConnectLogo}
                        alt="wallet connect logo"
                        priority
                      />
                    }
                  />
                </Tooltip>
              </Center>

              <Text textAlign="center">
                Connect with <br />
                Wallet Connect
              </Text>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ConnectModal };
