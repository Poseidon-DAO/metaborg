import { Box } from "@chakra-ui/react";
import { NextPage } from "next";

import { NftItem } from "../nft-item";
import type { INftItemProps } from "../nft-item";

interface INftsListProps {
  nfts: INftItemProps[];
}

const NftsList: NextPage<INftsListProps> = ({ nfts }) => {
  return (
    <Box>
      {nfts.map((nft) => (
        <NftItem key={nft.tokenId} {...nft} />
      ))}
    </Box>
  );
};

export { NftsList };
