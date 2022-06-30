import { Box } from "@chakra-ui/react";
import { NextPage } from "next";

import { useDistributionMetadata } from "lib/hooks";
import { useStore } from "store/store";
import { NftItem } from "components/drop/nft-item";

import type { Nifty } from "lib/api/types";

interface INftsListProps {
  nifties: Nifty[];
}

const NftsList: NextPage<INftsListProps> = ({ nifties }) => {
  const setPrice = useStore((state) => state.setDistributionPrice);
  const { formatedPrice } = useDistributionMetadata({
    onSuccess: () => setPrice(formatedPrice),
  });

  return (
    <Box>
      {nifties.map((nifty) => (
        <NftItem key={nifty.tokenId} {...nifty} />
      ))}
    </Box>
  );
};

export { NftsList };
