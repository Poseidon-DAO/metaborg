import { Box, Heading } from "@chakra-ui/react";

import { NftItem } from "components/drop/nft-item";
import { EmptyNifties } from "components/drop/empty-nifties";

import type { NextPage } from "next";
import type { Nifty } from "lib/api/types";

interface INftsListProps {
  nifties: Nifty[];
}

const neverNextTokenId = process.env.NEXT_PUBLIC_NG_NEVER_NEXT_TOKEN_ID;
const alwaysTokenId = process.env.NEXT_PUBLIC_NG_ALWAYS_TOKEN_ID;
const aloneTokenId = process.env.NEXT_PUBLIC_NG_ALONE_TOKEN_ID;

const NftsList: NextPage<INftsListProps> = ({ nifties }) => {
  if (!nifties.length) {
    return <EmptyNifties />;
  }

  const tokenIds = nifties.map((nfts) => nfts.tokenId);
  const nonDuplicates = nifties.filter(
    (nifty, index) => !tokenIds.includes(nifty.tokenId, index + 1)
  );

  const filteredByTokenId = nonDuplicates.filter((nft) =>
    [neverNextTokenId, alwaysTokenId, aloneTokenId].includes(nft.tokenId)
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

      {filteredByTokenId.map((nifty) => (
        <NftItem key={nifty.tokenId} {...nifty} />
      ))}
    </Box>
  );
};

export { NftsList };
