import { NFT, Nifty, NiftyNames } from "lib/api/types";

const shapeNftsToNiftyApi = (nfts?: NFT[]): Nifty[] => {
  if (!nfts?.length) return [];

  const nifties: Nifty[] = nfts.map((nft) => ({
    contractAddress: undefined,
    creator: undefined,
    owner: undefined,
    tokenId: nft.token_id,
    name: nft.name as NiftyNames,
  }));

  return nifties;
};

export { shapeNftsToNiftyApi };
