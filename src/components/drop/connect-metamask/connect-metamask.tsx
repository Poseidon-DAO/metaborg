import { Box, Button, useBreakpointValue, useToast } from "@chakra-ui/react";
import { Image } from "components/common";
import { NextPage } from "next";
import { useMoralis } from "react-moralis";
import { getDefaultToastConfig } from "utils/toast";

import metamaskLogo from "../../../../public/assets/metamask-logo.png";

const ConnectMetamask: NextPage = () => {
  const { isAuthenticated, authenticate } = useMoralis();
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
    if (isAuthenticated) return;

    if (typeof window.ethereum === "undefined") {
      return toast(
        getDefaultToastConfig({
          icon: getMetamaskImage(),
        })
      );
    }

    try {
      await authenticate({
        provider: "metamask",
        signingMessage: "Connect with Metaborg",
      });
    } catch (error) {
      console.error(error);
    }
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
