import { Box, Heading } from "@chakra-ui/react";

import { NftItem } from "components/drop/nft-item";
import { EmptyNifties } from "components/drop/empty-nifties";

import type { NextPage } from "next";
import type { Nifty } from "lib/api/types";

interface INftsListProps {
  nifties: Nifty[];
}

const NftsList: NextPage<INftsListProps> = ({ nifties }) => {
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
