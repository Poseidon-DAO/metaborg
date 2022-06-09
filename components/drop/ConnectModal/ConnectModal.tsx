import { Box, Button, Center, Grid, Modal, Stack, Title } from "@mantine/core";
import { useMoralis } from "react-moralis";
import { useMutation, useQuery } from "react-query";

import { MBImage } from "@metaborg/common";

import type { NextPage } from "next";

import metamaskIcon from "public/assets/metamask.png";
import walletConnectIcon from "public/assets/walletconnect.svg";

interface IConnectModalProps {
  onClose?: () => void;
}

async function func() {
  return await (
    await fetch(
      `https://niftygateway.com/authorize?scope=profile:read&client_id=mheQ9lFzaeD1byeY6q9B1VNdVtByq8aDlg05NtDf&redirect_uri=https://drop.metaborg.io&response_type=code`,
      {
        mode: "no-cors",
        keepalive: true,
      }
    )
  ).json();
}

const ConnectModal: NextPage<IConnectModalProps> = ({ onClose, ...props }) => {
  const { isAuthenticated, authenticate, logout } = useMoralis();
  const { data, refetch, status } = useQuery("auth", () => func(), {
    enabled: false,
  });

  console.log("vigan data", props);

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

  async function onLogout() {
    await logout();
    console.log("logged out");
  }

  return (
    <Modal centered opened onClose={() => onClose?.()}>
      <Center>
        <Title order={3}>Connect a wallet</Title>
      </Center>

      <Stack>
        <Box>
          {/* <MBImage src={walletConnectIcon} alt="WalletConnect"></MBImage> */}
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
          <Button color="green" onClick={() => refetch()}>
            Connect Nifty Gateway
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};

export { ConnectModal };
