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

  const tokenIds = nifties.map((nfts) => nfts.tokenId);
  const filteredByTokenId = nifties.filter(
    (nifty, index) => !tokenIds.includes(nifty.tokenId, index + 1)
  );

  const filteredByName = filteredByTokenId.filter((nft) =>
    ["ALWAYS", "ALONE", "NEVER NEXT"].includes(nft.name)
  );

  return (
    <Box>
      <Heading
        mb={20}
        textDecoration="underline"
        textDecorationColor="brand.red"
      >
        Nifty Drop NFTs
      </Heading>

      {filteredByName.map((nifty) => (
        <NftItem key={nifty.tokenId} {...nifty} />
      ))}
    </Box>
  );
};

export { NftsList };
