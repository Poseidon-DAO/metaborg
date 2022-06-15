import { useRouter } from "next/router";
import { type NextPage } from "next";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

import metamaskIcon from "public/assets/metamask.png";
import walletConnectIcon from "public/assets/walletconnect.svg";

interface IConnectModalProps {
  onClose?: () => void;
}

const ConnectModal: NextPage<IConnectModalProps> = ({ onClose, ...props }) => {
  const { query, push } = useRouter();
  const { isAuthenticated, authenticate, logout } = useMoralis();

  async function connectWallet({
    type,
  }: {
    type: "metamask" | "walletconnect";
  }) {
    if (isAuthenticated) return;

    try {
      const user = await authenticate({
        provider: type,
        signingMessage: "Log in with Metaborg",
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
      });

      console.log("logged in user:", user);
      console.log(user!.get("ethAddress"));
    } catch (error) {
      console.log(error);
    }
  }

  async function connectNiftyGateway() {
    const niftyGatewayUrl = new URL("https://niftygateway.com/authorize");

    niftyGatewayUrl.searchParams.append("scope", "profile:read");
    niftyGatewayUrl.searchParams.append("response_type", "code");
    niftyGatewayUrl.searchParams.append(
      "client_id",
      process.env.NEXT_PUBLIC_NG_CLIENT_ID as string
    );
    niftyGatewayUrl.searchParams.append(
      "redirect_uri",
      process.env.NEXT_PUBLIC_NG_REDIRECT_URI as string
    );

    window.open(niftyGatewayUrl.href, "_blank");
  }

  async function onLogout() {
    await logout();
    console.log("logged out");
  }

  function onModalClose() {
    if (onClose) onClose();
  }

  console.log("vigan query ", query);

  return (
    <Modal isOpen size="2xl" onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect a Wallet</ModalHeader>
        <ModalCloseButton borderRadius={50} />

        <ModalBody>
          <Flex justify="space-between" align="center" border={"1px solid red"}>
            <Box flexGrow={1}>Nifty Gateway</Box>
            <Box flexGrow={1}>MetaMask</Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ConnectModal };

{
  /* <Center>
<Text variant="h3">Connect a wallet</Text>
</Center>

<Stack>
<Box>
  <Button
    color="green"
    onClick={() => connectWallet({ type: "metamask" })}
  >
    Connect Metamask
  </Button>
</Box>

<Box>
  <Button
    color="green"
    onClick={() => connectWallet({ type: "walletconnect" })}
  >
    Connect WalletConnect
  </Button>
</Box>

<Box>
  <Button color="green" onClick={connectNiftyGateway}>
    Connect Nifty Gateway
  </Button>
</Box>
</Stack> */
}
