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
  useMediaQuery,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { Image } from "components/common";
import { getDefaultToastConfig } from "utils/toast";
import { getNiftyRedirectUrl } from "utils/url-query-params";

import type { NextPage } from "next";

import metamaskLogo from "../../../../public/assets/metamask-logo.png";
import niftyLogo from "../../../../public/assets/nifty-logo.png";

interface IConnectModalProps {
  onClose?: () => void;
}

const ConnectModal: NextPage<IConnectModalProps> = ({ onClose }) => {
  const imageSize = useBreakpointValue({ base: 70, lg: 100 });
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
    } catch (error) {
      console.error(error);
    }
  }

  async function onNiftyGatewayConnect() {
    const niftyGatewayUrl = getNiftyRedirectUrl();
    window.location.replace(niftyGatewayUrl.href);
  }

  function onModalClose() {
    if (onClose) onClose();
  }

  return (
    <Modal isOpen onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent w="85%">
        <ModalHeader>Sign in</ModalHeader>
        <ModalCloseButton borderRadius={50} />

        <ModalBody pb={8}>
          <Grid
            templateColumns="1fr auto 1fr"
            columnGap={2}
            css={{ "& > div": { cursor: "pointer" } }}
          >
            <GridItem onClick={onNiftyGatewayConnect}>
              <Center py={4} px={2}>
                <Image
                  width={imageSize}
                  height={imageSize}
                  src={niftyLogo}
                  alt="nifty gateway logo"
                  priority
                />
              </Center>

              <Text textAlign="center">
                Connect with <br />
                Nifty Gateway
              </Text>
            </GridItem>

            <Box h="100%" w="1px" bg="brand.red"></Box>

            <GridItem onClick={onMetamaskConnect}>
              <Center py={4} px={2}>
                <Image
                  width={imageSize}
                  height={imageSize}
                  src={metamaskLogo}
                  alt="metamask logo"
                  priority
                />
              </Center>
              <Text textAlign="center">
                Connect with <br /> Metamask
              </Text>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ConnectModal };
