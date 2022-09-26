import { ReactNode, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Box, Heading, Image } from "@chakra-ui/react";

import { useAvailablePages } from "lib/hooks/five-stars";
import { ConnectSection, AccountInfo } from "components/common";
import { Benefits, MintSection, Packages } from "components/five-stars";

import { type NextPage } from "next";

const IS_APP_ENABLED = process.env.NEXT_PUBLIC_APP_AVAILABLE === "true";
const APP_DISABLED_MESSAGE = process.env.NEXT_PUBLIC_APP_NOT_AVAILABLE_MESSAGE;

const FiveStars: NextPage = () => {
  const { isAuthenticated, isWeb3Enabled } = useMoralis();
  const { fetchAvailablePages, availablePages } = useAvailablePages();

  useEffect(() => {
    if (isWeb3Enabled) {
      fetchAvailablePages();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled]);

  function renderWithHeader(children: ReactNode) {
    return (
      <Box>
        <Box position="absolute" left={0} top={0}>
          <Image
            height={["140px", "initial"]}
            objectFit="cover"
            objectPosition={["-120px 0px", "initial"]}
            src="assets/five-stars-cover.jpg"
            alt="cover"
          />
        </Box>

        {children}
      </Box>
    );
  }

  if (!IS_APP_ENABLED) {
    return renderWithHeader(
      <Box pt={[14, 64]} textAlign="center">
        <Heading mt={60} size={["lg", "2xl"]}>
          {APP_DISABLED_MESSAGE || "The MINT haven't started yet!"}
        </Heading>
      </Box>
    );
  }

  return renderWithHeader(
    <>
      {!isAuthenticated && (
        <Box pt={[40, 80]}>
          <ConnectSection title="Welcome fighter collector, collect your wallet" />
        </Box>
      )}
      {isAuthenticated && (
        <Box pt={[40, 60]} mb={[20, 40]}>
          <AccountInfo />
        </Box>
      )}
      <Box my={[8, 4]}>
        <Packages />
      </Box>
      <Box my={20}>
        <MintSection maxPages={availablePages} />
      </Box>
      <Box my={16}>
        <Benefits />
      </Box>
    </>
  );
};

export default FiveStars;
