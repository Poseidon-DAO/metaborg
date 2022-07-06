import { useMoralis } from "react-moralis";
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
  ModalFooter,
} from "@chakra-ui/react";

import { useStore } from "store/store";
import { Image } from "components/common";
import { getDefaultToastConfig } from "utils/toast";
import { getNiftyRedirectUrl } from "utils/url-query-params";

import type { NextPage } from "next";

import metamaskLogo from "../../../../public/assets/metamask-logo.png";
import walletConnectLogo from "../../../../public/assets/wallet-connect.png";

interface IConnectModalProps {
  onClose?: () => void;
}

const ConnectModal: NextPage<IConnectModalProps> = ({ onClose }) => {
  const token = useStore((state) => state.token);
  const metamaskImageSize = useBreakpointValue({ base: 70, lg: 100 });
  const niftyImageSize = useBreakpointValue({ base: 70, lg: 80 });
  const toast = useToast();
  const { isAuthenticated, authenticate } = useMoralis();

  async function onMetamaskConnect() {
    if (isAuthenticated) return;

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
      await authenticate({
        provider: "metamask",
        signingMessage: "Log in with Metaborg",
      });

      onModalClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function onWalletConnectConnect() {
    if (isAuthenticated) return;

    try {
      await authenticate({ provider: "walletconnect" });
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
            <GridItem onClick={onWalletConnectConnect}>
              <Center py={4} px={2}>
                <Tooltip
                  label="Already signed in with Nifty Gateway"
                  isDisabled={!token}
                  placement="top-end"
                  shouldWrapChildren
                  hasArrow
                >
                  <IconButton
                    w={120}
                    h={120}
                    variant="ghost"
                    aria-label="Nifty gateway"
                    disabled={!!token}
                    icon={
                      <Image
                        width={niftyImageSize}
                        height={niftyImageSize}
                        src={walletConnectLogo}
                        alt="nifty gateway logo"
                        priority
                      />
                    }
                  />
                </Tooltip>
              </Center>

              <Text textAlign="center">
                Sign in with <br />
                Nifty Gateway
              </Text>
            </GridItem>

            <Box h="100%" w="1px" bg="brand.red"></Box>

            <GridItem onClick={onMetamaskConnect}>
              <Center py={4} px={2}>
                <Tooltip
                  label="Already connected with Metamask"
                  isDisabled={!isAuthenticated}
                  placement="top-start"
                  shouldWrapChildren
                  hasArrow
                >
                  <IconButton
                    w={120}
                    h={120}
                    variant="ghost"
                    aria-label="Metamask"
                    disabled={isAuthenticated}
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
          </Grid>
        </ModalBody>

        {/* <ModalFooter fontSize="12px" textAlign="center">
          Connect with Nifty. If you&apos;ve already joined the drop but
          didn&apos;t move the NFTs from Nifty Gateway, please connect the
          wallet in order to move them in your Metamask.
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export { ConnectModal };
