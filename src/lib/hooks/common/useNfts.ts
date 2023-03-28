import { alchemyUrl } from "lib/api/api-utils";
import { Nft } from "types/nft";
import { useAccount, useQuery } from "wagmi";

const key = "userNfts";
const contractAddress = process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

async function getNfts(
  { owner }: { owner: string },
  { json }: { json?: boolean } = { json: true }
) {
  const response = await fetch(
    `${alchemyUrl}/${alchemyKey}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}&withMetadata=true`
  );

  if (json) {
    return response.json();
  }

  return response;
}

interface IUseNfts {
  owner?: string;
}

const useNfts = (props: IUseNfts = {}) => {
  const { address } = useAccount();

  const owner = props?.owner || address;

  const query = useQuery<{
    ownedNfts: Nft[];
    totalCount: number;
    blockHash: string;
  }>([key, owner], {
    queryFn: () => getNfts({ owner: owner || "" }),
    enabled: !!owner,
  });

  return {
    ...query,
    nfts: !!query.data ? query.data.ownedNfts : [],
    areNftsLoading: query.isLoading,
    areNftsFetching: query.isFetching,
  };
};

export { useNfts };
