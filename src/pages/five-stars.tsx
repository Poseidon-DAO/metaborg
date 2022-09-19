import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NextPage } from "next";
import { Box, Image } from "@chakra-ui/react";

import { useAvailablePages } from "lib/hooks/five-stars";
import { ConnectSection, AccountInfo } from "components/common";
import { Benefits, MintSection, Packages } from "components/five-stars";

const FiveStars: NextPage = () => {
  const { isAuthenticated } = useMoralis();
  const { fetchAvailablePages } = useAvailablePages();

  useEffect(() => {
    fetchAvailablePages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box position="absolute" left={0} top={0}>
        <Image src="assets/five-stars-cover.jpg" alt="cover" />
      </Box>

      {!isAuthenticated && (
        <Box pt={80}>
          <ConnectSection title="Welcome fighter collector, collect your wallet" />
        </Box>
      )}

      {isAuthenticated && (
        <Box pt={60} mb={40}>
          <AccountInfo />
        </Box>
      )}

      <Box my={4}>
        <Packages />
      </Box>

      <Box my={20}>
        <MintSection />
      </Box>

      <Box my={16}>
        <Benefits />
      </Box>
    </Box>
  );
};

export default FiveStars;
