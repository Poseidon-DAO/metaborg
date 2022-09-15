import { NextPage } from "next";
import { Box, Image } from "@chakra-ui/react";
import { ConnectSection } from "components/common";
import { Benefits, MintSection } from "components/five-stars";
import { Packages } from "components/five-stars";
import { useMoralis } from "react-moralis";

const FiveStars: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  return (
    <Box>
      <Box position="absolute" left={0} top={0}>
        <Image src="assets/five-stars-cover.jpg" alt="cover" />
      </Box>

      <Box pt={80}>
        {!isAuthenticated && (
          <ConnectSection title="Welcome fighter collector, collect your wallet" />
        )}
      </Box>

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
