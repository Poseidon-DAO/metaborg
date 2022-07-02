import { Box, Heading } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

import { useDistributionMetadata } from "lib/hooks";
import { useStore } from "store/store";
import { NftItem } from "components/drop/nft-item";

import type { NextPage } from "next";
import type { Nifty } from "lib/api/types";
import { EmptyNifties } from "../empty-nifties";

interface INftsListProps {
  nifties: Nifty[];
}

const NftsList: NextPage<INftsListProps> = ({ nifties }) => {
  const { isAuthenticated } = useMoralis();
  const setPrice = useStore((state) => state.setDistributionPrice);
  useDistributionMetadata({
    onSuccess: ({ formatedPrice }) => setPrice(formatedPrice),
    enabled: isAuthenticated,
  });

  if (!nifties.length) {
    return <EmptyNifties />;
  }

  return (
    <Box>
      <Heading
        mb={12}
        textDecoration="underline"
        textDecorationColor="brand.red"
      >
        Nifty Drop NFTs
      </Heading>
      {nifties.map((nifty) => (
        <NftItem key={nifty.tokenId} {...nifty} />
      ))}
    </Box>
  );
};

export { NftsList };
