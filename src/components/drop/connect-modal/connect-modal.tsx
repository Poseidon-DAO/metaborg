import { useRouter } from "next/router";
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
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { Image } from "components/common";
import { getDefaultToastConfig } from "utils/toast-utils";

import type { NextPage } from "next";

import metamaskLogo from "../../../../public/assets/metamask-logo.png";
import niftyLogo from "../../../../public/assets/nifty-logo.png";

interface IConnectModalProps {
  onClose?: () => void;
}

const ConnectModal: NextPage<IConnectModalProps> = ({ onClose, ...props }) => {
  const toast = useToast();
  const { isAuthenticated, authenticate, enableWeb3 } = useMoralis();

  async function connectMetamask() {
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

      enableWeb3();
    } catch (error) {
      console.log(error);
    }
  }

  async function connectNiftyGateway() {
    const niftyGatewayUrl = new URL("https://niftygateway.com/authorize");

    niftyGatewayUrl.searchParams.append("scope", "profile:read");
    niftyGatewayUrl.searchParams.append("response_type", "token");
    niftyGatewayUrl.searchParams.append(
      "client_id",
      process.env.NEXT_PUBLIC_NG_CLIENT_ID as string
    );
    niftyGatewayUrl.searchParams.append(
      "redirect_uri",
      process.env.NEXT_PUBLIC_NG_REDIRECT_URI as string
    );

    window.location.replace(niftyGatewayUrl.href);
  }

  function onModalClose() {
    if (onClose) onClose();
  }

  return (
    <Modal isOpen onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect a Wallet</ModalHeader>
        <ModalCloseButton borderRadius={50} />

        <ModalBody pb={8}>
          <Grid
            templateColumns="1fr auto 1fr"
            columnGap={2}
            css={{ "& > div": { cursor: "pointer" } }}
          >
            <GridItem onClick={connectNiftyGateway}>
              <Center py={4} px={2}>
                <Image
                  width={100}
                  height={100}
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

            <GridItem onClick={() => connectMetamask()}>
              <Center py={4} px={2}>
                <Image
                  width={100}
                  height={100}
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
