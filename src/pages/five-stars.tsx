import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NextPage } from "next";
import { Box, Image } from "@chakra-ui/react";

import { useAvailablePages, useBalanceOf } from "lib/hooks/five-stars";
import { ConnectSection, AccountInfo } from "components/common";
import { Benefits, MintSection, Packages } from "components/five-stars";
import { useContractNFTs } from "lib/hooks/common";

const FiveStars: NextPage = () => {
  const { isAuthenticated, isWeb3Enabled } = useMoralis();
  const { fetchAvailablePages, availablePages } = useAvailablePages();
  const { fetchBalance, balance } = useBalanceOf();
  const { fetchContractNfts, contractNfts } = useContractNFTs({
    contractAddress: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS,
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      fetchAvailablePages();
      fetchBalance();
      fetchContractNfts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled]);

  console.log({ balance, contractNfts });

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
        <MintSection maxPages={availablePages} />
      </Box>

      <Box my={16}>
        <Benefits />
      </Box>
    </Box>
  );
};

export default FiveStars;
