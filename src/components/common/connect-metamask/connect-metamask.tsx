import { Box, Button, useBreakpointValue, useToast } from "@chakra-ui/react";
import { Image } from "components/common";
import { NextPage } from "next";
import { getDefaultToastConfig } from "utils/toast";
import { useAccount, useConnect } from "wagmi";

import metamaskLogo from "../../../../public/assets/metamask-logo.png";

const ConnectMetamask: NextPage = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const toast = useToast();
  const metamaskImageSize = useBreakpointValue({ base: 20, lg: 25 });

  const getMetamaskImage = () => {
    return (
      <Image
        width={metamaskImageSize}
        height={metamaskImageSize}
        src={metamaskLogo}
        alt="metamask logo"
        priority
      />
    );
  };

  async function onMetamaskConnect() {
    if (isConnected) return;

    if (typeof window.ethereum === "undefined") {
      return toast(
        getDefaultToastConfig({
          icon: getMetamaskImage(),
        })
      );
    }

    connect({ connector: connectors[0] });
  }

  return (
    <Button
      size={["sm", "md"]}
      onClick={onMetamaskConnect}
      rightIcon={getMetamaskImage()}
    >
      Connect Metamask
    </Button>
  );
};

export { ConnectMetamask };
